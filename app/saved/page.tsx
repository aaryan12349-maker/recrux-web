"use client";

import Link from "next/link";
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
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav active="saved" />

        <section className="rounded-[42px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-8 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-medium text-[#6e6e73]">Saved Board</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
                Keep your shortlist beautifully organized.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[#6e6e73]">
                Save athletes worth revisiting, compare profiles more calmly,
                and build a cleaner recruiting board for your staff.
              </p>
            </div>

            <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 xl:min-w-[180px]">
              <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                Saved
              </p>
              <p className="mt-2 text-3xl font-semibold">{savedAthletes.length}</p>
            </div>
          </div>
        </section>

        <div className="mt-8">
          {savedAthletes.length === 0 ? (
            <section className="rounded-[36px] bg-white p-10 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                No saved athletes yet.
              </h2>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-[#6e6e73]">
                Browse profiles from the dashboard and tap Save Athlete to build your shortlist.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Browse Athletes
              </Link>
            </section>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
              {savedAthletes.map((athlete) => (
                <article
                  key={athlete.id}
                  className="group rounded-[32px] bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-5 h-52 rounded-[26px] bg-[linear-gradient(135deg,#d7d7da,#efeff1)] transition-transform duration-500 group-hover:scale-[1.015]" />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                        {athlete.fullName}
                      </h3>
                      <p className="mt-2 text-sm text-[#6e6e73]">
                        {athlete.country} • {athlete.gender}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs font-medium text-[#6e6e73]">
                      {athlete.sport}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-2 rounded-[24px] bg-[#f7f7f8] p-4 text-sm text-[#6e6e73]">
                    <p>Age: {athlete.age}</p>
                    <p>Class of {athlete.graduationYear}</p>
                    <p>GPA: {athlete.gpa}</p>
                  </div>

                  <p className="mt-5 text-[15px] leading-7 text-[#6e6e73]">
                    {athlete.bio}
                  </p>

                  <Link
                    href={`/athletes/${athlete.id}`}
                    className="mt-6 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    View Profile
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
