import { useContext } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle({closeNavbar}) {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className="btn btn-transparent align-self-start overflow-hidden"
      onClick={() => {setTheme(theme === "dark" ? "light" : "dark"); closeNavbar();}}
    >
      <AnimatePresence mode="wait" initial={false}>
        <Motion.i
          key={theme}
          className={`bi ${theme === 'dark' ? 'bi-moon-fill' : 'bi bi-sun-fill'} me-lg-3 fs-3 d-inline-block`}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        ></Motion.i>
      </AnimatePresence>
    </button>
  );
}
