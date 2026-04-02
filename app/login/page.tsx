"use client";

import { useRouter } from "next/navigation";
import AppNav from "../../components/AppNav";
import {
  hasActiveSubscription,
  loginDemoUser,
} from "../../lib/storage";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginDemoUser();

    if (hasActiveSubscription()) {
      router.push("/dashboard");
    } else {
      router.push("/pricing");
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav showPricing />

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-[42px] bg-[linear-gradient(180deg,#101010,#1c1c1f)] p-10 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
            <p className="text-sm font-medium text-white/60">Coach Login</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Sign in to access the recruiting platform.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              In demo mode, login is simple. If your demo subscription is active,
              you go straight to the dashboard. If not, you’ll be guided to pricing first.
            </p>

            <div className="mt-10 space-y-4">
              <div className="rounded-[28px] bg-white/6 p-5 ring-1 ring-white/10">
                Coach-only athlete database
              </div>
              <div className="rounded-[28px] bg-white/6 p-5 ring-1 ring-white/10">
                Premium profile review flow
              </div>
              <div className="rounded-[28px] bg-white/6 p-5 ring-1 ring-white/10">
                Pricing and subscription path ready
              </div>
            </div>
          </section>

          <section className="rounded-[42px] bg-white p-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)] ring-1 ring-black/5 lg:p-10">
            <p className="text-sm font-medium text-[#6e6e73]">Welcome back</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">
              Enter the coach portal
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#6e6e73]">
              Demo login only for now. Real auth can be added later.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="coach@university.edu"
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 rounded-[28px] bg-[#f7f7f8] p-5">
              <p className="text-sm font-medium text-[#1d1d1f]">Demo behavior</p>
              <p className="mt-2 text-sm leading-7 text-[#6e6e73]">
                Login alone does not unlock the dashboard. The subscription gets activated from the checkout page.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
