export const THEME_STORAGE_KEY = "pakka-theme";

export const themeColors = {
  light: "#fffff8",
  dark: "#1a1814",
} as const;

export type ThemeName = keyof typeof themeColors;

export const themeBootScript = `(function(){
  var key = ${JSON.stringify(THEME_STORAGE_KEY)};
  var colors = ${JSON.stringify(themeColors)};
  function stored() {
    try {
      var value = localStorage.getItem(key);
      if (value === "dark" || value === "light") return value;
    } catch (e) {}
    return null;
  }
  function system() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function apply(theme) {
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    root.style.backgroundColor = colors[theme];
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute("content", colors[theme]);
  }
  apply(stored() || system());
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  if (media.addEventListener) {
    media.addEventListener("change", function () {
      if (!stored()) apply(system());
    });
  }
})();`;
