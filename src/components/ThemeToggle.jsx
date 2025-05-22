import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle({closeNavbar}) {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className="btn btn-transparent align-self-start"
      onClick={() => {setTheme(theme === "dark" ? "light" : "dark"); closeNavbar();}}
    >
      <i className={`bi ${theme === 'dark' ? 'bi-moon-fill' : 'bi bi-sun-fill'} me-lg-3 fs-3`}></i>
    </button>
  );
}
