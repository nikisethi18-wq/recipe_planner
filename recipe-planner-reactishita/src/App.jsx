import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Recipes from "./pages/Recipes.jsx";
import Favourites from "./pages/Favourites.jsx";
import MealPlanner from "./pages/MealPlanner.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";

function Protected({ children }) {
  return localStorage.getItem("isLoggedIn") === "true"
    ? children
    : <Navigate to="/login" replace />;
}

function WithLayout({ children }) {
  return <Protected><Layout>{children}</Layout></Protected>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Layout protectedPage={false}><Login /></Layout>} />
      <Route path="/" element={<WithLayout><Home /></WithLayout>} />
      <Route path="/recipes" element={<WithLayout><Recipes /></WithLayout>} />
      <Route path="/favourites" element={<WithLayout><Favourites /></WithLayout>} />
      <Route path="/meal-planner" element={<WithLayout><MealPlanner /></WithLayout>} />
      <Route path="/recipe/:id" element={<WithLayout><RecipeDetails /></WithLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
