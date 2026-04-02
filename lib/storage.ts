const SAVED_ATHLETES_KEY = "recrux-saved-athletes";
const DEMO_AUTH_KEY = "recrux-demo-auth";
const DEMO_SUBSCRIPTION_KEY = "recrux-demo-subscription";
const DEMO_PLAN_KEY = "recrux-demo-plan";

export function getSavedAthletes(): string[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(SAVED_ATHLETES_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveAthlete(id: string) {
  if (typeof window === "undefined") return;

  const current = getSavedAthletes();
  if (!current.includes(id)) {
    localStorage.setItem(SAVED_ATHLETES_KEY, JSON.stringify([...current, id]));
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

export function isDemoAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DEMO_AUTH_KEY) === "true";
}

export function loginDemoUser() {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_AUTH_KEY, "true");
}

export function logoutDemoUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DEMO_AUTH_KEY);
  localStorage.removeItem(DEMO_SUBSCRIPTION_KEY);
  localStorage.removeItem(DEMO_PLAN_KEY);
  localStorage.removeItem(SAVED_ATHLETES_KEY);
}

export function hasActiveSubscription() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DEMO_SUBSCRIPTION_KEY) === "true";
}

export function getDemoPlan() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(DEMO_PLAN_KEY);
}

export function activateDemoSubscription(plan: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_SUBSCRIPTION_KEY, "true");
  localStorage.setItem(DEMO_AUTH_KEY, "true");
  localStorage.setItem(DEMO_PLAN_KEY, plan);
}
