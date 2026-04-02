"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppNav from "../../components/AppNav";
import {
  getDefaultAdminAthletes,
  getStoredAdminAthletes,
  resetAdminAthletes,
  saveAdminAthletes,
  type AdminAthleteRecord,
  type RecruitingStatus,
} from "../../lib/admin-storage";
import { isAdminAuthenticated } from "../../lib/storage";

const statuses: RecruitingStatus[] = [
  "New",
  "Watchlist",
  "Top Target",
  "Contacted",
];

const emptyForm: AdminAthleteRecord = {
  id: "",
  fullName: "",
  country: "",
  sport: "",
  gender: "",
  age: 17,
  gpa: 3.5,
  graduationYear: 2026,
  academicInfo: "",
  athleticStats: "",
  bio: "",
  video: "",
  notes: "",
  status: "New",
  coachNotes: "",
};

function makeId(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function AdminPage() {
  const router = useRouter();
  const [records, setRecords] = useState<AdminAthleteRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState<AdminAthleteRecord>(emptyForm);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("Checking admin access...");

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin-login");
      return;
    }

    const stored = getStoredAdminAthletes();
    setRecords(stored);
    setLoaded(true);
    setMessage("Admin data loaded. Changes now persist in this browser.");
  }, [router]);

  const selectedAthlete = useMemo(
    () => records.find((athlete) => athlete.id === selectedId) ?? null,
    [records, selectedId]
  );

  function updateField<K extends keyof AdminAthleteRecord>(
    key: K,
    value: AdminAthleteRecord[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function persist(nextRecords: AdminAthleteRecord[], nextMessage: string) {
    setRecords(nextRecords);
    saveAdminAthletes(nextRecords);
    setMessage(nextMessage);
  }

  function handleAddAthlete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = form.fullName.trim();
    if (!trimmedName) {
      setMessage("Add a full name first.");
      return;
    }

    const id = makeId(trimmedName);
    if (records.some((athlete) => athlete.id === id)) {
      setMessage("An athlete with that name already exists.");
      return;
    }

    const nextAthlete: AdminAthleteRecord = {
      ...form,
      id,
      fullName: trimmedName,
    };

    const nextRecords = [nextAthlete, ...records];
    persist(nextRecords, `Added ${trimmedName}. This will stay after refresh.`);
    setForm(emptyForm);
  }

  function handleLoadAthlete(athleteId: string) {
    const athlete = records.find((item) => item.id === athleteId);
    if (!athlete) return;

    setSelectedId(athleteId);
    setForm(athlete);
    setMessage(`Loaded ${athlete.fullName} for editing.`);
  }

  function handleSaveChanges() {
    if (!selectedId) {
      setMessage("Select an athlete from the list first.");
      return;
    }

    const nextRecords = records.map((athlete) =>
      athlete.id === selectedId
        ? {
            ...athlete,
            ...form,
            id: selectedId,
          }
        : athlete
    );

    persist(nextRecords, `Saved changes for ${form.fullName}.`);
  }

  function handleDeleteAthlete(id: string) {
    const athlete = records.find((item) => item.id === id);
    if (!athlete) return;

    const nextRecords = records.filter((item) => item.id !== id);
    persist(nextRecords, `Removed ${athlete.fullName}.`);

    if (selectedId === id) {
      setSelectedId(null);
      setForm(emptyForm);
    }
  }

  function handleResetForm() {
    setSelectedId(null);
    setForm(emptyForm);
    setMessage("Form reset. Ready to add a new athlete.");
  }

  function handleResetAllData() {
    const defaults = getDefaultAdminAthletes();
    resetAdminAthletes();
    setRecords(defaults);
    setSelectedId(null);
    setForm(emptyForm);
    setMessage("Reset admin data back to the original athlete list.");
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
        <div className="mx-auto max-w-7xl">
          <AppNav active="admin" showAdminLink showAdminAction />
          <div className="rounded-[36px] bg-white p-10 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            Checking admin access...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav active="admin" showAdminLink showAdminAction />

        <section className="rounded-[42px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-8 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-medium text-[#6e6e73]">Admin</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
                Manage athlete data with clarity.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[#6e6e73]">
                This is the internal control layer for RecruX. Changes made here
                now persist in your browser and power the coach-facing experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:min-w-[260px]">
              <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                  Athletes
                </p>
                <p className="mt-2 text-3xl font-semibold">{records.length}</p>
              </div>

              <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                  Storage
                </p>
                <p className="mt-2 text-3xl font-semibold">Saved</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 rounded-[28px] bg-[#111111] px-6 py-4 text-sm text-white shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
          {message}
        </div>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Athlete Records</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                  Current athlete list
                </h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleResetForm}
                  className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Add New Athlete
                </button>
                <button
                  onClick={handleResetAllData}
                  className="rounded-full bg-[#fff1f1] px-5 py-2.5 text-sm font-medium text-[#b42318] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Reset All
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-black/5">
              <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr_auto] bg-[#f7f7f8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#86868b]">
                <p>Name</p>
                <p>Sport</p>
                <p>Country</p>
                <p>Year</p>
                <p>Status</p>
                <p>Actions</p>
              </div>

              <div className="divide-y divide-black/5">
                {records.map((athlete) => (
                  <div
                    key={athlete.id}
                    className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-4 text-sm text-[#1d1d1f]"
                  >
                    <div>
                      <p className="font-semibold">{athlete.fullName}</p>
                      <p className="mt-1 text-xs text-[#6e6e73]">{athlete.gender}</p>
                    </div>
                    <p>{athlete.sport}</p>
                    <p>{athlete.country}</p>
                    <p>{athlete.graduationYear}</p>
                    <p>{athlete.status}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoadAthlete(athlete.id)}
                        className="rounded-full bg-[#f5f5f7] px-3 py-1.5 text-xs font-medium text-[#1d1d1f]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAthlete(athlete.id)}
                        className="rounded-full bg-[#fff1f1] px-3 py-1.5 text-xs font-medium text-[#b42318]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[36px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <p className="text-sm font-medium text-[#6e6e73]">
              {selectedAthlete ? "Edit Athlete" : "Add Athlete"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
              {selectedAthlete ? selectedAthlete.fullName : "Create a new profile"}
            </h2>

            <form onSubmit={handleAddAthlete} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Full Name
                </label>
                <input
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Country
                  </label>
                  <input
                    value={form.country}
                    onChange={(event) => updateField("country", event.target.value)}
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Sport
                  </label>
                  <input
                    value={form.sport}
                    onChange={(event) => updateField("sport", event.target.value)}
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Gender
                  </label>
                  <input
                    value={form.gender}
                    onChange={(event) => updateField("gender", event.target.value)}
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Age
                  </label>
                  <input
                    type="number"
                    value={form.age}
                    onChange={(event) => updateField("age", Number(event.target.value))}
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    GPA
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.gpa}
                    onChange={(event) => updateField("gpa", Number(event.target.value))}
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    value={form.graduationYear}
                    onChange={(event) =>
                      updateField("graduationYear", Number(event.target.value))
                    }
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Recruiting Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value as RecruitingStatus)
                    }
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Academic Info
                </label>
                <textarea
                  value={form.academicInfo}
                  onChange={(event) => updateField("academicInfo", event.target.value)}
                  rows={3}
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Athletic Stats
                </label>
                <textarea
                  value={form.athleticStats}
                  onChange={(event) => updateField("athleticStats", event.target.value)}
                  rows={3}
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  rows={3}
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Video Link
                </label>
                <input
                  value={form.video}
                  onChange={(event) => updateField("video", event.target.value)}
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Public Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  rows={3}
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Coach Notes
                </label>
                <textarea
                  value={form.coachNotes}
                  onChange={(event) => updateField("coachNotes", event.target.value)}
                  rows={4}
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Add Athlete
                </button>

                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="rounded-full bg-[#f5f5f7] px-6 py-3 text-sm font-medium text-[#1d1d1f] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#6e6e73] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
