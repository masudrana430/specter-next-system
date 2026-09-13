import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./theme.css";
import "./home-hero.css";

const themeBootScript = `
(function () {
  try {
    var saved = localStorage.getItem('svl-theme');
    var theme = saved === 'dark' || saved === 'light'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = 'light';
  }
})();`;

export const metadata: Metadata = {
  title: {
    default: "Specter Visual Lab — Creative AI & Visual Production",
    template: "%s | Specter Visual Lab",
  },
  description: "AI-powered visual production, creative technology, digital products, post-production, and campaign systems.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
