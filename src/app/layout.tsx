import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./tailwind.css";
import "./globals.css";
import "./theme.css";

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
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/8cb707a9b8a73f8a7403336b861c3074?family=BubbledotICG-FinePos" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
