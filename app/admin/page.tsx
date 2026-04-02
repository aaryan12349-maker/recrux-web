"use client";

import { useMemo, useState } from "react";
import AppNav from "../../components/AppNav";
import { athletes as initialAthletes } from "../../data/athletes";

type AthleteRecord = {
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

const emptyForm: AthleteRecord = {
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
};

function makeId(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function AdminPage() {
  const [records, setRecords] = useState<AthleteRecord[]>(
    initialAthletes.map((athlete) => ({
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
    }))
  );

  const [form, setForm] = useState<AthleteRecord>(emptyForm);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("Demo admin mode. Changes are local for now.");

  const selectedAthlete = useMemo(
    () => records.find((athlete) => athlete.id === selectedId) ?? null,
    [records, selectedId]
  );

  function updateField<K extends keyof AthleteRecord>(key: K, value: AthleteRecord[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
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
      setMessage("An athlete with that name already exists in demo mode.");
      return;
    }

    const nextAthlete: AthleteRecord = {
      ...form,
      id,
      fullName: trimmedName,
    };

    setRecords((current) => [nextAthlete, ...current]);
    setForm(emptyForm);
    setMessage(`Added ${trimmedName} to the demo admin list.`);
  }

  function handleLoadAthlete(athleteId: string) {
    const athlete = records.find((item) => item.id === athleteId);
    if (!athlete) return;

    setSelectedId(athleteId);
    setForm(athlete);
    setMessage(`Loaded ${athlete.fullName} for review.`);
  }

  function handleSaveChanges() {
    if (!selectedId) {
      setMessage("Select an athlete from the list first.");
      return;
    }

    setRecords((current) =>
      current.map((athlete) =>
        athlete.id === selectedId
          ? {
              ...athlete,
              ...form,
              id: selectedId,
            }
          : athlete
      )
    );

    setMessage(`Saved demo changes for ${form.fullName}.`);
  }

  function handleDeleteAthlete(id: string) {
    const athlete = records.find((item) => item.id === id);
    if (!athlete) return;

    setRecords((current) => current.filter((item) => item.id !== id));

    if (selectedId === id) {
      setSelectedId(null);
      setForm(emptyForm);
    }

    setMessage(`Removed ${athlete.fullName} from the demo admin list.`);
  }

  function handleResetForm() {
    setSelectedId(null);
    setForm(emptyForm);
    setMessage("Form reset. Ready to add a new athlete.");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav showAuthAction showAdminLink active="admin" />

        <section className="rounded-[42px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-8 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-medium text-[#6e6e73]">Admin</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
                Manage athlete data with clarity.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[#6e6e73]">
                This is the internal control layer for RecruX. You can review the
                athlete list, load a profile into the editor, make demo changes,
                and add new athletes locally.
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
                  Mode
                </p>
                <p className="mt-2 text-3xl font-semibold">Local</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 rounded-[28px] bg-[#111111] px-6 py-4 text-sm text-white shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
          {message}
        </div>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Athlete Records</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                  Current athlete list
                </h2>
              </div>

              <button
                onClick={handleResetForm}
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Add New Athlete
              </button>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-black/5">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_auto] bg-[#f7f7f8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#86868b]">
                <p>Name</p>
                <p>Sport</p>
                <p>Country</p>
                <p>Year</p>
                <p>Actions</p>
              </div>

              <div className="divide-y divide-black/5">
                {records.map((athlete) => (
                  <div
                    key={athlete.id}
                    className="grid grid-cols-[1.4fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-4 text-sm text-[#1d1d1f]"
                  >
                    <div>
                      <p className="font-semibold">{athlete.fullName}</p>
                      <p className="mt-1 text-xs text-[#6e6e73]">{athlete.gender}</p>
                    </div>
                    <p>{athlete.sport}</p>
                    <p>{athlete.country}</p>
                    <p>{athlete.graduationYear}</p>
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
                  Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  rows={3}
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
