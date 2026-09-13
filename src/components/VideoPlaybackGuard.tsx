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
    if (video.src.includes(DARK_VIDEO_TOKEN)) return true;
    return Array.from(video.querySelectorAll("source")).some((source) => source.src.includes(DARK_VIDEO_TOKEN));
  });
}

function playWhenReady(video: HTMLVideoElement): () => void {
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;

  const play = () => {
    void video.play().catch(() => undefined);
  };

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    play();
    return () => {};
  }

  video.addEventListener("loadeddata", play, { once: true });
  video.addEventListener("canplay", play, { once: true });

  return () => {
    video.removeEventListener("loadeddata", play);
    video.removeEventListener("canplay", play);
  };
}

export function VideoPlaybackGuard() {
  useEffect(() => {
    let cleanupPlayback: () => void = () => {};

    const syncVideoWithTheme = () => {
      cleanupPlayback();
      cleanupPlayback = () => {};

      const video = findDarkHeroVideo();
      if (!video) return;

      const darkActive = document.documentElement.dataset.theme === "dark";
      if (!darkActive) {
        video.pause();
        return;
      }

      // The dark hero mounts while hidden in light mode. Restart playback
      // after dark mode makes the hero visible instead of relying on autoplay
      // having started inside display:none.
      if (isGoogleChrome()) {
        if (video.dataset.svlChromeFallback !== "1") {
          video.dataset.svlChromeFallback = "1";
          video.style.filter = "brightness(0.58) saturate(0.68) contrast(1.12)";
          video.src = CHROME_FALLBACK_VIDEO;
          video.load();
        }
      } else {
        // Edge and other capable browsers keep the original dark source.
        video.style.removeProperty("filter");
      }

      // Wait two paints so display:none has been removed before calling play().
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cleanupPlayback = playWhenReady(video);
        });
      });
    };

    syncVideoWithTheme();

    const themeObserver = new MutationObserver(() => syncVideoWithTheme());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cleanupPlayback();
      themeObserver.disconnect();
    };
  }, []);

  return null;
}
