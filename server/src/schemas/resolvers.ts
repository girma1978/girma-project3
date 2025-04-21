import { Thought, Recipe, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define Context interface
interface Context {
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

// Define types for the arguments
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

// Recipe related interfaces
interface RecipeIdArgs {
  id: string;
}

interface RecipeQueryArgs {
  category?: string;
  search?: string;
}

interface AddRecipeArgs {
  input: {
    title: string;
    description?: string;
    ingredients: string[];
    instructions: string[];
    category: string;
  }
}

interface UpdateRecipeArgs {
  id: string;
  input: {
    title?: string;
    description?: string;
    ingredients?: string[];
    instructions?: string[];
    category?: string;
  }
}

// Thought related interfaces
interface ThoughtArgs {
  thoughtId: string;
}

interface AddThoughtArgs {
  input: {
    thoughtText: string;
    thoughtAuthor: string;
  }
}

interface AddCommentArgs {
  thoughtId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  thoughtId: string;
  commentId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate(['thoughts', 'recipes']);
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate(['thoughts', 'recipes']);
    },
    
    // Recipe related queries
    getRecipes: async (_parent: any, { category, search }: RecipeQueryArgs) => {
      try {
        // Start with an empty filter
        const filter: any = {};
        
        // Add category filter if provided
        if (category) {
          filter.category = category;
        }
        
        // Add search filter if provided (using text index)
        if (search) {
          filter.$text = { $search: search };
        }
        
        // Find recipes that match the filters
        return await Recipe.find(filter)
          .sort({ createdAt: -1 })
          .populate('createdBy');
      } catch (err) {
        console.error('Error getting recipes:', err);
        throw new Error('Failed to get recipes');
      }
    },
    getRecipeById: async (_parent: any, { id }: RecipeIdArgs) => {
      return await Recipe.findOne({ _id: id }).populate('createdBy');
    },
    
    // Thought related queries
    thoughts: async () => {
      return await Thought.find().sort({ createdAt: -1 });
    },
    thought: async (_parent: any, { thoughtId }: ThoughtArgs) => {
      return await Thought.findOne({ _id: thoughtId });
    },
    
    // Query to get the authenticated user's information
    me: async (_parent: any, _args: any, context: Context) => {
      // If the user is authenticated, find and return the user's information along with their thoughts and recipes
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(['thoughts', 'recipes']);
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    // Recipe related mutations
    addRecipe: async (_parent: any, { input }: AddRecipeArgs, context: Context) => {
      if (context.user) {
        // Validate category
        const validCategories = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'other'];
        if (!validCategories.includes(input.category)) {
          throw new Error(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
        }

        // Create a new recipe with the input and set the createdBy field to the current user's ID
        const recipe = await Recipe.create({
          ...input,
          createdBy: context.user._id
        });

        // Add the recipe to the user's recipes array
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: recipe._id } }
        );

        // Populate the creator information
        await recipe.populate('createdBy');

        return recipe;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    updateRecipe: async (_parent: any, { id, input }: UpdateRecipeArgs, context: Context) => {
      if (context.user) {
        // Validate category if provided
        if (input.category) {
          const validCategories = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'other'];
          if (!validCategories.includes(input.category)) {
            throw new Error(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
          }
        }

        // Find and update the recipe, ensuring it belongs to the current user
        const recipe = await Recipe.findOneAndUpdate(
          { 
            _id: id,
            createdBy: context.user._id 
          },
          { $set: input },
          { 
            new: true,
            runValidators: true 
          }
        ).populate('createdBy');

        if (!recipe) {
          throw new Error('Recipe not found or you are not authorized to update it');
        }

        return recipe;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    deleteRecipe: async (_parent: any, { id }: RecipeIdArgs, context: Context) => {
      if (context.user) {
        // Find and delete the recipe, ensuring it belongs to the current user
        const recipe = await Recipe.findOneAndDelete({
          _id: id,
          createdBy: context.user._id,
        });

        if (!recipe) {
          throw new Error('Recipe not found or you are not authorized to delete it');
        }

        // Remove the recipe from the user's recipes array
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: recipe._id } }
        );

        return true; // Return boolean indicating success
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // Thought related mutations
    addThought: async (_parent: any, { input }: AddThoughtArgs, context: Context) => {
      if (context.user) {
        const thought = await Thought.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    addComment: async (_parent: any, { thoughtId, commentText }: AddCommentArgs, context: Context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeThought: async (_parent: any, { thoughtId }: ThoughtArgs, context: Context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        if (!thought) {
          throw new AuthenticationError('Thought not found or you are not authorized to delete it');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeComment: async (_parent: any, { thoughtId, commentId }: RemoveCommentArgs, context: Context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;