"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppNav from "../../../components/AppNav";

export default function CheckoutSuccessPage() {
  const [plan, setPlan] = useState("Pro");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedPlan = params.get("plan");

    if (selectedPlan === "Starter" || selectedPlan === "Pro" || selectedPlan === "Team") {
      setPlan(selectedPlan);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav showAppLinks showAuthAction />

        <section className="rounded-[42px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-8 py-14 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-12 sm:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium text-[#6e6e73]">
              Subscription Activated
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              You now have access to RecruX {plan}.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-[#6e6e73]">
              Your demo subscription is active. The dashboard, saved board, and
              athlete profiles are now unlocked.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/saved"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#1d1d1f] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                Open Saved Board
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[32px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <p className="text-sm font-medium text-[#6e6e73]">Access</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Athlete database unlocked
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
              Browse, filter, and review the current recruiting board immediately.
            </p>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <p className="text-sm font-medium text-[#6e6e73]">Workflow</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Save and compare prospects
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
              Build a shortlist and return to athlete profiles as your board evolves.
            </p>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            <p className="text-sm font-medium text-[#6e6e73]">Next</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Stripe can replace this later
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
              This flow now behaves like a real paid product, even before live billing is connected.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
