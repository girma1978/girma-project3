const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]
    recipes: [Recipe]
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Recipe {
    _id: ID!
    title: String!
    description: String
    ingredients: [String!]!
    instructions: [String!]!
    category: String!
    createdAt: String!
    updatedAt: String!
    createdBy: User!
  }

  input ThoughtInput {
    thoughtText: String!
    thoughtAuthor: String!
  }

  input AddRecipeInput {
    title: String!
    description: String
    ingredients: [String!]!
    instructions: [String!]!
    category: String!
  }

  input UpdateRecipeInput {
    title: String
    description: String
    ingredients: [String!]
    instructions: [String!]
    category: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    
    # Thought related queries
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    
    # Recipe related queries
    getRecipeById(id: ID!): Recipe
    getRecipes(category: String, search: String): [Recipe!]!
    
    # Auth related query
    me: User
  }

  type Mutation {
    # User auth mutations
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    
    # Thought related mutations
    addThought(input: ThoughtInput!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    
    # Recipe related mutations
    addRecipe(input: AddRecipeInput!): Recipe!
    updateRecipe(id: ID!, input: UpdateRecipeInput!): Recipe!
    deleteRecipe(id: ID!): Boolean!
  }
`;

export default typeDefs;