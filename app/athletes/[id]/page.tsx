"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppNav from "../../../components/AppNav";
import PageTransition from "../../../components/PageTransition";
import { athletes } from "../../../data/athletes";
import {
  getSavedAthletes,
  removeSavedAthlete,
  saveAthlete,
} from "../../../lib/storage";

type AthletePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function AthleteProfilePage({ params }: AthletePageProps) {
  const [athleteId, setAthleteId] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setAthleteId(resolvedParams.id);
    }

    loadParams();
  }, [params]);

  const athlete = athletes.find((a) => a.id === athleteId);

  useEffect(() => {
    if (!athleteId) return;
    const savedIds = getSavedAthletes();
    setSaved(savedIds.includes(athleteId));
  }, [athleteId]);

  function handleSaveToggle() {
    if (!athleteId) return;

    if (saved) {
      removeSavedAthlete(athleteId);
      setSaved(false);
    } else {
      saveAthlete(athleteId);
      setSaved(true);
    }
  }

  if (!athlete) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-[linear-gradient(to_bottom,#f5f5f4,#fafaf9)] p-6">
          <div className="mx-auto max-w-6xl">
            <AppNav active="profile" />
            <div className="rounded-[28px] bg-white p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-neutral-900">Athlete not found</h1>
              <p className="mt-3 text-neutral-600">
                This athlete profile does not exist.
              </p>
            </div>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-[linear-gradient(to_bottom,#f5f5f4,#fafaf9)] p-6">
        <div className="mx-auto max-w-6xl">
          <AppNav active="profile" />

          <Link
            href="/dashboard"
            className="mb-6 inline-block rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-0.5"
          >
            Back to Dashboard
          </Link>

          <section className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
              <div>
                <div className="h-[420px] rounded-[28px] bg-[linear-gradient(135deg,#d4d4d4,#e5e5e5)]" />
              </div>

              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500">
                      RecruX Athlete Profile
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                      {athlete.fullName}
                    </h1>

                    <p className="mt-4 text-lg text-neutral-600">
                      {athlete.sport} • {athlete.country}
                    </p>
                  </div>

                  <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                    Class of {athlete.graduationYear}
                  </span>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-neutral-50 p-5">
                    <p className="text-sm text-neutral-500">Gender</p>
                    <p className="mt-2 text-2xl font-bold text-neutral-900">
                      {athlete.gender}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 p-5">
                    <p className="text-sm text-neutral-500">Age</p>
                    <p className="mt-2 text-2xl font-bold text-neutral-900">
                      {athlete.age}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 p-5">
                    <p className="text-sm text-neutral-500">GPA</p>
                    <p className="mt-2 text-2xl font-bold text-neutral-900">
                      {athlete.gpa}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 p-5">
                    <p className="text-sm text-neutral-500">Graduation Year</p>
                    <p className="mt-2 text-2xl font-bold text-neutral-900">
                      {athlete.graduationYear}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={handleSaveToggle}
                    className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {saved ? "Saved Athlete" : "Save Athlete"}
                  </button>

                  <button className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-0.5">
                    Request More Info
                  </button>
                </div>

                <p className="mt-4 text-sm text-neutral-500">
                  Coach-facing only. Request flow can be connected to email, CRM, or admin review later.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6">
              <div className="rounded-[28px] bg-neutral-50 p-6">
                <h2 className="text-2xl font-bold text-neutral-900">Academic Info</h2>
                <p className="mt-3 leading-7 text-neutral-600">{athlete.academicInfo}</p>
              </div>

              <div className="rounded-[28px] bg-neutral-50 p-6">
                <h2 className="text-2xl font-bold text-neutral-900">Athletic Stats</h2>
                <p className="mt-3 leading-7 text-neutral-600">{athlete.athleticStats}</p>
              </div>

              <div className="rounded-[28px] bg-neutral-50 p-6">
                <h2 className="text-2xl font-bold text-neutral-900">Bio</h2>
                <p className="mt-3 leading-7 text-neutral-600">{athlete.bio}</p>
              </div>

              <div className="rounded-[28px] bg-neutral-50 p-6">
                <h2 className="text-2xl font-bold text-neutral-900">Highlight Video</h2>
                <a
                  href={athlete.video}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-blue-600 underline"
                >
                  Watch Highlight Video
                </a>
              </div>

              <div className="rounded-[28px] bg-neutral-50 p-6">
                <h2 className="text-2xl font-bold text-neutral-900">Notes</h2>
                <p className="mt-3 leading-7 text-neutral-600">{athlete.notes}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
