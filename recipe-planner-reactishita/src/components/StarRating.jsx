import { useEffect, useState } from "react";

const RATINGS_KEY = "recipePlanner.ratings";
const RATINGS_EVENT = "recipePlanner:ratings-changed";

function getRatings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RATINGS_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function readRating(id) {
  const value = Number(getRatings()[String(id)]);
  return Number.isInteger(value) && value >= 1 && value <= 5 ? value : 0;
}

export default function StarRating({ recipeId, recipeName }) {
  const [rating, setRating] = useState(() => readRating(recipeId));

  useEffect(() => {
    const sync = () => setRating(readRating(recipeId));
    sync();
    window.addEventListener(RATINGS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(RATINGS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [recipeId]);

  function rate(value) {
    try {
      const next = { ...getRatings(), [String(recipeId)]: value };
      localStorage.setItem(RATINGS_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: still update the UI for this session */
    }
    setRating(value);
    window.dispatchEvent(new Event(RATINGS_EVENT));
  }

  return (
    <div className="star-rating">
      <div className="star-rating-stars" role="group" aria-label={`Your rating for ${recipeName}`}>
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            className={`star-btn${n <= rating ? " filled" : ""}`}
            onClick={() => rate(n)}
            aria-pressed={n === rating}
            aria-label={`Rate ${n} out of 5 stars`}
          >
            <span aria-hidden="true">★</span>
          </button>
        ))}
      </div>
      <span className="star-rating-label" aria-live="polite">
        {rating ? `${rating} / 5` : "Not rated yet"}
      </span>
    </div>
  );
}