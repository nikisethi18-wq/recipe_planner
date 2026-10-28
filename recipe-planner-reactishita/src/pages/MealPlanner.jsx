import { useEffect, useMemo, useState } from "react";
import { recipes } from "../recipes.js";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const slots = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "snacks", label: "Snacks" },
  { key: "dinner", label: "Dinner" },
];

// Estimated prices in rupees for common ingredients.
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
  corn: 40,
  oats: 60,
  banana: 10,
  bananas: 20,
  apple: 25,
  apples: 50,
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

// Get the estimated price of an ingredient.
function getIngredientPrice(item) {
  const name = item.toLowerCase().trim();

  if (ingredientPrices[name] !== undefined) {
    return ingredientPrices[name];
  }

  const priceKeys = Object.keys(ingredientPrices);

  for (let i = 0; i < priceKeys.length; i++) {
    if (name.includes(priceKeys[i])) {
      return ingredientPrices[priceKeys[i]];
    }
  }

  // Default estimated price.
  return 20;
}

export default function MealPlanner() {
  const [plan, setPlan] = useState(() =>
    readStorage("mealPlan", {})
  );

  const [checked, setChecked] = useState(() =>
    readStorage("shoppingChecked", {})
  );

  // Save the weekly meal plan.
  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(plan));
  }, [plan]);

  // Save shopping checklist status.
  useEffect(() => {
    localStorage.setItem(
      "shoppingChecked",
      JSON.stringify(checked)
    );
  }, [checked]);

  // Collect unique ingredients from all selected meals.
  const ingredients = useMemo(() => {
    const ingredientSet = new Set();

    Object.values(plan).forEach((recipeId) => {
      if (
        recipeId === "" ||
        recipeId === null ||
        recipeId === undefined
      ) {
        return;
      }

      const recipe = recipes.find(
        (item) => String(item.id) === String(recipeId)
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

  // Update shopping checkbox status.
  function toggleIngredient(ingredient, isChecked) {
    setChecked((oldChecked) => ({
      ...oldChecked,
      [ingredient]: isChecked,
    }));
  }

  // Count checked ingredients.
  const checkedCount = ingredients.filter(
    (ingredient) => Boolean(checked[ingredient])
  ).length;

  // Calculate total estimated cost.
  const totalCost = ingredients.reduce(
    (total, item) => total + getIngredientPrice(item),
    0
  );

  // Calculate cost of ingredients still needed.
  const remainingCost = ingredients.reduce((total, item) => {
    if (!checked[item]) {
      return total + getIngredientPrice(item);
    }

    return total;
  }, 0);

  return (
    <main className="container">
      {/* Weekly Meal Planner */}
      <section className="planner-section">
        <div className="shopping-header">
          <h1
            className="section-title"
            style={{ marginBottom: 0 }}
          >
            Weekly{" "}
            <span className="gradient-text">Meal Planner</span>
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
          Plan your meals from Monday to Sunday. Your selections
          are saved automatically.
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

      {/* Shopping List with Estimated Cost */}
      <section className="shopping-section">
        <div className="shopping-header">
          <h2
            className="section-title"
            style={{ marginBottom: 0 }}
          >
            Shopping{" "}
            <span className="gradient-text">List</span>
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
          meals for the entire week. Estimated prices are shown
          beside each ingredient.
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

                  <span className="ingredient-price">
                    ₹{getIngredientPrice(ingredient)}
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
                <span>
                  Estimated cost of items still needed
                </span>
                <strong>₹{remainingCost}</strong>
              </div>

              <p className="cost-note">
                Checked ingredients are treated as already
                available. Prices are estimates and may vary by
                location.
              </p>
            </div>
          </>
        ) : (
          <div className="empty-state-box">
            <div className="empty-icon">🛒</div>

            <h3 className="empty-title">
              No Ingredients Yet
            </h3>

            <p className="empty-desc">
              Select recipes for any meals during the week to
              generate your shopping list and estimated bill.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}