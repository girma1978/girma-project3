import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imgBase64, setImgBase64] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImgBase64(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipe = {
      title,
      description: "",
      ingredients: ingredients.split("\n").filter((i) => i.trim() !== ""),
      instructions: instructions.split("\n").filter((i) => i.trim() !== ""),
      category,
      imageUrl: imgBase64,
    };

    const storedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    localStorage.setItem("recipes", JSON.stringify([...storedRecipes, recipe]));

    console.log("Saved:", recipe);

    setTitle('');
    setCategory('');
    setIngredients('');
    setInstructions('');
    setImgBase64('');

    navigate('/searchrecipes');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-blue-200">
      <h3 className="text-xl font-bold text-center text-blue-700 mt-9 mb-9">
  Add a New Recipe
</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Recipe Name</label>
            <input
              type="text"
              className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-blue-800 font-semibold mb-1">Category</label>
            <select
              className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div>
            <label className="block text-blue-800 font-semibold mb-1">Ingredients</label>
            <textarea
              className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              placeholder="One per line"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-blue-800 font-semibold mb-1">Instructions</label>
            <textarea
              className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              placeholder="One step per line"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-blue-800 font-semibold mb-1">Image Upload</label>
            <div className="w-full border border-dashed border-blue-300 rounded px-3 py-4 text-center bg-blue-100">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-blue-900 hover:file:bg-blue-300"
                required
              />
              <p className="text-xs text-blue-700 mt-2">Supported formats: JPG, PNG, GIF</p>
            </div>

            {imgBase64 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-blue-700 mb-2">Image Preview:</p>
                <img
                  src={imgBase64}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded shadow"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors"
          >
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
