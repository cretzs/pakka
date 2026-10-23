"use client";

import { THEME_STORAGE_KEY, themeColors, type ThemeName } from "@/lib/theme";

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.style.backgroundColor = themeColors[theme];
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", themeColors[theme]);
  });
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked in private mode. The choice still applies for this view.
  }
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Switch between day and night"
      onClick={() => {
        const next: ThemeName = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next);
      }}
    >
      <span className="theme-toggle-night">night</span>
      <span className="theme-toggle-day">day</span>
    </button>
  );
}
