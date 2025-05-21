import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className="btn btn-transparent"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <i className={`bi ${theme === 'dark' ? 'bi-moon-fill' : 'bi bi-sun-fill'} mx-3 fs-3`}></i>
    </button>
  );
}
