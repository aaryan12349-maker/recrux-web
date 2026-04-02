"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppNav from "../../components/AppNav";
import { loginAdminUser } from "../../lib/storage";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = loginAdminUser(password);

    if (!success) {
      setError("Incorrect admin password.");
      return;
    }

    setError("");
    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav />

        <div className="mx-auto max-w-3xl rounded-[42px] bg-white p-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)] ring-1 ring-black/5 sm:p-10">
          <p className="text-sm font-medium text-[#6e6e73]">Admin Access</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Enter the admin control panel.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6e6e73]">
            This is a simple private gate for now. Only enter here if you are
            managing the athlete data and internal recruiting workflow.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                Admin password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
              />
            </div>

            {error ? (
              <div className="rounded-[22px] bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[#b42318]">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Enter Admin
            </button>
          </form>

          <div className="mt-8 rounded-[28px] bg-[#f7f7f8] p-5">
            <p className="text-sm font-medium text-[#1d1d1f]">Temporary setup</p>
            <p className="mt-2 text-sm leading-7 text-[#6e6e73]">
              The password is currently defined in `lib/storage.ts`. Change it
              there before sharing this app more widely.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
