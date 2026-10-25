import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recipes } from "../recipes.js";
import RecipeCard from "../components/RecipeCard.jsx";

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const featured = useMemo(() => recipes.slice(0, 6), []);

  function submit(e) {
    e.preventDefault();
    navigate(`/recipes?search=${encodeURIComponent(search)}`);
  }

  return (
    <main className="container">
      <section className="hero" id="hero-section">
        <div className="hero-text">
          <span className="hero-eyebrow">🌿 Fresh &amp; Handpicked</span>
          <h1 className="hero-title">What are you <span className="gradient-text">craving</span> today?</h1>
          <p className="hero-description">Discover handpicked organic recipes, explore culinary delights, and save your favourite dishes in your personal recipe journal.</p>
          <form className="hero-search-box" onSubmit={submit}>
            <input className="search-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for recipes (e.g. Pasta, Salad)..." aria-label="Search recipes" />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <div><Link to="/recipes" className="btn btn-outline">Explore All Recipes →</Link></div>
        </div>
      </section>
      <section className="featured-section">
        <h2 className="section-title">Featured Recipes</h2>
        <p className="section-subtitle">Handpicked simple recipes for your everyday kitchen.</p>
        <div className="featured-grid">
          {featured.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      </section>
    </main>
  );
}
