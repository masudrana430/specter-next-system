export type Service = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  chips: string[];
  unit: string;
  subservices: string[];
};

export const services: Service[] = [
  {
    id: "ai-agent",
    number: "01",
    name: "AI Agent Development",
    shortName: "AI Agents",
    category: "Creative Intelligence",
    description: "Custom autonomous AI agents engineered to automate creative, rendering, content, and business workflows.",
    chips: ["Autonomous Workflows", "Model Integration"],
    unit: "agents",
    subservices: ["Single-Task AI Agent", "Multi-Agent Workflow System"],
  },
  {
    id: "business-sketch",
    number: "02",
    name: "Business Sketch",
    shortName: "Business Sketch",
    category: "Strategic Ideation",
    description: "Rapid visual concepts that translate early commercial ideas, product roadmaps, and pitches into clear direction.",
    chips: ["Concept Visualization", "Pitch Direction"],
    unit: "concepts",
    subservices: ["Concept Sketch Set", "Strategic Ideation Sprint"],
  },
  {
    id: "branding",
    number: "03",
    name: "Branding",
    shortName: "Branding",
    category: "Identity Systems",
    description: "Complete identity systems spanning logos, typography, visual rules, campaign language, and scalable design tokens.",
    chips: ["Identity", "Brand Systems"],
    unit: "brand sets",
    subservices: ["Logo & Core Identity", "Complete Brand System"],
  },
  {
    id: "product-sketch",
    number: "04",
    name: "Product Sketch",
    shortName: "Product Sketch",
    category: "Product Ideation",
    description: "Detailed concept art and product iterations used before prototyping or physical manufacturing begins.",
    chips: ["Concept Art", "Technical Sketches"],
    unit: "sketches",
    subservices: ["Concept Art", "Technical Product Sketch Set"],
  },
  {
    id: "product-design",
    number: "05",
    name: "Product Design",
    shortName: "Product Design",
    category: "3D & Industrial Design",
    description: "Industrial and consumer product design from initial model through production-oriented visualization packages.",
    chips: ["3D Concepts", "Production Ready"],
    unit: "models / packages",
    subservices: ["3D Concept Design", "Production-Ready Design Package"],
  },
  {
    id: "graphic-design",
    number: "06",
    name: "Graphic Design",
    shortName: "Graphic Design",
    category: "Visual Communication",
    description: "Digital, editorial, campaign, packaging, pitch deck, and everyday brand collateral production.",
    chips: ["Campaign Assets", "Print & Digital"],
    unit: "assets",
    subservices: ["Brand Identity Marks & Logo Design", "Marketing Collateral & Ad Banners", "Packaging & Print Collateral"],
  },
  {
    id: "web-dev",
    number: "07",
    name: "Website Design & Development",
    shortName: "Web Design & Dev",
    category: "Digital Product",
    description: "Responsive websites designed and engineered end-to-end, from content architecture and UX through launch.",
    chips: ["UX/UI", "Full-Stack Delivery"],
    unit: "pages / sites",
    subservices: ["Landing Page", "Full Website Build"],
  },
  {
    id: "app-dev",
    number: "08",
    name: "App Building & Development",
    shortName: "App Development",
    category: "Product Engineering",
    description: "Web and mobile applications built for real users, responsive performance, and maintainable product iteration.",
    chips: ["MVP", "Production Apps"],
    unit: "builds",
    subservices: ["MVP App", "Full Production App"],
  },
  {
    id: "image-editing",
    number: "09",
    name: "Image Editing",
    shortName: "Image Editing",
    category: "Post Production",
    description: "Catalog-scale retouching, clipping, cleanup, color matching, and luxury-grade finishing workflows.",
    chips: ["Retouch", "Catalog Production"],
    unit: "images",
    subservices: ["Retouch", "Clipping Path + Retouch + White Balance"],
  },
  {
    id: "video-editing",
    number: "10",
    name: "Video Editing",
    shortName: "Video Editing",
    category: "Motion Production",
    description: "Short-form, long-form, launch, campaign, and commercial post-production with brand-consistent finishing.",
    chips: ["Short Form", "Commercial"],
    unit: "videos",
    subservices: ["Short-Form Edit", "Long-Form / Commercial Edit"],
  },
  {
    id: "product-promo",
    number: "11",
    name: "Product Promo",
    shortName: "Product Promo",
    category: "Product Marketing",
    description: "AI-assisted and conventional promotional clips built to showcase products across launch and performance channels.",
    chips: ["AI Promo", "Campaign Sets"],
    unit: "clips",
    subservices: ["AI Product Promo Clip", "Full Campaign Promo Set"],
  },
  {
    id: "seo",
    number: "12",
    name: "SEO",
    shortName: "SEO",
    category: "Search Growth",
    description: "Technical and content-led organic growth covering site structure, Core Web Vitals, and semantic authority.",
    chips: ["Technical SEO", "Ongoing Growth"],
    unit: "audits / months",
    subservices: ["SEO Audit & Setup", "Ongoing SEO Retainer"],
  },
  {
    id: "marketing-campaigns",
    number: "13",
    name: "Marketing Campaigns",
    shortName: "Marketing Campaigns",
    category: "Growth Campaigns",
    description: "Full-funnel campaigns engineered from strategic concept through multi-channel creative execution and optimization.",
    chips: ["Campaign Strategy", "Performance Creative"],
    unit: "campaigns",
    subservices: ["Single Campaign", "Ongoing Campaign Management"],
  },
];

export const industries = [
  "E-commerce",
  "Fashion & Apparel",
  "Jewelry & Luxury",
  "Real Estate & Architecture",
  "Hospitality & Tourism",
  "Healthcare",
  "Travel & Tour",
  "News & Magazine",
  "Educational",
  "Technology",
];

export const portfolio = [
  { title: "Aethelgard High Jewelry", tag: "Jewelry & Luxury", detail: "Photoreal 3D procedural render & micro-facet lighting" },
  { title: "Maison Vesper Spring/Summer", tag: "Fashion & Editorial", detail: "AI-enhanced virtual lookbook & campaign visuals" },
  { title: "Lumina Botanicals Brand Launch", tag: "E-commerce & Packaging", detail: "Packaging design, 3D product animation & DTC shop" },
  { title: "The Horizon Cliffside Estate", tag: "Real Estate", detail: "Hyper-real architectural CGI & virtual walkthrough" },
  { title: "Palazzo Mirasole Retreat", tag: "Hospitality", detail: "Comprehensive brand system & sensory photography" },
  { title: "Nexus Agent Orchestrator", tag: "AI Technology & App", detail: "Custom multi-agent creative workflow engine" },
];

export const testimonials = [
  { quote: "Our seasonal lookbook production dropped from weeks to days while keeping the finish at premium campaign quality.", name: "Elena Rostova", role: "VP of Brand & Creative" },
  { quote: "The custom creative-agent workflow helped us multiply catalog output without multiplying headcount.", name: "Marcus Vance", role: "Head of Growth" },
  { quote: "The architectural visualization was strong enough to support pre-sales before construction started.", name: "Sophia Chen", role: "Managing Partner" },
  { quote: "The rare value is not AI alone; it is AI generation under disciplined art direction.", name: "Julian Dubois", role: "Creative Director" },
];

export const values = [
  ["Client-First Collaboration", "Direct access to the specialists building the work."],
  ["Velocity With Standards", "Faster production without accepting generic or low-fidelity output."],
  ["Human-Guided AI", "Automation supports experienced judgment rather than replacing it."],
  ["Radical Accountability", "Clear ownership from scope through delivery."],
  ["Systems Thinking", "Reusable pipelines are preferred over one-off heroics."],
  ["Continuous Learning", "Tools, models, production methods, and craft evolve constantly."],
] as const;

export const headerNav = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
];
