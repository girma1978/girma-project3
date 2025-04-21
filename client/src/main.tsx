// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import App from "./App.jsx";
// import Home from "./pages/Home.js";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import SingleThought from "./pages/SingleThought";
// import Profile from "./pages/Profile";
// import ErrorPage from "./pages/Error";
// import OldHome from "./pages/OldHome.js";
// import SearchRecipes from "./pages/SearchRecipes.js";
// import AddRecipe from "./pages/AddRecipe.js";
// import Welcome from "./pages/WelcomePage.js";
// import RecipeDetails from "./pages/RecipeDetails.js"; //added import for RecipeDetails

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/oldhome",
//         element: <OldHome />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/signup",
//         element: <Signup />,
//       },
//       {
//         path: "/profiles/:username",
//         element: <Profile />,
//       },
//       {
//         path: "/me",
//         element: <Profile />,
//       },
//       {
//         path: "/thoughts/:thoughtId",
//         element: <SingleThought />,
//       },
//       {
//         path: "/searchrecipes",
//         element: <SearchRecipes />,
//       },
//       {
//         path: "/addRecipe",
//         element: <AddRecipe />,
//       },
//       {
//         path: "WelcomePage",
//         element: <Welcome />,
//       },
//       {
//         path: "/recipe/:recipeId",
//         element: <RecipeDetails />,
//       }
//     ],
//   },
// ]);

// const rootElement = document.getElementById("root");
// if (rootElement) {
//   ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
// }





import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.js";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/Error";
import OldHome from "./pages/OldHome.js";
import SearchRecipes from "./pages/SearchRecipes.js";
import AddRecipe from "./pages/AddRecipe.js";
import Welcome from "./pages/WelcomePage.js";
import RecipeDetails from "./pages/RecipeDetails.js"; //added import for RecipeDetails

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/oldhome",
        element: <OldHome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profiles/:username",
        element: <Profile />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/thoughts/:thoughtId",
        element: <SingleThought />,
      },
      {
        path: "/searchrecipes",
        element: <SearchRecipes />,
      },
      {
        path: "/addRecipe",
        element: <AddRecipe />,
      },
      {
        path: "WelcomePage",
        element: <Welcome />,
      },
      {
        path: "/recipes/:recipeId",  // Changed from "/recipe/:recipeId" to "/recipes/:recipeId"
        element: <RecipeDetails />,
      }
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}