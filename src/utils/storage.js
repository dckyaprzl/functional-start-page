const HISTORY_KEY = "startpage_history";
const MAX_HISTORY = 50;

export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToHistory(query) {
  const history = getHistory();

  // hindari duplikat berurutan
  if (history[0] === query) return;

  const updated = [query, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}