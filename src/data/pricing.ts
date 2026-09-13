import { services } from "./site";

export type Tier = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  featured?: boolean;
  features: string[];
  extras: string[];
};

export const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$990",
    period: "/ project",
    description: "Ideal for rapid single-asset deliverables and emerging projects.",
    features: ["1 core deliverable", "2 iterative revision rounds", "Full commercial rights & source files", "3–5 business day turnaround", "Direct asynchronous communication"],
    extras: ["Project kickoff brief", "Delivery handoff checklist", "One production owner"],
  },
  {
    id: "basic",
    name: "Basic",
    price: "$1,990",
    period: "/ project",
    description: "Multi-asset production suites for growing brands and launches.",
    features: ["3 coordinated deliverables", "3 iterative revision rounds", "High-resolution production pipeline", "5–7 business day turnaround", "Dedicated art direction"],
    extras: ["Reusable asset system", "Launch-format exports", "Priority feedback queue"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$3,890",
    period: "/ month",
    description: "Continuous visual firepower for scaling brands and fast-moving teams.",
    featured: true,
    features: ["1 active request at a time", "48h rapid turnaround target", "Senior creative oversight", "Unlimited request queue", "Pause or cancel anytime"],
    extras: ["Recurring planning sync", "Brand asset memory", "Priority production queue"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$6,990",
    period: "/ month",
    description: "High-velocity throughput for established brands and agencies.",
    features: ["2 simultaneous active requests", "24–48h priority speed", "Senior art direction", "Cross-discipline production", "Priority capacity"],
    extras: ["Campaign planning", "Shared production board", "Escalation channel"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "scope",
    description: "Bespoke studios and multi-agent pipelines for global operations.",
    features: ["Dedicated production capacity", "Custom workflow engineering", "Multi-team orchestration", "Enterprise governance", "Custom delivery SLA"],
    extras: ["Dedicated VPC/model options", "Enterprise rights & NDA workflows", "Custom billing, invoicing & MSAs"],
  },
];

const basePrices: Record<string, [string, string, string]> = {
  "ai-agent": ["$800", "$1,800", "$3,500"],
  "business-sketch": ["$150", "$400", "$750"],
  branding: ["$450", "$1,200", "$2,800"],
  "product-sketch": ["$180", "$480", "$900"],
  "product-design": ["$600", "$1,800", "$4,200"],
  "graphic-design": ["$120", "$450", "$1,200"],
  "web-dev": ["$900", "$2,500", "$6,500"],
  "app-dev": ["$2,500", "$7,500", "$15,000"],
  "image-editing": ["$75", "$280", "$900"],
  "video-editing": ["$250", "$850", "$2,200"],
  "product-promo": ["$300", "$950", "$2,500"],
  seo: ["$350", "$900", "$1,800"],
  "marketing-campaigns": ["$700", "$2,400", "$5,500"],
};

export const detailedPricing = services.map((service) => ({
  serviceId: service.id,
  serviceName: service.name,
  category: service.category,
  offerings: service.subservices.slice(0, 2).map((sub, index) => {
    const [p1, p2, p3] = basePrices[service.id] ?? ["$250", "$750", "$1,500"];
    return {
      title: sub,
      badge: index === 0 ? "Core Offer" : "Expanded Scope",
      description: `A structured ${sub.toLowerCase()} package with production-ready delivery and clear review checkpoints.`,
      tiers: [
        { label: index === 0 ? "Basic scope" : "Small batch", price: p1, note: `Entry ${service.unit}` },
        { label: index === 0 ? "Standard scope" : "Standard batch", price: p2, note: "Popular production scope", popular: true },
        { label: index === 0 ? "Advanced scope" : "Large batch", price: p3, note: "Best value at scale" },
        { label: "Enterprise", price: "Custom Quote", note: "Tailored workflow & capacity", custom: true },
      ],
    };
  }),
}));

export const projectTiers = [
  { id: "starter", name: "Starter", price: "$990 / project", description: "Single-deliverable sprint.", bullets: ["1 core deliverable", "2 iteration rounds", "3–5 day turnaround", "Commercial rights"] },
  { id: "basic", name: "Basic", price: "$1,990 / project", description: "Multi-asset suite for launches.", bullets: ["3 deliverables", "3 iteration rounds", "5–7 day turnaround", "Dedicated art direction"] },
  { id: "growth", name: "Growth", price: "$3,890 / month", description: "Dedicated monthly studio firepower.", bullets: ["1 active request queue", "48h target", "Senior oversight", "Pause/cancel anytime"] },
  { id: "premium", name: "Premium", price: "$6,990 / month", description: "High-velocity agency throughput.", bullets: ["2 simultaneous requests", "24–48h priority", "Cross-discipline support", "Priority capacity"] },
  { id: "custom", name: "Custom", price: "Tailored Scope", description: "Mix exact disciplines and volumes.", bullets: ["Any of 13 disciplines", "Custom volumes", "Custom timeline", "Custom commercial terms"] },
] as const;
