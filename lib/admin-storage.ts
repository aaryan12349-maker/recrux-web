import { athletes as defaultAthletes } from "../data/athletes";

const ADMIN_ATHLETES_KEY = "recrux-admin-athletes";

export type AdminAthleteRecord = {
  id: string;
  fullName: string;
  country: string;
  sport: string;
  gender: string;
  age: number;
  gpa: number;
  graduationYear: number;
  academicInfo: string;
  athleticStats: string;
  bio: string;
  video: string;
  notes: string;
};

export function getDefaultAdminAthletes(): AdminAthleteRecord[] {
  return defaultAthletes.map((athlete) => ({
    id: athlete.id,
    fullName: athlete.fullName,
    country: athlete.country,
    sport: athlete.sport,
    gender: athlete.gender,
    age: athlete.age,
    gpa: athlete.gpa,
    graduationYear: athlete.graduationYear,
    academicInfo: athlete.academicInfo,
    athleticStats: athlete.athleticStats,
    bio: athlete.bio,
    video: athlete.video,
    notes: athlete.notes,
  }));
}

export function getStoredAdminAthletes(): AdminAthleteRecord[] {
  if (typeof window === "undefined") {
    return getDefaultAdminAthletes();
  }

  const stored = localStorage.getItem(ADMIN_ATHLETES_KEY);
  if (!stored) {
    return getDefaultAdminAthletes();
  }

  try {
    return JSON.parse(stored) as AdminAthleteRecord[];
  } catch {
    return getDefaultAdminAthletes();
  }
}

export function saveAdminAthletes(records: AdminAthleteRecord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_ATHLETES_KEY, JSON.stringify(records));
}

export function resetAdminAthletes() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_ATHLETES_KEY);
}
