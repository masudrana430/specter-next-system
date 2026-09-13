"use client";

import { useEffect } from "react";

const DARK_VIDEO_TOKEN = "hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";
const FALLBACK_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4";

function findDarkVideo() {
  return Array.from(document.querySelectorAll("video")).find((video) => {
    if (video.currentSrc.includes(DARK_VIDEO_TOKEN)) return true;
    return Array.from(video.querySelectorAll("source")).some((source) => source.src.includes(DARK_VIDEO_TOKEN));
  });
}

function enableFallback(video: HTMLVideoElement) {
  if (video.dataset.svlVideoFallback === "1") return;
  video.dataset.svlVideoFallback = "1";
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "auto";
  video.style.filter = "brightness(0.62) saturate(0.72) contrast(1.1)";

  video.replaceChildren();
  const source = document.createElement("source");
  source.src = FALLBACK_VIDEO;
  source.type = "video/mp4";
  video.appendChild(source);
  video.load();
  void video.play().catch(() => undefined);
}

function guardDarkVideo() {
  if (document.documentElement.dataset.theme !== "dark") return () => undefined;

  const video = findDarkVideo();
  if (!video || video.dataset.svlVideoGuarded === "1") return () => undefined;

  video.dataset.svlVideoGuarded = "1";
  let playable = video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !video.error;

  const markPlayable = () => {
    playable = true;
  };

  const failOver = () => {
    if (!playable) enableFallback(video);
  };

  video.addEventListener("loadeddata", markPlayable, { once: true });
  video.addEventListener("canplay", markPlayable, { once: true });
  video.addEventListener("error", failOver, { once: true });

  const source = video.querySelector("source");
  source?.addEventListener("error", failOver, { once: true });

  void video.play().catch(failOver);
  const timeout = window.setTimeout(failOver, 3500);

  return () => {
    window.clearTimeout(timeout);
    video.removeEventListener("loadeddata", markPlayable);
    video.removeEventListener("canplay", markPlayable);
    video.removeEventListener("error", failOver);
    source?.removeEventListener("error", failOver);
  };
}

export function VideoPlaybackGuard() {
  useEffect(() => {
    let cleanup = guardDarkVideo();

    const observer = new MutationObserver((records) => {
      const themeChanged = records.some((record) => record.type === "attributes" && record.attributeName === "data-theme");
      const treeChanged = records.some((record) => record.type === "childList");
      if (!themeChanged && !treeChanged) return;

      cleanup();
      cleanup = guardDarkVideo();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, []);

  return null;
}
