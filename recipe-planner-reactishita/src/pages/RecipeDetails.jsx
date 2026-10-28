import { Link, useParams } from "react-router-dom";
import { recipes } from "../recipes.js";
import RecipeCard from "../components/RecipeCard.jsx";
import StarRating from "../components/StarRating.jsx";

export default function RecipeDetails() {
  const { id } = useParams();
  const recipe = recipes.find(r => String(r.id) === String(id));
  if (!recipe) return <main className="container"><h1 className="section-title">Recipe not found</h1><Link to="/recipes" className="btn btn-primary">Browse Recipes</Link></main>;
  return (
    <main className="container">
      <Link to="/recipes" className="btn btn-outline btn-sm">← All Recipes</Link>
      <h1 className="section-title">{recipe.name}</h1>
      <p className="section-subtitle">{recipe.cuisine} · {recipe.category} · {recipe.time} · {recipe.difficulty}</p>
      <StarRating recipeId={recipe.id} recipeName={recipe.name} />
      <img className="recipe-detail-image" src={recipe.image} alt={recipe.name} />
      <div className="recipe-details-columns">
        <section><h2 className="section-title">Ingredients</h2><ul>{recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}</ul></section>
        <section><h2 className="section-title">Instructions</h2><ol>{recipe.instructions.map((item, i) => <li key={i}>{item}</li>)}</ol></section>
      </div>
    </main>
  );
}