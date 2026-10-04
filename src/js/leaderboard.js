const STORAGE_KEY = 'memory-game:leaderboard';
const MAX_RESULTS = 10;

function isValidResult(result) {
  return Number.isInteger(result?.moves) && Number.isFinite(result?.date);
}

// Fewer moves first, an earlier game wins a tie.
function compareResults(a, b) {
  return a.moves - b.moves || a.date - b.date;
}

export function getResults() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!Array.isArray(saved)) {
      return [];
    }

    return saved.filter(isValidResult).sort(compareResults).slice(0, MAX_RESULTS);
  } catch {
    return [];
  }
}

export function saveResult(moves) {
  const results = [...getResults(), { moves, date: Date.now() }]
    .sort(compareResults)
    .slice(0, MAX_RESULTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // storage can be unavailable (private mode, quota) - the game still works
  }
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}.${month}.${date.getFullYear()}`;
}
