import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PricingExplorer } from "@/components/PricingExplorer";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return <><SiteHeader /><main><PricingExplorer /></main><Footer /></>;
}
