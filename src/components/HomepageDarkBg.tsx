export function HomepageDarkBg() {
  return (
    <div className="homepage-dark-bg" aria-hidden="true">
      <video className="homepage-dark-video" autoPlay muted loop playsInline preload="metadata" tabIndex={-1}>
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
          type="video/mp4"
        />
      </video>
      <div className="homepage-dark-fallback" />
      <div className="homepage-dark-vignette" />
      <div className="homepage-dark-grain" />
    </div>
  );
}
