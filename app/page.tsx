export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f5f5f4,#fafaf9)] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[36px] bg-white px-8 py-10 shadow-sm sm:px-12 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
            RecruX
          </p>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
                Recruiting international student-athletes for college programs.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
                A coach-only recruiting platform built to help college programs
                discover, filter, and evaluate athlete profiles from Kenya and
                across Africa.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/login"
                  className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
                >
                  Coach Login
                </a>

                <a
                  href="/dashboard"
                  className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900"
                >
                  View Dashboard
                </a>
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

            <div className="rounded-[32px] bg-black p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-400">
                Platform Snapshot
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Athlete Profiles
                  </p>
                  <p className="mt-3 text-3xl font-bold">12</p>
                  <p className="mt-2 text-sm text-neutral-400">
                    Multi-sport profiles across East and West Africa
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Core Sports
                  </p>
                  <p className="mt-3 text-3xl font-bold">5</p>
                  <p className="mt-2 text-sm text-neutral-400">
                    Tennis, Track and Field, Soccer, Basketball, Volleyball
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    User Journey
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">
                    Login → browse athletes → filter → open profile → save athlete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
