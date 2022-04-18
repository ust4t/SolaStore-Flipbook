export function loadState(key, fallback) {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return fallback;
    return JSON.parse(serializedState);
  } catch (e) {
    return fallback;
  }
}

export async function saveState(key, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // Ignore
    console.log(e);
  }
}
