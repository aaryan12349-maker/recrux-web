const REQUESTS_KEY = "recrux-info-requests";

export type InfoRequestRecord = {
  id: string;
  athleteId: string;
  athleteName: string;
  coachName: string;
  coachEmail: string;
  school: string;
  message: string;
  createdAt: string;
  status: "New" | "Reviewed";
};

export function getStoredRequests(): InfoRequestRecord[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(REQUESTS_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as InfoRequestRecord[];
  } catch {
    return [];
  }
}

export function saveRequests(requests: InfoRequestRecord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
}

export function addInfoRequest(request: InfoRequestRecord) {
  const current = getStoredRequests();
  saveRequests([request, ...current]);
}

export function markRequestReviewed(id: string) {
  const next = getStoredRequests().map((request) =>
    request.id === id ? { ...request, status: "Reviewed" as const } : request
  );

  saveRequests(next);
}

export function deleteRequest(id: string) {
  const next = getStoredRequests().filter((request) => request.id !== id);
  saveRequests(next);
}
