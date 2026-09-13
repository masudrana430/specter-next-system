"use client";

import { useEffect } from "react";

const DARK_VIDEO_TOKEN = "hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";
const CHROME_FALLBACK_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4";

function isGoogleChrome() {
  const ua = navigator.userAgent;
  return /Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua);
}

function findDarkHeroVideo() {
  return Array.from(document.querySelectorAll("video")).find((video) => {
    if (video.currentSrc.includes(DARK_VIDEO_TOKEN)) return true;
    return Array.from(video.querySelectorAll("source")).some((source) => source.src.includes(DARK_VIDEO_TOKEN));
  });
}

export function VideoPlaybackGuard() {
  useEffect(() => {
    // Edge can play the original dark hero video, so do not touch it there.
    // Chrome on the affected machines cannot decode that source reliably.
    if (!isGoogleChrome()) return;

    const video = findDarkHeroVideo();
    if (!video || video.dataset.svlChromeFallback === "1") return;

    video.dataset.svlChromeFallback = "1";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";

    // Keep the dark-mode feel even though Chrome receives the compatible source.
    video.style.filter = "brightness(0.58) saturate(0.68) contrast(1.12)";

    // Setting video.src directly avoids source-selection ambiguity in Chrome.
    video.src = CHROME_FALLBACK_VIDEO;
    video.load();

    const tryPlay = () => {
      void video.play().catch(() => undefined);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) tryPlay();
    else video.addEventListener("loadeddata", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return null;
}
