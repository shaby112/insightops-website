import type { ElementType } from "react";
import { ArrowRight, ArrowUpRight, Building2, Check, DollarSign, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
  popular?: boolean;
  icon: ElementType;
  iconColor: string;
  gradientColor: string;
  accentColor: string;
  featuresTitle: string;
  features: PlanFeature[];
}

const plans: Plan[] = [
  {
    id: "standard",
    name: "Starter",
    description: "Pay-as-you-go for early-stage teams",
    price: "$299/mo",
    priceNote: "Ideal for first production teams",
    buttonText: "Get started",
    buttonVariant: "primary",
    icon: FileText,
    iconColor: "text-blue-500",
    gradientColor: "from-blue-50/80 via-blue-50/30 to-transparent",
    accentColor: "text-blue-600",
    featuresTitle: "CORE FUNCTIONALITY",
    features: [
      { text: "Connect up to 3 data sources", included: true },
      { text: "Automated semantic model generation", included: true },
      { text: "AI-assisted SQL exploration", included: true },
      { text: "Dashboard generation with templates", included: true },
      { text: "Modeling studio and relationship suggestions", included: true },
      { text: "Self-hosted deployment in Docker", included: true },
      { text: "Community support channel", included: true },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Built for scaling teams",
    price: "$999/mo",
    buttonText: "Get started",
    buttonVariant: "primary",
    popular: true,
    icon: ArrowUpRight,
    iconColor: "text-lime-600",
    gradientColor: "from-lime-50/80 via-lime-50/30 to-transparent",
    accentColor: "text-lime-700",
    featuresTitle: "EVERYTHING IN STARTER, PLUS:",
    features: [
      { text: "Unlimited data sources", included: true },
      { text: "Higher sync throughput and concurrency", included: true },
      { text: "Advanced relationship validation controls", included: true },
      { text: "Team collaboration and dashboard sharing", included: true },
      { text: "Priority issue support", included: true },
      { text: "Expanded query history and insights", included: true },
      { text: "Custom deployment assistance", included: true },
      { text: "Expanded usage limits", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Built for full control and custom needs",
    price: "Custom pricing",
    buttonText: "Contact sales",
    buttonVariant: "secondary",
    icon: Building2,
    iconColor: "text-fuchsia-600",
    gradientColor: "from-fuchsia-50/80 via-fuchsia-50/30 to-transparent",
    accentColor: "text-fuchsia-700",
    featuresTitle: "EVERYTHING IN GROWTH, PLUS:",
    features: [
      { text: "Private network and on-prem deployment options", included: true },
      { text: "Custom MSA and SLA terms", included: true },
      { text: "Dedicated onboarding and architecture review", included: true },
      { text: "Custom throughput and workload tuning", included: true },
      { text: "Managed rollout strategy", included: true },
      { text: "Dedicated on-call escalation path", included: true },
      { text: "Advanced access controls and SSO", included: true },
      { text: "Roadmap alignment and feature workshops", included: true },
    ],
  },
];

export function PricingSection() {
  return (
    <section className="w-full bg-[#FAF9F6] py-16 px-4 md:px-8 font-sans selection:bg-purple-100 selection:text-purple-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-[#65a30d]">
            <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#65a30d] text-[10px]">
              <DollarSign size={10} />
            </span>
            Flexible plans
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] leading-[1.1] max-w-4xl mx-auto tracking-tight">
            Choose the plan <br />
            that <span className="text-[#6366f1] italic px-1 font-serif">best fits</span> your <br />
            needs
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300"
            >
              <div className={cn("absolute top-0 left-0 right-0 h-32 bg-gradient-to-b opacity-60", plan.gradientColor)} />

              {plan.popular && (
                <div className="absolute top-6 right-6 bg-[#d9f99d] text-[#3f6212] text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="relative p-8 flex flex-col h-full">
                <div className={cn("mb-6", plan.iconColor)}>
                  <plan.icon size={28} strokeWidth={1.5} />
                </div>

                <div className="mb-8">
                  <h3 className="font-serif text-3xl text-[#1a1a1a] mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                <div className="mb-8 flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-medium text-[#1a1a1a]">{plan.price}</span>
                  {plan.priceNote && (
                    <span className="text-gray-500 text-sm ml-auto">{plan.priceNote}</span>
                  )}
                </div>

                <button
                  className={cn(
                    "w-full py-3 px-6 rounded text-sm font-medium transition-colors mb-10 flex items-center justify-center gap-2 group",
                    plan.buttonVariant === "primary"
                      ? "bg-[#4a4a4a] hover:bg-[#333333] text-white"
                      : "bg-[#f5f5f5] hover:bg-[#e5e5e5] text-[#1a1a1a] border border-gray-200"
                  )}
                >
                  {plan.buttonText}
                  {plan.buttonVariant === "secondary" && (
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  )}
                </button>

                <div className="mt-auto">
                  <p className={cn("text-xs font-semibold tracking-wider uppercase mb-6", plan.accentColor)}>
                    {plan.featuresTitle}
                  </p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <Check size={16} className="shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
