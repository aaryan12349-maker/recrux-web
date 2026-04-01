export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 p-10">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          RecruX
        </p>
        <h1 className="mt-4 text-5xl font-bold text-neutral-900">
          Recruiting international student-athletes for college programs
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-600">
          A coach-only platform to discover and evaluate athlete profiles from Kenya
          and across Africa.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/login"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Coach Login
          </a>
          <a
            href="/dashboard"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900"
          >
            View Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
