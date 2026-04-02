import Link from "next/link";
import AppNav from "../../components/AppNav";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav />

        <div className="grid gap-8 xl:grid-cols-[1fr_420px]">
          <section className="rounded-[42px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-8 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-12 sm:py-14">
            <p className="text-sm font-medium text-[#6e6e73]">Checkout</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Start with RecruX Pro.
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[#6e6e73]">
              This is a premium mock checkout flow for now. Later, we can connect
              Stripe to make subscriptions and billing fully functional.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[32px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                  Billing details
                </h2>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Coach name"
                      className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                      Work email
                    </label>
                    <input
                      type="email"
                      placeholder="coach@university.edu"
                      className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                      School / Program
                    </label>
                    <input
                      type="text"
                      placeholder="University athletics program"
                      className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                      Card number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#3a3a3c]">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full rounded-[22px] border border-black/8 bg-[#fafafc] px-4 py-3 text-[#1d1d1f] outline-none placeholder:text-[#8d8d92]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] bg-black p-8 text-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                <p className="text-sm font-medium text-white/60">Order Summary</p>

                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                  RecruX Pro
                </h2>

                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  A premium coach-facing recruiting workspace for discovering and
                  managing international student-athlete profiles.
                </p>

                <div className="mt-8 space-y-3">
                  <div className="rounded-[24px] bg-white/6 p-4 ring-1 ring-white/10">
                    Full athlete database access
                  </div>
                  <div className="rounded-[24px] bg-white/6 p-4 ring-1 ring-white/10">
                    Search and recruiting filters
                  </div>
                  <div className="rounded-[24px] bg-white/6 p-4 ring-1 ring-white/10">
                    Saved athlete shortlist
                  </div>
                  <div className="rounded-[24px] bg-white/6 p-4 ring-1 ring-white/10">
                    Priority support and future workflow upgrades
                  </div>
                </div>

                <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="text-sm text-white/50">Due today</p>
                    <p className="mt-2 text-4xl font-semibold">$249</p>
                  </div>
                  <p className="text-sm text-white/50">per month</p>
                </div>

                <button className="mt-8 w-full rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5">
                  Complete Subscription
                </button>

                <p className="mt-4 text-xs leading-6 text-white/45">
                  Demo-only checkout UI. Stripe billing and subscription access
                  can be connected later.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
