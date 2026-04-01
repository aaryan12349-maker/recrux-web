"use client";

import { useEffect, useState } from "react";
import AppNav from "../../components/AppNav";
import { athletes } from "../../data/athletes";
import { getSavedAthletes } from "../../lib/storage";

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(getSavedAthletes());
  }, []);

  const savedAthletes = athletes.filter((athlete) =>
    savedIds.includes(athlete.id)
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f5f5f4,#fafaf9)] p-6">
      <div className="mx-auto max-w-7xl">
        <AppNav active="saved" />

        <section className="mb-6 rounded-[32px] bg-black px-8 py-10 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Saved Board
          </p>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Keep your shortlist organized.
              </h1>
              <p className="mt-4 text-base leading-7 text-neutral-300 sm:text-lg">
                Save athletes you want to revisit, compare, or discuss with your
                staff as you narrow your recruiting board.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                Saved Athletes
              </p>
              <p className="mt-2 text-3xl font-bold">{savedAthletes.length}</p>
            </div>
          </div>
        </section>

        {savedAthletes.length === 0 ? (
          <div className="rounded-[28px] bg-white p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900">
              No saved athletes yet
            </h2>
            <p className="mt-3 text-neutral-600">
              Go to an athlete profile and click <span className="font-semibold">Save Athlete</span>.
            </p>

            <a
              href="/dashboard"
              className="mt-6 inline-block rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Browse Athletes
            </a>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {savedAthletes.map((athlete) => (
              <article
                key={athlete.id}
                className="rounded-[28px] bg-white p-5 shadow-sm transition hover:-translate-y-1"
              >
                <div className="mb-4 h-44 rounded-[24px] bg-[linear-gradient(135deg,#d4d4d4,#e5e5e5)]" />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {athlete.fullName}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      {athlete.country} • {athlete.gender}
                    </p>
                  </div>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                    {athlete.sport}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
                  <p>Age: {athlete.age}</p>
                  <p>Class of {athlete.graduationYear}</p>
                  <p>GPA: {athlete.gpa}</p>
                </div>

                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  {athlete.bio}
                </p>

                <a
                  href={`/athletes/${athlete.id}`}
                  className="mt-5 inline-block rounded-full bg-black px-5 py-2 text-sm font-semibold text-white"
                >
                  View Profile
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
