type AppNavProps = {
  active?: "dashboard" | "saved" | "profile";
};

export default function AppNav({ active }: AppNavProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          RecruX
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          Coach-only recruiting platform
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="/dashboard"
          className={`rounded-full px-5 py-2 text-sm font-semibold ${
            active === "dashboard"
              ? "bg-black text-white"
              : "border border-neutral-300 bg-white text-neutral-900"
          }`}
        >
          Dashboard
        </a>

        <a
          href="/saved"
          className={`rounded-full px-5 py-2 text-sm font-semibold ${
            active === "saved"
              ? "bg-black text-white"
              : "border border-neutral-300 bg-white text-neutral-900"
          }`}
        >
          Saved
        </a>

        <a
          href="/login"
          className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-semibold text-neutral-900"
        >
          Logout
        </a>
      </div>
    </div>
  );
}
