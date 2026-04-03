import Link from "next/link";
import AppNav from "../../components/AppNav";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description:
        "For individual coaches beginning to recruit internationally with more structure.",
      features: [
        "Coach-only athlete database access",
        "Search and filter athletes",
        "View full athlete profiles",
        "Save athlete shortlist",
      ],
      cta: "Start Starter Plan",
      href: "/checkout?plan=Starter",
      featured: false,
    },
    {
      name: "Pro",
      price: "$249",
      period: "/month",
      description:
        "For serious recruiting programs that want a more complete talent workflow.",
      features: [
        "Everything in Starter",
        "Expanded athlete database access",
        "Advanced recruiting filters",
        "Priority onboarding support",
        "Coach notes and recruiting statuses",
      ],
      cta: "Choose Pro",
      href: "/checkout?plan=Pro",
      featured: true,
    },
    {
      name: "Team",
      price: "$499",
      period: "/month",
      description:
        "For coaching staffs and departments managing recruiting collaboratively.",
      features: [
        "Everything in Pro",
        "Multi-coach access planning",
        "Shared recruiting board workflow",
        "Admin-ready organization support",
        "Future internal collaboration tools",
      ],
      cta: "Choose Team",
      href: "/checkout?plan=Team",
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 pb-16 pt-4 text-[#1d1d1f] sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <AppNav active="pricing" />

        <section className="rounded-[32px] bg-[linear-gradient(135deg,#ffffff_0%,#f7f7f8_55%,#ececef_100%)] px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:rounded-[42px] sm:px-8 sm:py-10 lg:px-12 lg:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-medium text-[#6e6e73]">Pricing</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-6xl xl:text-7xl">
              Choose the subscription that fits your recruiting ambition.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#6e6e73] sm:text-lg lg:text-xl lg:leading-9">
              RecruX is structured as a premium coach-facing product. Start with
              the plan that matches your workflow, then move into a private
              athlete evaluation experience built for focus.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] bg-white p-5 ring-1 ring-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">
                Designed For
              </p>
              <p className="mt-2 text-[15px] leading-7 text-[#6e6e73]">
                Coaches, recruiting staff, and programs evaluating international athletes.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-5 ring-1 ring-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">
                Includes
              </p>
              <p className="mt-2 text-[15px] leading-7 text-[#6e6e73]">
                Athlete profiles, saved board, recruiting statuses, notes, and request workflows.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-5 ring-1 ring-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#86868b]">
                Demo Flow
              </p>
              <p className="mt-2 text-[15px] leading-7 text-[#6e6e73]">
                Select a plan, activate checkout, and move directly into the platform.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[32px] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 transition-all duration-500 hover:-translate-y-1.5 sm:rounded-[36px] sm:p-8 ${
                plan.featured
                  ? "bg-[#111111] text-white ring-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                  : "bg-white text-[#1d1d1f] ring-black/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      plan.featured ? "text-white/65" : "text-[#6e6e73]"
                    }`}
                  >
                    {plan.name}
                  </p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-5xl font-semibold tracking-[-0.04em]">
                      {plan.price}
                    </span>
                    <span
                      className={`pb-2 text-sm ${
                        plan.featured ? "text-white/65" : "text-[#6e6e73]"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                </div>

                {plan.featured ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                ) : null}
              </div>

              <p
                className={`mt-6 text-[15px] leading-7 ${
                  plan.featured ? "text-white/75" : "text-[#6e6e73]"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className={`rounded-[20px] px-4 py-3 text-sm ${
                      plan.featured
                        ? "bg-white/6 text-white/85 ring-1 ring-white/10"
                        : "bg-[#f7f7f8] text-[#3a3a3c]"
                    }`}
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={`mt-8 inline-flex rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.featured
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[32px] bg-white px-6 py-8 ring-1 ring-black/5 shadow-[0_12px_36px_rgba(0,0,0,0.05)] sm:rounded-[42px] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-[#6e6e73]">
                Still deciding?
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Start with the plan that matches your current recruiting volume.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#6e6e73] sm:text-lg">
                The experience is intentionally simple: choose a subscription,
                activate access, and step straight into the recruiting platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/checkout?plan=Pro"
                className="rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                Start With Pro
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#1d1d1f] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5"
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
