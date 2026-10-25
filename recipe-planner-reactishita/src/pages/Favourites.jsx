import { useState } from "react";
import { Link } from "react-router-dom";
import { recipes } from "../recipes.js";
import RecipeCard from "../components/RecipeCard.jsx";

export default function Favourites() {
  const [refresh, setRefresh] = useState(0);
  const ids = JSON.parse(localStorage.getItem("favourites") || "[]").map(String);
  const saved = recipes.filter(r => ids.includes(String(r.id)));
  return (
    <main className="container">
      <h1 className="section-title">Your Favourite <span className="gradient-text">Recipes</span></h1>
      <p className="section-subtitle">Recipes you have bookmarked in your personal food journal.</p>
      {saved.length ? <div className="recipe-grid">{saved.map(r => <RecipeCard key={r.id} recipe={r} />)}</div> :
        <div className="empty-state-box"><div className="empty-icon">♡</div><h3 className="empty-title">No Favourites Saved Yet</h3><p className="empty-desc">Click the heart icon on any recipe card to save it here for quick access.</p><Link to="/recipes" className="btn btn-primary">Browse Recipes</Link></div>}
    </main>
  );
}
