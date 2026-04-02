"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppNav from "../../components/AppNav";
import MockAthletePortrait from "../../components/MockAthletePortrait";
import { athletes } from "../../data/athletes";
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

export default function DashboardPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
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
  }, [search, selectedSport, selectedGender, selectedCountry]);

  if (!allowed) {
    return (
      <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[36px] bg-white p-10 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">
              Checking access...
            </h1>
            <p className="mt-3 text-lg text-[#6e6e73]">
              Redirecting you to the right place.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav active="dashboard" showAppLinks showAuthAction />

        <section className="rounded-[42px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-8 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-medium text-[#6e6e73]">
                Coach Dashboard
              </p>
              <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
                Explore athlete profiles with more focus.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-[#6e6e73]">
                Search and filter the board to surface athletes that match your
                recruiting priorities, then move into deeper profile review with
                minimal friction.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 xl:min-w-[360px]">
              <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                  Total
                </p>
                <p className="mt-2 text-3xl font-semibold">{athletes.length}</p>
              </div>

              <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                  Showing
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {filteredAthletes.length}
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                  Markets
                </p>
                <p className="mt-2 text-3xl font-semibold">4</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[320px_1fr]">
          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-[36px] bg-white p-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
              <div className="mb-6">
                <p className="text-sm font-medium text-[#6e6e73]">Filters</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
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
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none"
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
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none"
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
                    className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none"
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
                  className="mt-2 w-full rounded-[22px] bg-black px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-6 rounded-[32px] bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <input
                  type="text"
                  placeholder="Search athletes by name"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-5 py-3.5 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92] xl:max-w-2xl"
                />

                <div className="rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-medium text-[#6e6e73]">
                  {filteredAthletes.length} athlete
                  {filteredAthletes.length === 1 ? "" : "s"} visible
                </div>
              </div>
            </div>

            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">
                  Athlete Board
                </p>
                <h2 className="mt-2 text-4xl font-semibold tracking-[-0.03em]">
                  Curated profiles.
                </h2>
              </div>
              <p className="hidden max-w-md text-right text-sm leading-6 text-[#6e6e73] lg:block">
                Every profile is presented for evaluation, not conversation. The
                experience is intentionally coach-first and distraction-free.
              </p>
            </div>

            {filteredAthletes.length === 0 ? (
              <div className="rounded-[32px] bg-white p-10 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
                <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                  No athletes found.
                </h2>
                <p className="mt-3 text-lg text-[#6e6e73]">
                  Try widening your search or filter settings.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {filteredAthletes.map((athlete) => (
                  <article
                    key={athlete.id}
                    className="group rounded-[32px] bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)]"
                  >
                    <div className="mb-5 transition-transform duration-500 group-hover:scale-[1.015]">
                      <MockAthletePortrait
                        name={athlete.fullName}
                        sport={athlete.sport}
                        country={athlete.country}
                      />
                    </div>

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
          </section>
        </div>
      </div>
    </main>
  );
}
