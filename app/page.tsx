import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <div className="mb-10 flex items-center justify-between rounded-full bg-white/70 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              RX
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-400">
              RecruX
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/pricing"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Coach Login
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[40px] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
            <p className="text-sm font-semibold text-[#6e6e73]">
              Coach-only recruiting infrastructure
            </p>

            <h1 className="mt-4 max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              Discover international student-athletes with the calm clarity of a premium product.
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-9 text-[#6e6e73]">
              RecruX helps college coaches browse, filter, and save athlete profiles from Kenya and across Africa in a focused, private recruiting workflow.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Start With Pricing
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full bg-[#f5f5f7] px-7 py-3.5 text-sm font-medium text-[#1d1d1f] transition-all duration-300 hover:-translate-y-0.5"
              >
                Preview Athlete Board
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Access
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  Built only for coaches, not for athlete messaging or public browsing.
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Focus
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  Searchable profiles with academics, athletic performance, and recruiting notes.
                </p>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Growth
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-700">
                  Launching with Kenya first, with room to expand across Africa.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[36px] bg-[linear-gradient(180deg,#101010,#1c1c1f)] p-8 text-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <p className="text-sm font-medium text-white/60">Platform Snapshot</p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-[28px] bg-white/6 p-5 ring-1 ring-white/10">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Athlete Profiles
                  </p>
                  <p className="mt-2 text-4xl font-semibold">12</p>
                </div>
                <div className="rounded-[28px] bg-white/6 p-5 ring-1 ring-white/10">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Core Sports
                  </p>
                  <p className="mt-2 text-4xl font-semibold">5</p>
                </div>
                <div className="rounded-[28px] bg-white/6 p-5 ring-1 ring-white/10">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    User Journey
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">
                    Login → browse athletes → filter → open profile → save athlete
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[36px] bg-[linear-gradient(135deg,#ebe7df,#f8f7f3)] p-8 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
              <p className="text-sm font-medium text-[#6e6e73]">Monetization Ready</p>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#3a3a3c]">
                <p>Subscription plans can be layered in cleanly.</p>
                <p>Coach accounts can later unlock access based on billing status.</p>
                <p>Stripe checkout and recurring billing can be connected when you’re ready.</p>
              </div>
              <Link
                href="/pricing"
                className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">Experience</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-[-0.03em]">
                A more refined recruiting flow.
              </h2>
            </div>
            <Link href="/dashboard" className="text-sm font-medium text-[#0066cc]">
              View the dashboard
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[36px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                Search + filter
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Find the right athlete quickly.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
                Filter by sport, gender, and country while keeping the interface clean and easy to scan.
              </p>
            </div>

            <div className="rounded-[36px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                Full profile context
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Academics and athletic performance together.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
                Coaches can evaluate GPA, graduation year, sport-specific notes, and bio in a single view.
              </p>
            </div>

            <div className="rounded-[36px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                Saved board
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Shortlist without the clutter.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
                Save standout athletes and return to them later as your recruiting board evolves.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
