"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-black p-10 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
            RecruX
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Discover international student-athletes with confidence.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-neutral-300">
            RecruX is a coach-only recruiting platform built to help college
            programs evaluate talent from Kenya and across Africa in one clean,
            private workspace.
          </p>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <h2 className="text-lg font-semibold">Coach-only access</h2>
              <p className="mt-2 text-sm text-neutral-400">
                Athletes do not log in and cannot message coaches through the platform.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <h2 className="text-lg font-semibold">Recruiting-ready profiles</h2>
              <p className="mt-2 text-sm text-neutral-400">
                View academic details, athletic stats, graduation year, and recruiting notes.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <h2 className="text-lg font-semibold">Built to expand</h2>
              <p className="mt-2 text-sm text-neutral-400">
                Starting with Kenya, with room to grow across more African markets.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Coach Login
          </p>

          <h2 className="mt-4 text-4xl font-bold text-neutral-900">
            Welcome back
          </h2>

          <p className="mt-3 text-neutral-600">
            Sign in to access the athlete database and manage your recruiting board.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                type="email"
                placeholder="coach@university.edu"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 rounded-2xl bg-neutral-100 p-4">
            <p className="text-sm font-medium text-neutral-900">Demo mode</p>
            <p className="mt-2 text-sm text-neutral-600">
              Authentication is mock for now. Later we can connect this to Supabase
              Auth or another real login system.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
