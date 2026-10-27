
import { useState } from "react";
import { recipes } from "../recipes.js";
import RecipeCard from "../components/RecipeCard.jsx";

export default function IngredientSearch() {
  const [input, setInput] = useState("");
  const [searchedIngredients, setSearchedIngredients] = useState([]);

  function searchRecipes(event) {
    event.preventDefault();

    const ingredients = input
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item !== "");

    setSearchedIngredients([...new Set(ingredients)]);
  }

  const matchingRecipes = recipes
    .map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((item) =>
        item.toLowerCase()
      );

      const matched = searchedIngredients.filter((ingredient) =>
        recipeIngredients.some((item) => item.includes(ingredient))
      );

      return {
        ...recipe,
        matchedCount: matched.length,
        matchPercentage: searchedIngredients.length
          ? Math.round((matched.length / searchedIngredients.length) * 100)
          : 0
      };
    })
    .filter((recipe) => recipe.matchedCount > 0)
    .sort((a, b) => b.matchedCount - a.matchedCount);

  return (
    <main className="container">
      <h1 className="section-title">
        What Can I <span className="gradient-text">Make?</span>
      </h1>

      <p className="section-subtitle">
        Enter the ingredients you have at home and discover recipes you can prepare.
      </p>

      <form onSubmit={searchRecipes} className="filter-bar">
        <div className="filter-group" style={{ flex: 2, minWidth: 240 }}>
          <label className="filter-label" htmlFor="ingredient-input">
            Ingredients you have
          </label>

          <input
            id="ingredient-input"
            className="filter-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g. tomato, onion, cheese"
          />
        </div>

        <div style={{ alignSelf: "end" }}>
          <button type="submit" className="btn btn-primary">
            Find Recipes
          </button>
        </div>
      </form>

      {searchedIngredients.length > 0 && (
        <>
          <h2 className="section-title">
            Recipes for <span className="gradient-text">You</span>
          </h2>

          {matchingRecipes.length > 0 ? (
            <div className="recipe-grid">
              {matchingRecipes.map((recipe) => (
                <div key={recipe.id}>
                  <RecipeCard recipe={recipe} />

                  <p style={{ marginTop: "0.5rem" }}>
                    🥕 Matches {recipe.matchedCount} of{" "}
                    {searchedIngredients.length} ingredients (
                    {recipe.matchPercentage}%)
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-box">
              <div className="empty-icon">🥗</div>
              <h3 className="empty-title">No Matching Recipes Found</h3>
              <p className="empty-desc">
                Try different ingredients or enter fewer ingredients.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
