import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Layout({ children, protectedPage = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  }
const links = [
  ["/", "Home"],
  ["/recipes", "Recipes"],
  ["/ingredient-search", "What Can I Make?"],
  ["/favourites", "Favourites"],
  ["/meal-planner", "Meal Planner"]
];
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo"><span className="logo-icon">🌿</span> Recipe Discovery</Link>
          {protectedPage && (
            <>
              <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
              <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                {links.map(([to, label]) => (
                  <li key={to}><NavLink to={to} end={to === "/"} onClick={() => setMenuOpen(false)}>{label}</NavLink></li>
                ))}
                <li><a href="/login" className="nav-logout" onClick={(e) => { e.preventDefault(); logout(); }}>Logout ⏻</a></li>
              </ul>
            </>
          )}
        </div>
      </nav>
      {children}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-text"><strong>Recipe Discovery Platform</strong> — Semester Project</div>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/favourites">Favourites</Link></li>
            <li><Link to="/meal-planner">Meal Planner</Link></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
