import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col items-center px-6 py-6">
      <header className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-900">🍽️ Snack Stack</h1>
        <nav className="space-x-4">
          <Link to="/login" className="text-blue-800 hover:text-blue-600 font-medium transition">
            Login
          </Link>
          <Link to="/signup" className="text-blue-800 hover:text-blue-600 font-medium transition">
            Sign Up
          </Link>
          <Link to="/profile" className="text-blue-800 hover:text-blue-600 font-medium transition">
            Profile
          </Link>
        </nav>
      </header>
      <br />
      <br />
      {/* Hero Section */}

      {/* Recipe Book Image */}
      <div className="w-full max-w-3xl mb-6 rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Recipe Book"
          className="w-full h-64 object-cover"
        />
      </div>
      <br />
      <br />
      {/* Main Content */}

      <main className="text-center max-w-3xl">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          Find, Create, and Share Delicious Recipes
        </h2>
        <p className="text-lg text-blue-800 mb-6">
          Discover your next favorite dish or share your culinary creations with the world. Search by category, ingredient, or just explore what’s trending!
        </p>
        <Link
          to="/searchrecipes"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
        >
          🔍 Search Recipes
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
