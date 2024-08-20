import { useEffect, useState } from "react";

export default function DarkModeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(function () {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = function () {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-md ${isDarkMode ? "text-gray-100" : ""}`}
    >
      {isDarkMode ? "☼" : "☽"}
    </button>
  );
}
