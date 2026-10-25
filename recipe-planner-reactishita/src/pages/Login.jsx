import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    const users = JSON.parse(localStorage.getItem("recipeUsers") || "{}");

    if (tab === "register") {
      if (users[username]) {
        setMessage("That username already exists. Please choose another.");
        return;
      }
      users[username] = password;
      localStorage.setItem("recipeUsers", JSON.stringify(users));
      setMessage("Account created. You can now log in.");
      setSuccess(true);
      setTab("login");
      setPassword("");
      return;
    }

    if (!username || !password) {
      setMessage("Please fill in both username and password.");
      return;
    }
    if (users[username] && users[username] === password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", username);
      navigate("/");
    } else {
      setMessage("Incorrect username or password. Create an account if this is your first visit.");
    }
  }

  return (
    <main className="auth-main">
      <div className="auth-card">
        <h1 className="auth-title">Welcome <span className="gradient-text">Back</span></h1>
        <p className="auth-subtitle">Login or create an account to plan your meals.</p>
        <div className="auth-tabs">
          <button type="button" className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => { setTab("login"); setMessage(""); }}>Login</button>
          <button type="button" className={`auth-tab ${tab === "register" ? "active" : ""}`} onClick={() => { setTab("register"); setMessage(""); }}>Create Account</button>
        </div>
        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label htmlFor="username">{tab === "login" ? "Username" : "Choose a Username"}</label>
            <input id="username" className="auth-input" value={username} onChange={e => setUsername(e.target.value)} placeholder={tab === "login" ? "Enter your username" : "Choose a username"} required />
          </div>
          <div className="auth-field">
            <label htmlFor="password">{tab === "login" ? "Password" : "Choose a Password"}</label>
            <input id="password" type="password" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} placeholder={tab === "login" ? "Enter your password" : "Choose a password"} required />
          </div>
          {message && <p className={`auth-message ${success ? "auth-success" : "auth-error"}`}>{message}</p>}
          <button type="submit" className="btn btn-primary w-100">{tab === "login" ? "Login" : "Create Account"}</button>
        </form>
        <p className="auth-hint">This is a client-side demo using localStorage. It does not use a secure backend.</p>
      </div>
    </main>
  );
}
