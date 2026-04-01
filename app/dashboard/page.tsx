"use client";

import { useMemo, useState } from "react";
import AppNav from "../../components/AppNav";
import { athletes } from "../../data/athletes";

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
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

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

      return (
        matchesSearch &&
        matchesSport &&
        matchesGender &&
        matchesCountry
      );
    });
  }, [search, selectedSport, selectedGender, selectedCountry]);

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f5f5f4,#fafaf9)] p-6">
      <div className="mx-auto max-w-7xl">
        <AppNav active="dashboard" />

        <section className="mb-6 rounded-[32px] bg-black px-8 py-10 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Coach Dashboard
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Discover international student-athletes in one place.
              </h1>
              <p className="mt-4 text-base leading-7 text-neutral-300 sm:text-lg">
                RecruX helps college coaches evaluate talent from Kenya and across
                Africa with clean athlete profiles, academic context, and recruiting-ready filtering.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Athletes
                </p>
                <p className="mt-2 text-2xl font-bold">{athletes.length}</p>
              </div>
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Results
                </p>
                <p className="mt-2 text-2xl font-bold">{filteredAthletes.length}</p>
              </div>
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 col-span-2 sm:col-span-1">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Markets
                </p>
                <p className="mt-2 text-2xl font-bold">4</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Filters
              </p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900">
                Narrow the board
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Sport
                </label>
                <select
                  value={selectedSport}
                  onChange={(event) => setSelectedSport(event.target.value)}
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none"
                >
                  {sports.map((sport) => (
                    <option key={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Gender
                </label>
                <select
                  value={selectedGender}
                  onChange={(event) => setSelectedGender(event.target.value)}
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none"
                >
                  {genders.map((gender) => (
                    <option key={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(event) => setSelectedCountry(event.target.value)}
                  className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none"
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
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-900"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          <section>
            <div className="mb-5 rounded-[28px] bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <input
                  type="text"
                  placeholder="Search athletes by name"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-500 outline-none lg:max-w-2xl"
                />

                <div className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                  {filteredAthletes.length} athlete
                  {filteredAthletes.length === 1 ? "" : "s"} shown
                </div>
              </div>
            </div>

            {filteredAthletes.length === 0 ? (
              <div className="rounded-[28px] bg-white p-10 shadow-sm">
                <h2 className="text-2xl font-bold text-neutral-900">
                  No athletes found
                </h2>
                <p className="mt-3 text-neutral-600">
                  Try changing your search or filters to widen the results.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAthletes.map((athlete) => (
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
          </section>
        </div>
      </div>
    </main>
  );
}
