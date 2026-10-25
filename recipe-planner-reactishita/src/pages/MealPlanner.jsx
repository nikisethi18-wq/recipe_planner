import { useEffect, useMemo, useState } from "react";
import { recipes } from "../recipes.js";

const slots = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "snacks", label: "Snacks" },
  { key: "dinner", label: "Dinner" }
];

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}

export default function MealPlanner() {
  const [plan, setPlan] = useState(() => readStorage("mealPlan", {}));
  const [checked, setChecked] = useState(() => readStorage("shoppingChecked", {}));
  useEffect(() => localStorage.setItem("mealPlan", JSON.stringify(plan)), [plan]);
  useEffect(() => localStorage.setItem("shoppingChecked", JSON.stringify(checked)), [checked]);
  const ingredients = useMemo(() => {
    const set = new Set();
    Object.values(plan).forEach(id => {
      const recipe = recipes.find(r => String(r.id) === String(id));
      recipe?.ingredients.forEach(item => set.add(item));
    });
    return [...set];
  }, [plan]);

  return (
    <main className="container">
      <section className="planner-section">
        <div className="shopping-header">
          <h1 className="section-title" style={{ marginBottom: 0 }}>Daily <span className="gradient-text">Meal Planner</span></h1>
          <button className="btn btn-outline btn-sm" onClick={() => setPlan({})}>Clear Plan</button>
        </div>
        <p className="section-subtitle">Pick one recipe for each meal of the day — it's saved automatically.</p>
        <div className="meal-planner-grid">
          {slots.map(slot => {
            const selected = recipes.find(r => String(r.id) === String(plan[slot.key]));
            return <div className="day-card" key={slot.key}>
              <h3 className="day-name">{slot.label}</h3>
              <select className="day-select filter-select" value={plan[slot.key] || ""} onChange={e => setPlan(old => {
                const next = { ...old };
                if (e.target.value) next[slot.key] = e.target.value;
                else delete next[slot.key];
                return next;
              })}>
                <option value="">-- Select Recipe --</option>
                {recipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              {selected && <div className="day-selected">🍽 {selected.name}</div>}
            </div>;
          })}
        </div>
      </section>
      <section className="shopping-section">
        <div className="shopping-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Shopping <span className="gradient-text">List</span></h2>
          <button className="btn btn-outline btn-sm" onClick={() => setChecked({})}>Clear Shopping List</button>
        </div>
        <p className="section-subtitle">Automatically generated from the ingredients of your planned meals.</p>
        {ingredients.length ? <div className="shopping-list">{ingredients.map(item =>
          <label className={`shopping-item ${checked[item] ? "checked" : ""}`} key={item}>
            <input type="checkbox" checked={Boolean(checked[item])} onChange={e => setChecked(old => ({ ...old, [item]: e.target.checked }))} />
            <span>{item}</span>
          </label>
        )}</div> : <div className="empty-state-box"><div className="empty-icon">🛒</div><h3 className="empty-title">No Ingredients Yet</h3><p className="empty-desc">Select recipes in the Meal Planner above to generate your shopping list.</p></div>}
      </section>
    </main>
  );
}
