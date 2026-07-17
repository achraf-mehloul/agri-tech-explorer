// Client-only theme utilities. Applies a `dark` class on <html>.
// The pre-hydration ScriptOnce in __root.tsx sets the initial class
// before React mounts so there is no flash.

export type Theme = "light" | "dark";
const KEY = "agripen-theme";

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "light" || v === "dark" ? v : null;
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", t === "dark");
  document.documentElement.style.colorScheme = t;
}

export function setTheme(t: Theme) {
  applyTheme(t);
  try {
    window.localStorage.setItem(KEY, t);
  } catch {}
}

// Pre-hydration script — runs before React. Injected in <head> via ScriptOnce.
export const THEME_INIT_SCRIPT = `
(function(){
  try {
    var k = '${KEY}';
    var s = localStorage.getItem(k);
    var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var t = (s === 'light' || s === 'dark') ? s : (m ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.documentElement.style.colorScheme = t;
  } catch(e) {}
})();
`;
