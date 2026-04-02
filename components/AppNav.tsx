"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type AppNavProps = {
  active?: "dashboard" | "saved" | "profile" | "pricing";
};

function navClass(isActive: boolean) {
  return [
    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
    isActive
      ? "bg-black text-white shadow-sm"
      : "bg-white/70 text-neutral-700 ring-1 ring-black/5 backdrop-blur hover:bg-white hover:text-black",
  ].join(" ");
}

export default function AppNav({ active }: AppNavProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={[
        "sticky top-4 z-50 mb-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-8 pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/72 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
            RX
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
              RecruX
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/dashboard" className={navClass(active === "dashboard")}>
            Dashboard
          </Link>

          <Link href="/saved" className={navClass(active === "saved")}>
            Saved
          </Link>

          <Link href="/pricing" className={navClass(active === "pricing")}>
            Pricing
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:bg-neutral-200"
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}
