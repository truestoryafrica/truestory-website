"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("truestory-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("truestory-theme", nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
    >
      <span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#171310" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4" y1="12" x2="2" y2="12" />
          <line x1="22" y1="12" x2="20" y2="12" />
          <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" />
          <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" />
          <line x1="19.07" y1="19.07" x2="17.66" y2="17.66" />
          <line x1="6.34" y1="6.34" x2="4.93" y2="4.93" />
        </svg>
      </span>
    </button>
  );
}
