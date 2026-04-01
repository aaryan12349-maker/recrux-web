const SAVED_ATHLETES_KEY = "recrux-saved-athletes";

export function getSavedAthletes(): string[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(SAVED_ATHLETES_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveAthlete(id: string) {
  if (typeof window === "undefined") return;

  const current = getSavedAthletes();

  if (!current.includes(id)) {
    localStorage.setItem(
      SAVED_ATHLETES_KEY,
      JSON.stringify([...current, id])
    );
  }
}

export function removeSavedAthlete(id: string) {
  if (typeof window === "undefined") return;

  const current = getSavedAthletes().filter((savedId) => savedId !== id);
  localStorage.setItem(SAVED_ATHLETES_KEY, JSON.stringify(current));
}

export function isAthleteSaved(id: string) {
  return getSavedAthletes().includes(id);
}
