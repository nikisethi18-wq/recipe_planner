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

const slots = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "snacks", label: "Snacks" },
  { key: "dinner", label: "Dinner" }
];

// Estimated prices in rupees for common ingredients
const ingredientPrices = {
  potato: 40,
  potatoes: 40,
  onion: 30,
  onions: 30,
  tomato: 35,
  tomatoes: 35,
  rice: 60,
  milk: 30,
  bread: 40,
  egg: 8,
  eggs: 16,
  butter: 60,
  cheese: 80,
  paneer: 80,
  oil: 120,
  salt: 20,
  sugar: 45,
  flour: 40,
  atta: 40,
  "wheat flour": 40,
  garlic: 30,
  ginger: 25,
  carrot: 40,
  carrots: 40,
  capsicum: 40,
  spinach: 30,
  peas: 50,
  noodles: 40,
  pasta: 60,
  chicken: 180,
  curd: 35,
  yogurt: 35,
  lemon: 10,
  lemons: 20,
  coriander: 15,
  chili: 20,
  "green chili": 20,
  cucumber: 30,
  cucumber: 30,
  corn: 40,
  oats: 60,
  banana: 10,
  bananas: 20,
  apple: 25,
  apples: 50
};

function readStorage(key, fallback) {
  try {
    return JSON.parse(
      localStorage.getItem(key) || JSON.stringify(fallback)
    );
  } catch {
    return fallback;
  }
}

// Find an estimated price for each ingredient
function getIngredientPrice(item) {
  const name = item.toLowerCase().trim();

  // Check for an exact match first
  if (ingredientPrices[name] !== undefined) {
    return ingredientPrices[name];
  }

  // Check whether the ingredient name contains a known ingredient
  const priceKeys = Object.keys(ingredientPrices);

  for (let i = 0; i < priceKeys.length; i++) {
    if (name.includes(priceKeys[i])) {
      return ingredientPrices[priceKeys[i]];
    }
  }

  // Default estimated price for an ingredient without a listed price
  return 20;
}

export default function MealPlanner() {
  const [plan, setPlan] = useState(() =>
    readStorage("mealPlan", {})
  );

  const [checked, setChecked] = useState(() =>
    readStorage("shoppingChecked", {})
  );

  // Save the meal plan
  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(plan));
  }, [plan]);

  // Save shopping list checkbox status
  useEffect(() => {
    localStorage.setItem(
      "shoppingChecked",
      JSON.stringify(checked)
    );
  }, [checked]);

  // Generate unique ingredients from planned recipes
  const ingredients = useMemo(() => {
    const ingredientSet = new Set();

    Object.values(plan).forEach((id) => {
      const recipe = recipes.find(
        (r) => String(r.id) === String(id)
      );

      if (recipe && recipe.ingredients) {
        recipe.ingredients.forEach((item) => {
          ingredientSet.add(item);
        });
      }
    });

    return [...ingredientSet];
  }, [plan]);

  // Calculate total cost of all ingredients
  const totalCost = ingredients.reduce((total, item) => {
    return total + getIngredientPrice(item);
  }, 0);

  // Calculate cost of ingredients still needed
  const remainingCost = ingredients.reduce((total, item) => {
    if (!checked[item]) {
      return total + getIngredientPrice(item);
    }

    return total;
  }, 0);

  return (
    <main className="container">
      {/* Daily Meal Planner */}
      <section className="planner-section">
        <div className="shopping-header">
          <h1
            className="section-title"
            style={{ marginBottom: 0 }}
          >
            Daily <span className="gradient-text">Meal Planner</span>
          </h1>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => setPlan({})}
          >
            Clear Plan
          </button>
        </div>

        <p className="section-subtitle">
          Pick one recipe for each meal of the day — it's saved
          automatically.
        </p>

        <div className="meal-planner-grid">
          {slots.map((slot) => {
            const selected = recipes.find(
              (r) => String(r.id) === String(plan[slot.key])
            );

            return (
              <div className="day-card" key={slot.key}>
                <h3 className="day-name">{slot.label}</h3>

                <select
                  className="day-select filter-select"
                  value={plan[slot.key] || ""}
                  onChange={(e) =>
                    setPlan((old) => {
                      const next = { ...old };

                      if (e.target.value) {
                        next[slot.key] = e.target.value;
                      } else {
                        delete next[slot.key];
                      }

                      return next;
                    })
                  }
                >
                  <option value="">-- Select Recipe --</option>

                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>

                {selected && (
                  <div className="day-selected">
                    🍽 {selected.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Shopping List with Estimated Cost */}
      <section className="shopping-section">
        <div className="shopping-header">
          <h2
            className="section-title"
            style={{ marginBottom: 0 }}
          >
            Shopping <span className="gradient-text">List</span>
          </h2>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => setChecked({})}
          >
            Uncheck All
          </button>
        </div>

        <p className="section-subtitle">
          Ingredients are automatically collected from your planned
          meals. Estimated prices are shown beside each ingredient.
        </p>

        {ingredients.length > 0 ? (
          <>
            <div className="shopping-list">
              {ingredients.map((item) => (
                <label
                  className={`shopping-item ${
                    checked[item] ? "checked" : ""
                  }`}
                  key={item}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(checked[item])}
                    onChange={(e) =>
                      setChecked((old) => ({
                        ...old,
                        [item]: e.target.checked
                      }))
                    }
                  />

                  <span>{item}</span>

                  <span className="ingredient-price">
                    ₹{getIngredientPrice(item)}
                  </span>
                </label>
              ))}
            </div>

            {/* Estimated Bill */}
            <div className="shopping-cost">
              <div className="cost-row">
                <span>Total estimated cost</span>
                <strong>₹{totalCost}</strong>
              </div>

              <div className="cost-row">
                <span>Estimated cost of items still needed</span>
                <strong>₹{remainingCost}</strong>
              </div>

              <p className="cost-note">
                Checked ingredients are treated as already available.
                Prices are estimates and may vary by location.
              </p>
            </div>
          </>
        ) : (
          <div className="empty-state-box">
            <div className="empty-icon">🛒</div>

            <h3 className="empty-title">No Ingredients Yet</h3>

            <p className="empty-desc">
              Select recipes in the Meal Planner above to generate
              your shopping list and estimated bill.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

