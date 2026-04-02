import Link from "next/link";
import AppNav from "../../components/AppNav";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description:
        "A simple plan for individual coaches beginning to recruit internationally.",
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
        "Future CRM and request workflows",
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
        "For coaching staffs and athletic departments managing recruiting together.",
      features: [
        "Everything in Pro",
        "Multi-coach access",
        "Shared recruiting board",
        "Admin-ready organization support",
        "Future internal notes and collaboration tools",
      ],
      cta: "Contact for Team",
      href: "/checkout?plan=Team",
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-4 text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl">
        <AppNav active="pricing" />

        <section className="rounded-[42px] bg-[linear-gradient(180deg,#ffffff,#f7f7f8)] px-8 py-12 shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-12 sm:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-medium text-[#6e6e73]">Pricing</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
              Access the platform through a subscription plan.
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[#6e6e73]">
              In demo mode, choosing a plan takes you to checkout, where access
              gets activated and the dashboard unlocks.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[36px] p-8 shadow-[0_12px_36px_rgba(0,0,0,0.05)] ring-1 transition-all duration-500 hover:-translate-y-1.5 ${
                plan.featured
                  ? "bg-black text-white ring-black/10"
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
      </div>
    </main>
  );
}
