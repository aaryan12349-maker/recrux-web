"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M4.5 10L8.2 13.7L15.5 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <circle
        cx="9"
        cy="9"
        r="5.75"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M13.5 13.5L17 17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlassDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={[
          "flex w-full items-center justify-between rounded-[22px] px-4 py-3 text-left text-[#1d1d1f] outline-none transition-all duration-300",
          "border border-white/60 bg-white/55 shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
          "backdrop-blur-xl ring-1 ring-black/5 hover:bg-white/70",
          open ? "scale-[1.01]" : "",
        ].join(" ")}
      >
        <span>{value}</span>
        <span className="text-[#6e6e73]">
          <Chevron open={open} />
        </span>
      </button>

      {open ? (
        <div
          className={[
            "absolute left-0 right-0 top-[calc(100%+10px)] z-40 overflow-hidden rounded-[24px]",
            "border border-white/70 bg-white/58 shadow-[0_24px_70px_rgba(0,0,0,0.14)]",
            "backdrop-blur-2xl ring-1 ring-black/6",
          ].join(" ")}
        >
          <div className="p-2">
            {options.map((option) => {
              const selected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={[
                    "flex w-full items-center justify-between rounded-[18px] px-4 py-3 text-left text-base transition-all duration-200",
                    selected
                      ? "bg-white/72 text-[#111111] shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                      : "text-[#3a3a3c] hover:bg-white/45",
                  ].join(" ")}
                >
                  <span>{option}</span>
                  <span className={selected ? "text-[#111111]" : "text-transparent"}>
                    <CheckIcon />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
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
                <GlassDropdown
                  label="Sport"
                  value={selectedSport}
                  options={sports}
                  onChange={setSelectedSport}
                />

                <GlassDropdown
                  label="Gender"
                  value={selectedGender}
                  options={genders}
                  onChange={setSelectedGender}
                />

                <GlassDropdown
                  label="Country"
                  value={selectedCountry}
                  options={countries}
                  onChange={setSelectedCountry}
                />

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
            <div className="mb-6 rounded-[28px] bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5 sm:rounded-[32px] sm:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div
                  className={[
                    "flex w-full items-center gap-3 rounded-[22px] px-4 py-3.5 text-[#1d1d1f]",
                    "border border-white/60 bg-white/55 shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
                    "backdrop-blur-xl ring-1 ring-black/5 transition-all duration-300 hover:bg-white/70",
                    "xl:max-w-2xl",
                  ].join(" ")}
                >
                  <span className="text-[#6e6e73]">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Search athletes by name"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full bg-transparent text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                  />
                </div>

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
