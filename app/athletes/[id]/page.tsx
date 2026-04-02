"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppNav from "../../../components/AppNav";
import MockAthletePortrait from "../../../components/MockAthletePortrait";
import {
  getStoredAdminAthletes,
  type AdminAthleteRecord,
} from "../../../lib/admin-storage";
import { addInfoRequest } from "../../../lib/requests-storage";
import {
  getSavedAthletes,
  hasActiveSubscription,
  isDemoAuthenticated,
  removeSavedAthlete,
  saveAthlete,
} from "../../../lib/storage";

type AthletePageProps = {
  params: Promise<{
    id: string;
  }>;
};

function makeRequestId() {
  return `request-${Date.now()}`;
}

export default function AthleteProfilePage({ params }: AthletePageProps) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [athleteId, setAthleteId] = useState("");
  const [athletes, setAthletes] = useState<AdminAthleteRecord[]>([]);
  const [saved, setSaved] = useState(false);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestCoachName, setRequestCoachName] = useState("");
  const [requestCoachEmail, setRequestCoachEmail] = useState("");
  const [requestSchool, setRequestSchool] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestNotice, setRequestNotice] = useState("");

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

  function handleRequestSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!athlete) return;

    if (
      !requestCoachName.trim() ||
      !requestCoachEmail.trim() ||
      !requestSchool.trim() ||
      !requestMessage.trim()
    ) {
      setRequestNotice("Fill in all request fields first.");
      return;
    }

    addInfoRequest({
      id: makeRequestId(),
      athleteId: athlete.id,
      athleteName: athlete.fullName,
      coachName: requestCoachName.trim(),
      coachEmail: requestCoachEmail.trim(),
      school: requestSchool.trim(),
      message: requestMessage.trim(),
      createdAt: new Date().toISOString(),
      status: "New",
    });

    setRequestCoachName("");
    setRequestCoachEmail("");
    setRequestSchool("");
    setRequestMessage("");
    setShowRequestForm(false);
    setRequestNotice(`Request sent for ${athlete.fullName}.`);
  }

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

  if (!athlete) {
    return (
      <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
        <div className="mx-auto max-w-7xl">
          <AppNav active="profile" showAppLinks showAuthAction />
          <div className="rounded-[32px] bg-white p-10 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <h1 className="text-3xl font-semibold tracking-[-0.03em]">
              Athlete not found.
            </h1>
            <p className="mt-3 text-lg text-[#6e6e73]">
              This athlete profile does not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav active="profile" showAppLinks showAuthAction />

        <Link
          href="/dashboard"
          className="mb-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#1d1d1f] shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
        >
          Back to Dashboard
        </Link>

        <section className="rounded-[42px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-8 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
          <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
            <div className="rounded-[36px] bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
              <MockAthletePortrait
                name={athlete.fullName}
                sport={athlete.sport}
                country={athlete.country}
                large
              />
            </div>

            <div>
              <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-medium text-[#6e6e73]">
                    RecruX Athlete Profile
                  </p>
                  <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
                    {athlete.fullName}
                  </h1>
                  <p className="mt-5 text-xl leading-8 text-[#6e6e73]">
                    {athlete.sport} • {athlete.country} • {athlete.gender}
                  </p>
                </div>

                <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                    Graduation Year
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {athlete.graduationYear}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                    Age
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{athlete.age}</p>
                </div>

                <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                    GPA
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{athlete.gpa}</p>
                </div>

                <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                    Gender
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{athlete.gender}</p>
                </div>

                <div className="rounded-[28px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                    Market
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{athlete.country}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleSaveToggle}
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  {saved ? "Saved Athlete" : "Save Athlete"}
                </button>

                <button
                  onClick={() => {
                    setShowRequestForm((current) => !current);
                    setRequestNotice("");
                  }}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#1d1d1f] shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Request More Info
                </button>
              </div>

              <p className="mt-4 text-sm text-[#86868b]">
                Coach-facing only. Athlete communication and CRM workflow can be connected later.
              </p>

              {requestNotice ? (
                <div className="mt-6 rounded-[24px] bg-[#f3f8f3] px-5 py-4 text-sm font-medium text-[#1f6f43] ring-1 ring-[#1f6f43]/10">
                  {requestNotice}
                </div>
              ) : null}

              {showRequestForm ? (
                <form
                  onSubmit={handleRequestSubmit}
                  className="mt-6 rounded-[32px] bg-white p-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5"
                >
                  <p className="text-sm font-medium text-[#6e6e73]">Info Request</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                    Request details for {athlete.fullName}
                  </h2>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                        Coach name
                      </label>
                      <input
                        value={requestCoachName}
                        onChange={(event) => setRequestCoachName(event.target.value)}
                        className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                        Coach email
                      </label>
                      <input
                        type="email"
                        value={requestCoachEmail}
                        onChange={(event) => setRequestCoachEmail(event.target.value)}
                        className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                      School / Program
                    </label>
                    <input
                      value={requestSchool}
                      onChange={(event) => setRequestSchool(event.target.value)}
                      className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                      Request message
                    </label>
                    <textarea
                      value={requestMessage}
                      onChange={(event) => setRequestMessage(event.target.value)}
                      rows={4}
                      className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Send Request
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowRequestForm(false)}
                      className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#6e6e73] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[36px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <p className="text-sm font-medium text-[#6e6e73]">Academics</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
              Academic context
            </h2>
            <p className="mt-5 text-[17px] leading-8 text-[#6e6e73]">
              {athlete.academicInfo}
            </p>
          </section>

          <section className="rounded-[36px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <p className="text-sm font-medium text-[#6e6e73]">Performance</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
              Athletic stats
            </h2>
            <p className="mt-5 text-[17px] leading-8 text-[#6e6e73]">
              {athlete.athleticStats}
            </p>
          </section>

          <section className="rounded-[36px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <p className="text-sm font-medium text-[#6e6e73]">Profile</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
              Bio
            </h2>
            <p className="mt-5 text-[17px] leading-8 text-[#6e6e73]">
              {athlete.bio}
            </p>
          </section>

          <section className="rounded-[36px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <p className="text-sm font-medium text-[#6e6e73]">Media + Notes</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
              Recruiting details
            </h2>
            <div className="mt-5 space-y-4 text-[17px] leading-8 text-[#6e6e73]">
              <p>{athlete.notes}</p>
              <a
                href={athlete.video}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Watch Highlight Video
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
