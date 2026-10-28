import { Link } from "react-router-dom";
import { useState } from "react";
import StarRating from "./StarRating.jsx";

function getFavourites() {
  try { return JSON.parse(localStorage.getItem("favourites") || "[]"); }
  catch { return []; }
}

export default function RecipeCard({ recipe }) {
  const [favourites, setFavourites] = useState(getFavourites);
  const saved = favourites.map(String).includes(String(recipe.id));

  function toggleFavourite() {
    const next = saved
      ? favourites.filter(id => String(id) !== String(recipe.id))
      : [...favourites, recipe.id];
    setFavourites(next);
    localStorage.setItem("favourites", JSON.stringify(next));
  }

  return (
    <article className="recipe-card">
      <Link to={`/recipe/${recipe.id}`}>
        <img className="recipe-card-image" src={recipe.image} alt={recipe.name} loading="lazy" />
      </Link>
      <div className="recipe-card-content">
        <div className="recipe-card-meta">
          <span className="badge badge-cuisine">{recipe.cuisine}</span>
          <span className="badge badge-category">{recipe.category}</span>
        </div>
        <h3 className="recipe-card-title"><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></h3>
        <p className="recipe-card-description">{recipe.time} · {recipe.difficulty}</p>
        <StarRating recipeId={recipe.id} recipeName={recipe.name} />
        <div className="recipe-card-actions">
          <Link className="btn btn-primary btn-sm" to={`/recipe/${recipe.id}`}>View Recipe</Link>
          <button type="button" className="favourite-button" onClick={toggleFavourite} aria-label={saved ? "Remove from favourites" : "Add to favourites"}>{saved ? "♥ Saved" : "♡ Favourite"}</button>
        </div>
      </div>
    </article>
  );
}