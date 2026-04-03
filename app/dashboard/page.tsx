"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppNav from "../../components/AppNav";
import MockAthletePortrait from "../../components/MockAthletePortrait";
import {
  getStoredAdminAthletes,
  type AdminAthleteRecord,
} from "../../lib/admin-storage";
import {
  hasActiveSubscription,
  isDemoAuthenticated,
} from "../../lib/storage";

const sports = [
  "All Sports",
  "Tennis",
  "Track and Field",
  "Soccer",
  "Basketball",
  "Volleyball",
];

const genders = ["All", "Male", "Female"];
const countries = ["All Countries", "Kenya", "Nigeria", "Tanzania", "Uganda"];

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

export default function DashboardPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [athletes, setAthletes] = useState<AdminAthleteRecord[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  useEffect(() => {
    if (!isDemoAuthenticated()) {
      router.replace("/login");
      return;
    }

    if (!hasActiveSubscription()) {
      router.replace("/pricing");
      return;
    }

    setAthletes(getStoredAdminAthletes());
    setAllowed(true);
  }, [router]);

  const filteredAthletes = useMemo(() => {
    return athletes.filter((athlete) => {
      const matchesSearch = athlete.fullName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSport =
        selectedSport === "All Sports" || athlete.sport === selectedSport;

      const matchesGender =
        selectedGender === "All" || athlete.gender === selectedGender;

      const matchesCountry =
        selectedCountry === "All Countries" ||
        athlete.country === selectedCountry;

      return matchesSearch && matchesSport && matchesGender && matchesCountry;
    });
  }, [athletes, search, selectedSport, selectedGender, selectedCountry]);

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
        <AppNav active="dashboard" showAppLinks showAuthAction />

        <section className="rounded-[32px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:rounded-[42px] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-medium text-[#6e6e73]">
                Coach Dashboard
              </p>
              <h1 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl xl:text-7xl">
                Explore athlete profiles with more focus.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#6e6e73] sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
                Search and filter the board to surface athletes that match your
                recruiting priorities, then move into deeper profile review with
                minimal friction.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 xl:min-w-[360px]">
              <div className="rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 sm:rounded-[28px] sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b] sm:text-xs">
                  Total
                </p>
                <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {athletes.length}
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 sm:rounded-[28px] sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b] sm:text-xs">
                  Showing
                </p>
                <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {filteredAthletes.length}
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 sm:rounded-[28px] sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b] sm:text-xs">
                  Markets
                </p>
                <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {new Set(athletes.map((athlete) => athlete.country)).size}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[320px_1fr]">
          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-[30px] bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 sm:rounded-[36px] sm:p-6">
              <div className="mb-6">
                <p className="text-sm font-medium text-[#6e6e73]">Filters</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  Refine the board.
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Sport
                  </label>
                  <select
                    value={selectedSport}
                    onChange={(event) => setSelectedSport(event.target.value)}
                    className="w-full rounded-[20px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none sm:rounded-[22px]"
                  >
                    {sports.map((sport) => (
                      <option key={sport}>{sport}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Gender
                  </label>
                  <select
                    value={selectedGender}
                    onChange={(event) => setSelectedGender(event.target.value)}
                    className="w-full rounded-[20px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none sm:rounded-[22px]"
                  >
                    {genders.map((gender) => (
                      <option key={gender}>{gender}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                    Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(event) => setSelectedCountry(event.target.value)}
                    className="w-full rounded-[20px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none sm:rounded-[22px]"
                  >
                    {countries.map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedSport("All Sports");
                    setSelectedGender("All");
                    setSelectedCountry("All Countries");
                  }}
                  className="mt-2 w-full rounded-[20px] bg-black px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 sm:rounded-[22px]"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-6 rounded-[28px] bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 sm:rounded-[32px] sm:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <input
                  type="text"
                  placeholder="Search athletes by name"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-[20px] border border-black/8 bg-[#fafafc] px-5 py-3.5 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92] sm:rounded-[22px] xl:max-w-2xl"
                />

                <div className="self-start rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-medium text-[#6e6e73] xl:self-auto">
                  {filteredAthletes.length} athlete
                  {filteredAthletes.length === 1 ? "" : "s"} visible
                </div>
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">
                  Athlete Board
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  Curated profiles.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#6e6e73] lg:text-right">
                Every profile is presented for evaluation, not conversation. The
                experience is intentionally coach-first and distraction-free.
              </p>
            </div>

            {filteredAthletes.length === 0 ? (
              <div className="rounded-[28px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 sm:rounded-[32px] sm:p-10">
                <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                  No athletes found.
                </h2>
                <p className="mt-3 text-base text-[#6e6e73] sm:text-lg">
                  Try widening your search or filter settings.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {filteredAthletes.map((athlete) => (
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
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
