import { Schema, model, Document, Types } from 'mongoose';

// Define allowed recipe categories
export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert' | 'other';

// Define an interface for the Recipe document
interface IRecipe extends Document {
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  category: RecipeCategory;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId;
}

// Define the schema for the Recipe document
const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    ingredients: [{
      type: String,
      required: true,
      trim: true,
    }],
    instructions: [{
      type: String,
      required: true,
      trim: true,
    }],
    category: {
      type: String,
      required: true,
      enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'other'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// Create text index for search functionality
recipeSchema.index({ title: 'text', ingredients: 'text' });

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;