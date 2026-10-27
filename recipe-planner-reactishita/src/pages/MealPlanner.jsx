// import { useEffect, useMemo, useState } from "react";
// import { recipes } from "../recipes.js";

// const slots = [
//   { key: "breakfast", label: "Breakfast" },
//   { key: "lunch", label: "Lunch" },
//   { key: "snacks", label: "Snacks" },
//   { key: "dinner", label: "Dinner" }
// ];

// function readStorage(key, fallback) {
//   try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
//   catch { return fallback; }
// }

// export default function MealPlanner() {
//   const [plan, setPlan] = useState(() => readStorage("mealPlan", {}));
//   const [checked, setChecked] = useState(() => readStorage("shoppingChecked", {}));
//   useEffect(() => localStorage.setItem("mealPlan", JSON.stringify(plan)), [plan]);
//   useEffect(() => localStorage.setItem("shoppingChecked", JSON.stringify(checked)), [checked]);
//   const ingredients = useMemo(() => {
//     const set = new Set();
//     Object.values(plan).forEach(id => {
//       const recipe = recipes.find(r => String(r.id) === String(id));
//       recipe?.ingredients.forEach(item => set.add(item));
//     });
//     return [...set];
//   }, [plan]);

//   return (
//     <main className="container">
//       <section className="planner-section">
//         <div className="shopping-header">
//           <h1 className="section-title" style={{ marginBottom: 0 }}>Daily <span className="gradient-text">Meal Planner</span></h1>
//           <button className="btn btn-outline btn-sm" onClick={() => setPlan({})}>Clear Plan</button>
//         </div>
//         <p className="section-subtitle">Pick one recipe for each meal of the day — it's saved automatically.</p>
//         <div className="meal-planner-grid">
//           {slots.map(slot => {
//             const selected = recipes.find(r => String(r.id) === String(plan[slot.key]));
//             return <div className="day-card" key={slot.key}>
//               <h3 className="day-name">{slot.label}</h3>
//               <select className="day-select filter-select" value={plan[slot.key] || ""} onChange={e => setPlan(old => {
//                 const next = { ...old };
//                 if (e.target.value) next[slot.key] = e.target.value;
//                 else delete next[slot.key];
//                 return next;
//               })}>
//                 <option value="">-- Select Recipe --</option>
//                 {recipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
//               </select>
//               {selected && <div className="day-selected">🍽 {selected.name}</div>}
//             </div>;
//           })}
//         </div>
//       </section>
//       <section className="shopping-section">
//         <div className="shopping-header">
//           <h2 className="section-title" style={{ marginBottom: 0 }}>Shopping <span className="gradient-text">List</span></h2>
//           <button className="btn btn-outline btn-sm" onClick={() => setChecked({})}>Clear Shopping List</button>
//         </div>
//         <p className="section-subtitle">Automatically generated from the ingredients of your planned meals.</p>
//         {ingredients.length ? <div className="shopping-list">{ingredients.map(item =>
//           <label className={`shopping-item ${checked[item] ? "checked" : ""}`} key={item}>
//             <input type="checkbox" checked={Boolean(checked[item])} onChange={e => setChecked(old => ({ ...old, [item]: e.target.checked }))} />
//             <span>{item}</span>
//           </label>
//         )}</div> : <div className="empty-state-box"><div className="empty-icon">🛒</div><h3 className="empty-title">No Ingredients Yet</h3><p className="empty-desc">Select recipes in the Meal Planner above to generate your shopping list.</p></div>}
//       </section>
//     </main>
//   );
// }





import { useEffect, useMemo, useState } from "react";
import { recipes } from "../recipes.js";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const slots = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "snacks", label: "Snacks" },
  { key: "dinner", label: "Dinner" }
];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function MealPlanner() {
  const [plan, setPlan] = useState(() =>
    readStorage("mealPlan", {})
  );

  const [checked, setChecked] = useState(() =>
    readStorage("shoppingChecked", {})
  );

  // Save the weekly meal plan automatically.
  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(plan));
  }, [plan]);

  // Save shopping checklist status automatically.
  useEffect(() => {
    localStorage.setItem("shoppingChecked", JSON.stringify(checked));
  }, [checked]);

  // Generate ingredients only from selected recipes.
  const ingredients = useMemo(() => {
    const ingredientSet = new Set();

    Object.values(plan).forEach((id) => {
      if (id === "" || id === null || id === undefined) {
        return;
      }

      const recipe = recipes.find(
        (item) => String(item.id) === String(id)
      );

      if (recipe && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach((ingredient) => {
          ingredientSet.add(ingredient);
        });
      }
    });

    return [...ingredientSet];
  }, [plan]);

  // Update a meal for a particular day.
  function updateMeal(day, slot, recipeId) {
    const key = `${day}-${slot}`;

    setPlan((oldPlan) => {
      const nextPlan = { ...oldPlan };

      if (recipeId) {
        nextPlan[key] = recipeId;
      } else {
        delete nextPlan[key];
      }

      return nextPlan;
    });
  }

  // Clear all planned meals.
  function clearPlan() {
    setPlan({});
  }

  // Clear all shopping checklist ticks.
  function clearShoppingList() {
    setChecked({});
  }

  // Update whether an ingredient has been purchased.
  function toggleIngredient(ingredient, isChecked) {
    setChecked((oldChecked) => ({
      ...oldChecked,
      [ingredient]: isChecked
    }));
  }

  const checkedCount = ingredients.filter(
    (ingredient) => Boolean(checked[ingredient])
  ).length;

  return (
    <main className="container">
      {/* Weekly Meal Planner */}
      <section className="planner-section">
        <div className="shopping-header">
          <h1 className="section-title" style={{ marginBottom: 0 }}>
            Weekly <span className="gradient-text">Meal Planner</span>
          </h1>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={clearPlan}
          >
            Clear Plan
          </button>
        </div>

        <p className="section-subtitle">
          Plan your meals from Monday to Sunday. Your selections are
          saved automatically.
        </p>

        {days.map((day) => (
          <section
            className="day-card"
            key={day}
            style={{ marginBottom: "1.5rem" }}
          >
            <h2 className="day-name">{day}</h2>

            <div className="meal-planner-grid">
              {slots.map((slot) => {
                const key = `${day}-${slot.key}`;
                const selectedId = plan[key] || "";

                const selectedRecipe = recipes.find(
                  (recipe) =>
                    String(recipe.id) === String(selectedId)
                );

                return (
                  <div key={key}>
                    <label
                      className="filter-label"
                      htmlFor={key}
                    >
                      {slot.label}
                    </label>

                    <select
                      id={key}
                      className="day-select filter-select"
                      value={selectedId}
                      onChange={(event) =>
                        updateMeal(
                          day,
                          slot.key,
                          event.target.value
                        )
                      }
                    >
                      <option value="">
                        -- Select Recipe --
                      </option>

                      {recipes.map((recipe) => (
                        <option
                          key={recipe.id}
                          value={recipe.id}
                        >
                          {recipe.name}
                        </option>
                      ))}
                    </select>

                    {selectedRecipe && (
                      <p className="day-selected">
                        🍽️ {selectedRecipe.name}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </section>

      {/* Shopping List */}
      <section className="shopping-section">
        <div className="shopping-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Shopping <span className="gradient-text">List</span>
          </h2>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={clearShoppingList}
          >
            Clear Shopping List
          </button>
        </div>

        <p className="section-subtitle">
          Ingredients are automatically collected from your planned
          meals for the entire week.
        </p>

        {ingredients.length > 0 ? (
          <>
            <p>
              {checkedCount} of {ingredients.length} ingredients
              checked
            </p>

            <div className="shopping-list">
              {ingredients.map((ingredient) => (
                <label
                  className={`shopping-item ${
                    checked[ingredient] ? "checked" : ""
                  }`}
                  key={ingredient}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(checked[ingredient])}
                    onChange={(event) =>
                      toggleIngredient(
                        ingredient,
                        event.target.checked
                      )
                    }
                  />

                  <span>{ingredient}</span>
                </label>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state-box">
            <div className="empty-icon">🛒</div>

            <h3 className="empty-title">
              No Ingredients Yet
            </h3>

            <p className="empty-desc">
              Select a recipe for any meal to generate your shopping
              list automatically.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
