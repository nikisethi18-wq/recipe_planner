import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { recipes } from "../recipes.js";
import RecipeCard from "../components/RecipeCard.jsx";

export default function Recipes() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [cuisine, setCuisine] = useState("all");
  const [category, setCategory] = useState("all");
  const filtered = useMemo(() => recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (cuisine === "all" || r.cuisine === cuisine) &&
    (category === "all" || r.category === category)
  ), [search, cuisine, category]);

  return (
    <main className="container">
      <h1 className="section-title">Discover <span className="gradient-text">Recipes</span></h1>
      <p className="section-subtitle">Search by recipe name or filter by cuisine and category.</p>
      <div className="filter-bar">
        <div className="filter-group" style={{ flex: 2, minWidth: 240 }}>
          <label htmlFor="recipe-search-input" className="filter-label">Search Recipe</label>
          <input id="recipe-search-input" className="filter-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Type recipe name..." />
        </div>
        <div className="filter-group">
          <label htmlFor="cuisine-filter" className="filter-label">Cuisine</label>
          <select id="cuisine-filter" className="filter-select" value={cuisine} onChange={e => setCuisine(e.target.value)}>
            {["all","Italian","Indian","Asian","American","French","Mediterranean","Japanese","Mexican"].map(v => <option key={v} value={v}>{v === "all" ? "All Cuisines" : v}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="category-filter" className="filter-label">Category</label>
          <select id="category-filter" className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
            {["all","Main Course","Breakfast","Starter","Salad","Dessert"].map(v => <option key={v} value={v}>{v === "all" ? "All Categories" : v}</option>)}
          </select>
        </div>
      </div>
      {filtered.length ? <div className="recipe-grid">{filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}</div> :
        <div className="empty-state-box"><div className="empty-icon">🔍</div><h3 className="empty-title">No Recipes Found</h3><p className="empty-desc">Try clearing your search query or selecting a different cuisine or category filter.</p></div>}
    </main>
  );
}
