import Link from "next/link";
import AppNav from "../components/AppNav";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 pb-16 pt-4 text-[#1d1d1f] sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <AppNav showPricing showAuthAction />

        <section className="rounded-[32px] bg-[linear-gradient(135deg,#ffffff_0%,#f7f7f8_55%,#ececef_100%)] px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:rounded-[42px] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">
                Coach-only recruiting infrastructure
              </p>
              <h1 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-6xl xl:text-7xl">
                Discover international student-athletes with the calm clarity of a premium product.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#6e6e73] sm:text-lg lg:text-xl lg:leading-9">
                RecruX helps college coaches browse, filter, save, and evaluate
                athlete profiles in one focused recruiting workspace built for
                serious decision-making.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className="rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  View Pricing
                </Link>

                <Link
                  href="/login"
                  className="rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#1d1d1f] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Coach Login
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[24px] bg-white p-5 ring-1 ring-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">
                    Athlete Profiles
                  </p>
                  <p className="mt-2 text-3xl font-semibold">12</p>
                </div>

                <div className="rounded-[24px] bg-white p-5 ring-1 ring-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">
                    Core Sports
                  </p>
                  <p className="mt-2 text-3xl font-semibold">5</p>
                </div>

                <div className="rounded-[24px] bg-white p-5 ring-1 ring-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">
                    User Journey
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6e6e73]">
                    Login → browse athletes → filter → open profile → save athlete
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[30px] bg-[#111111] p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                <p className="text-sm font-medium text-white/60">
                  Why coaches use it
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  A recruiting workspace built to reduce friction, not create it.
                </h2>
                <div className="mt-6 space-y-3">
                  <div className="rounded-[22px] bg-white/6 px-4 py-3 ring-1 ring-white/10">
                    Coach-only athlete database
                  </div>
                  <div className="rounded-[22px] bg-white/6 px-4 py-3 ring-1 ring-white/10">
                    Premium profile review flow
                  </div>
                  <div className="rounded-[22px] bg-white/6 px-4 py-3 ring-1 ring-white/10">
                    Saved board and internal notes
                  </div>
                  <div className="rounded-[22px] bg-white/6 px-4 py-3 ring-1 ring-white/10">
                    Request-more-info workflow built in
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] bg-white p-6 ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                <p className="text-sm font-medium text-[#6e6e73]">
                  Trust Layer
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  Private, focused, coach-first.
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
                  RecruX is designed as a private evaluation environment where
                  coaches can review athlete profiles, organize targets, and
                  manage recruiting signals without the clutter of a public-facing
                  marketplace.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[30px] bg-white p-6 ring-1 ring-black/5 shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
            <p className="text-sm font-medium text-[#6e6e73]">Discover</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Search the board with precision.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
              Filter by sport, gender, and country to surface athletes that match
              your recruiting priorities quickly.
            </p>
          </div>

          <div className="rounded-[30px] bg-white p-6 ring-1 ring-black/5 shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
            <p className="text-sm font-medium text-[#6e6e73]">Evaluate</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Review richer athlete profiles.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
              See academic context, athletic stats, highlight links, status,
              coach notes, and recruiting details in one clean view.
            </p>
          </div>

          <div className="rounded-[30px] bg-white p-6 ring-1 ring-black/5 shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
            <p className="text-sm font-medium text-[#6e6e73]">Organize</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Keep your shortlist moving.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6e6e73]">
              Save athletes, track recruiting statuses, and submit information
              requests without leaving the platform.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[32px] bg-[#111111] px-6 py-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:rounded-[42px] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-white/60">
                Ready To Explore?
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Enter a recruiting experience that feels premium from the first click.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
                Start with pricing, activate the subscription flow, and move into
                a coach-facing workspace built for focus.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5"
              >
                Start With Pricing
              </Link>

              <Link
                href="/login"
                className="rounded-full bg-white/10 px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Coach Login
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
