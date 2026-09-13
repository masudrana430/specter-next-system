import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ServicesExplorer } from "@/components/ServicesExplorer";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return <><SiteHeader /><main><ServicesExplorer /></main><Footer /></>;
}
