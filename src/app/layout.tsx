import type { Metadata } from "next";
import type { ReactNode } from "react";
import { VideoPlaybackGuard } from "@/components/VideoPlaybackGuard";
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/8cb707a9b8a73f8a7403336b861c3074?family=BubbledotICG-FinePos" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        {children}

        <a
          href="https://wa.me/8801878155256"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Specter Visual Lab on WhatsApp"
          title="Chat on WhatsApp"
          className="fixed bottom-4 right-4 z-[200] grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_34px_rgba(0,0,0,0.24)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6 sm:size-16"
        >
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="size-7 sm:size-8"
            fill="currentColor"
          >
            <path d="M19.11 17.18c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.61.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.87-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36s1.01 2.74 1.15 2.93c.14.19 1.99 3.04 4.82 4.26.67.29 1.2.46 1.61.59.68.22 1.29.19 1.78.12.54-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z" />
            <path d="M16.03 3.2c-7.08 0-12.84 5.76-12.84 12.84 0 2.26.59 4.47 1.71 6.41L3.08 29l6.72-1.76a12.8 12.8 0 0 0 6.22 1.59h.01c7.08 0 12.84-5.76 12.84-12.84S23.11 3.2 16.03 3.2Zm0 23.46h-.01c-1.92 0-3.8-.52-5.44-1.5l-.39-.23-3.99 1.05 1.07-3.89-.25-.4a10.66 10.66 0 1 1 9.01 4.97Z" />
          </svg>
          <span className="sr-only">WhatsApp</span>
        </a>

        <VideoPlaybackGuard />
      </body>
    </html>
  );
}
