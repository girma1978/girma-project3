import db from '../config/connection.js';
import { Recipe, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json' assert { type: 'json'};
import recipeData from './recipeData.json' assert { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();
    
    // First create users
    const users = await User.create(userData);
    
    // Create recipes and map user references
    const mappedRecipes = recipeData.map((recipe: any) => {
      // Find user by username or use first user as default
      const user = users.find(u => u.username === recipe.thoughtAuthor) || users[0];
      
      // Transform from thought format to recipe format if needed
      return {
        title: recipe.title || recipe.thoughtText || "Recipe Title",
        description: recipe.description || "Recipe Description",
        ingredients: recipe.ingredients || ["Ingredient 1", "Ingredient 2"],
        instructions: recipe.instructions || ["Step 1", "Step 2"],
        category: recipe.category || "other",
        createdBy: user._id
      };
    });
    
    await Recipe.insertMany(mappedRecipes);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();