"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppNav from "../../components/AppNav";
import MockAthletePortrait from "../../components/MockAthletePortrait";
import {
  getStoredAdminAthletes,
  type AdminAthleteRecord,
} from "../../lib/admin-storage";
import {
  getSavedAthletes,
  hasActiveSubscription,
  isDemoAuthenticated,
} from "../../lib/storage";

function statusClasses(status: AdminAthleteRecord["status"]) {
  if (status === "Top Target") {
    return "bg-[#111111] text-white";
  }

  if (status === "Watchlist") {
    return "bg-[#eef2ff] text-[#3730a3]";
  }

  if (status === "Contacted") {
    return "bg-[#ecfdf3] text-[#027a48]";
  }

  return "bg-[#f4f4f5] text-[#52525b]";
}

export default function SavedPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [allAthletes, setAllAthletes] = useState<AdminAthleteRecord[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isDemoAuthenticated()) {
      router.replace("/login");
      return;
    }

    if (!hasActiveSubscription()) {
      router.replace("/pricing");
      return;
    }

    setAllAthletes(getStoredAdminAthletes());
    setSavedIds(getSavedAthletes());
    setAllowed(true);
  }, [router]);

  const savedAthletes = allAthletes.filter((athlete) =>
    savedIds.includes(athlete.id)
  );

  if (!allowed) {
    return (
      <main className="min-h-screen bg-[#f5f5f7] px-4 pb-16 pt-4 text-[#1d1d1f] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 sm:rounded-[36px] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">
              Checking access...
            </h1>
            <p className="mt-3 text-base text-[#6e6e73] sm:text-lg">
              Redirecting you to the right place.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 pb-16 pt-4 text-[#1d1d1f] sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <AppNav active="saved" showAppLinks showAuthAction />

        <section className="rounded-[32px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:rounded-[42px] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-medium text-[#6e6e73]">Saved Board</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl xl:text-7xl">
                Keep your shortlist beautifully organized.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#6e6e73] sm:text-lg lg:text-xl lg:leading-9">
                Save athletes you want to revisit, compare, or discuss with your
                staff as you narrow your recruiting board.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:min-w-[220px]">
              <div className="rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 sm:rounded-[28px] sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b] sm:text-xs">
                  Saved
                </p>
                <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {savedAthletes.length}
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 sm:rounded-[28px] sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b] sm:text-xs">
                  Ready
                </p>
                <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {savedAthletes.filter((athlete) => athlete.status === "Top Target").length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8">
          {savedAthletes.length === 0 ? (
            <section className="rounded-[30px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 sm:rounded-[36px] sm:p-10">
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                No saved athletes yet.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-8 text-[#6e6e73] sm:text-lg">
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
            <>
              <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6e6e73]">Saved Athletes</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                    Your active shortlist.
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-[#6e6e73] lg:text-right">
                  Use this board to keep your strongest prospects in view while you compare profiles and decide who deserves more follow-up.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {savedAthletes.map((athlete) => (
                  <article
                    key={athlete.id}
                    className="group overflow-hidden rounded-[30px] bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-5"
                  >
                    <div className="mb-5 overflow-hidden rounded-[24px] transition-transform duration-500 group-hover:scale-[1.015]">
                      <MockAthletePortrait
                        name={athlete.fullName}
                        sport={athlete.sport}
                        country={athlete.country}
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                            {athlete.fullName}
                          </h3>
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusClasses(
                              athlete.status
                            )}`}
                          >
                            {athlete.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-[#6e6e73]">
                          {athlete.country} • {athlete.gender}
                        </p>
                      </div>

                      <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs font-medium text-[#6e6e73]">
                        {athlete.sport}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2 rounded-[22px] bg-[#f7f7f8] p-4 text-sm text-[#6e6e73] sm:rounded-[24px]">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#8d8d92]">
                          Age
                        </p>
                        <p className="mt-1 font-medium text-[#1d1d1f]">{athlete.age}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#8d8d92]">
                          Year
                        </p>
                        <p className="mt-1 font-medium text-[#1d1d1f]">
                          {athlete.graduationYear}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#8d8d92]">
                          GPA
                        </p>
                        <p className="mt-1 font-medium text-[#1d1d1f]">{athlete.gpa}</p>
                      </div>
                    </div>

                    <p className="mt-5 line-clamp-3 text-[15px] leading-7 text-[#6e6e73]">
                      {athlete.bio}
                    </p>

                    {athlete.coachNotes ? (
                      <div className="mt-5 rounded-[22px] bg-[#fff8e8] px-4 py-3 text-sm text-[#7a5d00] ring-1 ring-[#7a5d00]/10">
                        <p className="font-medium">Coach Notes</p>
                        <p className="mt-1 line-clamp-2">{athlete.coachNotes}</p>
                      </div>
                    ) : null}

                    <Link
                      href={`/athletes/${athlete.id}`}
                      className="mt-6 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                    >
                      View Profile
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
