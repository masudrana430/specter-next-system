"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { countries, defaultCountry, type Country } from "@/data/countries";
import { projectTiers } from "@/data/pricing";
import { services } from "@/data/site";

type CustomService = {
  id: string;
  serviceId: string;
  serviceName: string;
  subservice: string;
  quantity: number;
  unit: string;
  targetDate: string;
  targetTime: string;
};

type Props = { initialTier?: string; initialService?: string };

const imageExtensions = ["jpg", "jpeg", "png", "webp"];
const maxImageBytes = 10 * 1024 * 1024;

function isoDatePlus(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function timezoneNote(timezone: string) {
  if (!timezone) return "Studio timezone: Dhaka (GMT+6). Select your timezone for coordination context.";
  if (timezone.includes("Bangladesh") || timezone.includes("Dhaka")) return "Same timezone as the Dhaka studio (GMT+6).";
  if (timezone.includes("India")) return "Dhaka is 30 minutes ahead of India Standard Time.";
  if (timezone.includes("Eastern Time")) return "Dhaka is roughly 10–11 hours ahead of North American Eastern Time, depending on DST.";
  if (timezone.includes("Pacific Time")) return "Dhaka is roughly 13–14 hours ahead of North American Pacific Time, depending on DST.";
  if (timezone.includes("Central European")) return "Dhaka is roughly 4–5 hours ahead of Central Europe, depending on DST.";
  if (timezone.includes("Greenwich") || timezone.includes("British") || timezone.includes("Western European")) return "Dhaka is roughly 5–6 hours ahead of the UK/Western Europe, depending on DST.";
  if (timezone.includes("GMT+8")) return "Dhaka is two hours behind GMT+8 regions.";
  if (timezone.includes("GMT+9")) return "Dhaka is three hours behind GMT+9 regions.";
  return "Studio timezone: Dhaka (GMT+6). Async updates and overlap calls can be coordinated.";
}

export default function ProjectWizard({ initialTier, initialService }: Props) {
  const validInitialTier = initialTier === "enterprise" ? "custom" : projectTiers.some((item) => item.id === initialTier) ? initialTier! : initialService ? "custom" : "growth";
  const validInitialService = services.some((service) => service.id === initialService) ? initialService! : "";

  const [tier, setTier] = useState(validInitialTier);
  const [serviceId, setServiceId] = useState(validInitialService);
  const [subservice, setSubservice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [targetDate, setTargetDate] = useState(isoDatePlus(7));
  const [targetTime, setTargetTime] = useState("18:00");
  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [timezone, setTimezone] = useState(defaultCountry.timezones.length === 1 ? defaultCountry.timezones[0] : "");
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<Record<string, unknown> | null>(null);
  const clientSection = useRef<HTMLElement>(null);
  const customSection = useRef<HTMLElement>(null);

  const selectedService = services.find((service) => service.id === serviceId);
  const selectedTier = projectTiers.find((item) => item.id === tier) ?? projectTiers[2];
  const countryMatches = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((item) => item.name.toLowerCase().includes(q) || item.code.toLowerCase().includes(q) || item.dial.includes(q));
  }, [countrySearch]);

  function selectTier(nextTier: string) {
    setTier(nextTier);
    setFormError("");
    requestAnimationFrame(() => {
      if (nextTier === "custom") customSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      else clientSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function selectCountry(next: Country) {
    setCountry(next);
    setCountrySearch("");
    setTimezone(next.timezones.length === 1 ? next.timezones[0] : "");
  }

  function addCustomService() {
    if (!selectedService || !subservice) {
      setFormError("Choose both a service discipline and a sub-category before adding it.");
      return;
    }
    setCustomServices((current) => [...current, {
      id: `${Date.now()}-${Math.random()}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      subservice,
      quantity: Math.max(1, Math.min(5000, quantity || 1)),
      unit: selectedService.unit,
      targetDate: targetDate || "Flexible",
      targetTime,
    }]);
    setSubservice("");
    setQuantity(1);
    setFormError("");
  }

  function addImages(files: FileList | File[]) {
    const next = [...images];
    let error = "";
    Array.from(files).forEach((file) => {
      if (next.length >= 5) { error = "Maximum 5 reference images allowed."; return; }
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!imageExtensions.includes(ext)) { error = "Only JPG, PNG, and WEBP images are supported."; return; }
      if (file.size > maxImageBytes) { error = `${file.name} is larger than 10MB.`; return; }
      next.push(file);
    });
    setImages(next);
    setImageError(error);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (tier === "custom" && customServices.length === 0) {
      setFormError("Custom scope requires at least one configured service.");
      customSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (!timezone) {
      setFormError("Select your regional timezone before submitting.");
      clientSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      tier,
      tierTitle: `${selectedTier.name} (${selectedTier.price})`,
      customServices: tier === "custom" ? customServices : [],
      client: {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        dialCode: country.dial,
        phone: String(formData.get("phone") || ""),
        country: country.name,
        timezone,
        preferredSlot: String(formData.get("preferredSlot") || "afternoon"),
      },
      message: String(formData.get("message") || ""),
      attachmentCount: images.length,
    };

    const request = new FormData();
    request.set("payload", JSON.stringify(payload));
    images.forEach((file) => request.append("references", file));

    setSubmitting(true);
    try {
      const response = await fetch("/api/project-inquiries", { method: "POST", body: request });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Project request could not be submitted.");
      setSuccess({ ...payload, id: body.id });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Project request could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setTier("growth"); setServiceId(""); setSubservice(""); setQuantity(1); setTargetDate(isoDatePlus(7)); setTargetTime("18:00");
    setCustomServices([]); selectCountry(defaultCountry); setImages([]); setImageError(""); setFormError(""); setSuccess(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (success) {
    const client = success.client as { name: string; email: string; dialCode: string; phone: string; country: string; timezone: string; preferredSlot: string };
    return <section className="success-panel" aria-live="polite"><span className="eyebrow">Project request received</span><h2>Thank you, {client.name}.</h2><p>Request ID: <strong>{String(success.id)}</strong></p><div className="summary-grid"><div><small>Selected tier / scope</small><strong>{String(success.tierTitle)}</strong></div><div><small>Direct contact</small><strong>{client.email}</strong></div><div><small>Phone & region</small><strong>{client.dialCode} {client.phone} · {client.country}</strong></div><div><small>Preferred connect window</small><strong>{client.preferredSlot} · {client.timezone}</strong></div><div><small>Reference attachments</small><strong>{String(success.attachmentCount)} file(s)</strong></div></div>{tier === "custom" && <div className="field-block"><strong>Configured services</strong><ul>{customServices.map((item) => <li key={item.id}>{item.serviceName} — {item.subservice}, {item.quantity} {item.unit}</li>)}</ul></div>}<button type="button" className="button primary" onClick={reset}>Submit another request →</button></section>;
  }

  return (
    <form className="wizard-stack" onSubmit={submit}>
      <section className="section-block">
        <div className="section-heading"><span className="eyebrow">1 · Package</span><h2>Select your project tier</h2><p>Choose a structured package or build a custom multi-service scope.</p></div>
        <div className="tier-grid five" role="radiogroup" aria-label="Project tier">
          {projectTiers.map((item) => <button type="button" role="radio" aria-checked={tier === item.id} className={`tier-card ${tier === item.id ? "selected" : ""}`} key={item.id} onClick={() => selectTier(item.id)}><span className="eyebrow">{item.name}</span><strong className="tier-price">{item.price}</strong><p>{item.description}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>✓ {bullet}</li>)}</ul></button>)}
        </div>
      </section>

      {tier === "custom" && <section ref={customSection} className="section-block" id="custom-services">
        <div className="section-heading"><span className="eyebrow">2 · Custom builder</span><h2>Configure custom services</h2></div>
        <div className="form-card">
          <div className="form-grid four-cols">
            <label>Service Discipline<select value={serviceId} onChange={(event) => { setServiceId(event.target.value); setSubservice(""); }}><option value="">Select from 13 disciplines…</option>{services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}</select></label>
            <label>Sub-Category<select disabled={!selectedService} value={subservice} onChange={(event) => setSubservice(event.target.value)}><option value="">{selectedService ? `Select ${selectedService.name} sub-category…` : "Choose a service first…"}</option>{selectedService?.subservices.map((sub) => <option key={sub} value={sub}>{sub}</option>)}</select></label>
            <label>Quantity ({selectedService?.unit ?? "units"})<input type="number" min="1" max="5000" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label>
            <label>Target Deadline<div className="inline-fields"><input aria-label="Target date" type="date" min={new Date().toISOString().slice(0, 10)} value={targetDate} onChange={(event) => setTargetDate(event.target.value)} /><input aria-label="Target time" type="time" value={targetTime} onChange={(event) => setTargetTime(event.target.value)} /></div></label>
          </div>
          <p className="muted">Urgent timelines may change final pricing.</p>
          <button type="button" className="button" onClick={addCustomService}>+ Add this service to request</button>
          <div className="field-block"><div className="field-label-row"><strong>Configured Custom Services</strong><span>{customServices.length}</span></div>{customServices.length === 0 ? <p className="muted">No custom services added yet.</p> : <div className="stack-list">{customServices.map((item) => <div className="attachment-row" key={item.id}><span><strong>{item.serviceName}</strong> — {item.subservice}<br/><small>{item.quantity} {item.unit} · {item.targetDate} {item.targetTime && `@ ${item.targetTime}`}</small></span><button type="button" onClick={() => setCustomServices((current) => current.filter((entry) => entry.id !== item.id))}>Remove</button></div>)}</div>}</div>
          <button type="button" className="button primary" onClick={() => customServices.length ? clientSection.current?.scrollIntoView({ behavior: "smooth" }) : setFormError("Add at least one custom service first.")}>Proceed to client details ↓</button>
        </div>
      </section>}

      <section ref={clientSection} className="section-block" id="client-details">
        <div className="section-heading"><span className="eyebrow">{tier === "custom" ? "3" : "2"} · Client details</span><h2>Who should the studio connect with?</h2><p>Selected tier: <strong>{selectedTier.name} — {selectedTier.price}</strong></p></div>
        <div className="form-card">
          <div className="form-grid">
            <label>Full Name *<input name="name" required minLength={2} placeholder="Your full name" /></label>
            <label>Email Address *<input name="email" type="email" required placeholder="you@company.com" /></label>
            <label>Contact Number *<div className="phone-row"><span className="dial-prefix">{country.flag} {country.dial}</span><input name="phone" type="tel" required minLength={6} /></div></label>
            <label>Country / Region *<div className="country-picker"><input value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} placeholder={`${country.flag} ${country.name} — ${country.dial}`} /><div className={`country-results ${countrySearch ? "open" : ""}`}>{countrySearch && countryMatches.slice(0, 10).map((item) => <button type="button" key={item.code} onClick={() => selectCountry(item)}>{item.flag} {item.name}<span>{item.dial}</span></button>)}</div></div></label>
            <label>Your Timezone *<select required value={timezone} onChange={(event) => setTimezone(event.target.value)}><option value="" disabled>Select your regional timezone…</option>{country.timezones.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <label>Preferred Time to Connect *<select name="preferredSlot" defaultValue="afternoon"><option value="morning">Morning (09:00–12:00 local time)</option><option value="afternoon">Afternoon (13:00–17:00 local time)</option><option value="evening">Evening (18:00–21:00 local time)</option><option value="async">Asynchronous (email/chat/video updates only)</option></select></label>
          </div>
          <p className="info-note">{timezoneNote(timezone)}</p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading"><span className="eyebrow">{tier === "custom" ? "4" : "3"} · Optional context</span><h2>Project notes & visual references</h2></div>
        <div className="form-card">
          <label className="field-block">Additional Message or Project Context <span className="muted">(Optional)</span><textarea name="message" rows={5} placeholder="Creative goals, deliverables, launch date, style direction…" /></label>
          <div className="field-block"><strong>Visual References <span className="muted">Max 5 · JPG/PNG/WEBP · 10MB each</span></strong><div className="dropzone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); addImages(event.dataTransfer.files); }}><input type="file" multiple accept=".jpg,.jpeg,.png,.webp" onChange={(event) => event.target.files && addImages(event.target.files)} /><p>Drag & drop reference images here or browse files.</p></div><p className="muted">{images.length} / 5 images attached</p>{imageError && <p className="form-error">{imageError}</p>}<div className="stack-list">{images.map((file, index) => <div className="attachment-row" key={`${file.name}-${index}`}><span>{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</span><button type="button" onClick={() => setImages((current) => current.filter((_, i) => i !== index))}>Remove</button></div>)}</div></div>
        </div>
      </section>

      {formError && <p className="form-error center" role="alert">{formError}</p>}
      <section className="submit-panel"><button className="button primary large" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit Project Request →"}</button></section>
    </form>
  );
}
