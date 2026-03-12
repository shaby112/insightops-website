import type { ElementType } from "react";
import { ArrowRight, Building2, Check, FileText, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  buttonText: string;
  buttonHref: string;
  popular?: boolean;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  badgeText?: string;
  featuresTitle: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For early-stage teams getting started with self-hosted BI.",
    price: "$0",
    buttonText: "Get Started",
    buttonHref: "/sign-up",
    icon: FileText,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    accentColor: "text-blue-400",
    borderColor: "border-white/[0.08]",
    glowColor: "group-hover:shadow-blue-900/20",
    featuresTitle: "Core functionality",
    features: [
      "Connect up to 2 data sources",
      "Automated semantic model generation",
      "Self-hosted Docker deployment",
      "Community support channel",
      "No AI features included",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For scaling teams that need AI power and unlimited collaboration.",
    price: "$200",
    priceNote: "per month",
    buttonText: "Get Started",
    buttonHref: "/sign-up",
    popular: true,
    badgeText: "Most Popular",
    icon: Zap,
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    glowColor: "group-hover:shadow-violet-900/30",
    featuresTitle: "Everything in Starter, plus:",
    features: [
      "Unlimited users",
      "Unlimited data sources",
      "AI Text-to-SQL unlocked",
      "Dashboard generation with templates",
      "Modeling studio with AI suggestions",
      "Email support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    description: "For larger organizations that need advanced security.",
    price: "$400",
    priceNote: "per month",
    buttonText: "Get Started",
    buttonHref: "/sign-up",
    icon: Building2,
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    accentColor: "text-indigo-400",
    borderColor: "border-white/[0.08]",
    glowColor: "group-hover:shadow-indigo-900/20",
    featuresTitle: "Everything in Pro, plus:",
    features: [
      "Open-source SSO/SAML",
      "Role-Based Access Control (RBAC)",
      "Comprehensive Audit logs",
      "Priority issue support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations that need full control and custom terms.",
    price: "Custom",
    priceNote: "contact us",
    buttonText: "Contact sales",
    buttonHref: "mailto:hello@kuantra.io",
    icon: Building2,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    accentColor: "text-cyan-400",
    borderColor: "border-white/[0.08]",
    glowColor: "group-hover:shadow-cyan-900/20",
    featuresTitle: "Everything in Scale, plus:",
    features: [
      "Dedicated onboarding and architecture review",
      "Dedicated support escalation",
      "White-labeling capabilities",
      "Custom MSA and SLA terms",
    ],
  },
];

export function PricingSection() {
  return (
    <section className="w-full py-20 px-6">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400 mb-4">Pricing</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-base text-white/50 leading-relaxed">
          Choose the plan that fits your team. Upgrade anytime as you scale.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] transition-all duration-300",
              "hover:bg-white/[0.05] hover:shadow-2xl",
              plan.glowColor,
              plan.borderColor,
              plan.popular && "ring-1 ring-violet-500/40"
            )}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute top-5 right-5">
                <span className="rounded-full bg-violet-500/20 border border-violet-500/30 px-3 py-1 text-xs font-medium text-violet-300">
                  {plan.badgeText}
                </span>
              </div>
            )}

            {/* Subtle gradient glow top */}
            {plan.popular && (
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
            )}

            <div className="flex flex-col h-full p-8">
              {/* Icon */}
              <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl mb-5", plan.iconBg, plan.iconColor)}>
                <plan.icon className="h-5 w-5" />
              </span>

              {/* Name + description */}
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-7">{plan.description}</p>

              {/* Price */}
              <div className="mb-7 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.priceNote && (
                  <span className="text-sm text-white/40">{plan.priceNote}</span>
                )}
              </div>

              {/* CTA */}
              <a
                href={plan.buttonHref}
                className="relative mb-8 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:bg-white/10 hover:border-white/20 before:absolute before:-inset-1 before:-z-10 before:bg-gradient-to-r before:from-indigo-500/30 before:via-purple-500/30 before:to-cyan-500/30 before:opacity-50 before:blur-md"
              >
                {plan.buttonText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Divider */}
              <div className="mb-6 h-px bg-white/[0.07]" />

              {/* Features */}
              <div className="mt-auto">
                <p className={cn("text-xs font-semibold uppercase tracking-wider mb-5", plan.accentColor)}>
                  {plan.featuresTitle}
                </p>
                <ul className="space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/60">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="mx-auto mt-12 max-w-lg text-center text-sm text-white/30">
        All plans include self-hosted Docker deployment. Payments securely processed via Paddle. Cancel anytime.
      </p>
    </section>
  );
}

export default PricingSection;
