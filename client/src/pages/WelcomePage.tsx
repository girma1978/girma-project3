import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleViewRecipes = () => {
    navigate('/searchrecipes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white text-gray-800">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-4 px-6 bg-blue-50 shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 ml-15 mt-4">🥪 Snack Stack</h1>
      <div className="text-sm text-gray-500">{/* Optional logout or logo */}</div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-4">
          Welcome to Snack Stack!
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Discover, explore, and create your favorite recipes with ease. Dive into deliciousness now!
        </p>
        <button
          onClick={handleViewRecipes}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow transition duration-200"
        >
          View Recipes
        </button>
      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-500 text-center py-4">
        © {new Date().getFullYear()} Snack Stack. All rights reserved.
      </footer>
    </div>
  );
};

export default Welcome;
