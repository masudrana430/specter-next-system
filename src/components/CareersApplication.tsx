"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { services } from "@/data/site";

type ApplicationResult = { id: string; name: string; email: string; sectors: string[] };

const validCvExtensions = ["pdf", "doc", "docx"];
const maxCvBytes = 10 * 1024 * 1024;

export default function CareersApplication() {
  const [selected, setSelected] = useState<string[]>([]);
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ApplicationResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedServices = useMemo(
    () => services.filter((service) => selected.includes(service.id)),
    [selected],
  );

  function toggleSector(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setFormError("");
  }

  function validateCv(file: File | null) {
    if (!file) {
      setCv(null);
      setCvError("Please attach your CV or resume.");
      return false;
    }
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!validCvExtensions.includes(ext)) {
      setCv(null);
      setCvError("CV must be PDF, DOC, or DOCX.");
      return false;
    }
    if (file.size > maxCvBytes) {
      setCv(null);
      setCvError("CV must be 10MB or smaller.");
      return false;
    }
    setCv(file);
    setCvError("");
    return true;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (selected.length === 0) {
      setFormError("Select at least one sector before submitting.");
      return;
    }
    if (!cv) {
      setCvError("Please attach your CV or resume.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("sectors", JSON.stringify(selected));
    data.set("cv", cv);

    setSubmitting(true);
    try {
      const response = await fetch("/api/careers", { method: "POST", body: data });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Application could not be submitted.");
      setResult({
        id: body.id,
        name: String(data.get("fullName") || "Creator"),
        email: String(data.get("email") || ""),
        sectors: selectedServices.map((service) => service.name),
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Application could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSelected([]);
    setCv(null);
    setCvError("");
    setFormError("");
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  if (result) {
    return (
      <section className="success-panel" aria-live="polite">
        <span className="eyebrow">Application received</span>
        <h2>Thanks, {result.name}.</h2>
        <p>Your application ID is <strong>{result.id}</strong>. The selected sectors are listed below.</p>
        <div className="tag-row">{result.sectors.map((sector) => <span className="tag" key={sector}>{sector}</span>)}</div>
        <p>Contact email: <strong>{result.email}</strong></p>
        <button className="button primary" type="button" onClick={reset}>Submit another application</button>
      </section>
    );
  }

  return (
    <>
      <section className="section-block" id="sectors">
        <div className="section-heading">
          <span className="eyebrow">13 creative disciplines</span>
          <h2>Which sectors interest you?</h2>
          <p>Select one or several. The selection automatically carries into the application form.</p>
        </div>
        <div className="toggle-grid" role="group" aria-label="Career sectors">
          {services.map((service) => {
            const active = selected.includes(service.id);
            return (
              <button className={`toggle-chip ${active ? "active" : ""}`} aria-pressed={active} type="button" key={service.id} onClick={() => toggleSector(service.id)}>
                <span>{active ? "✓" : "+"}</span> {service.name}
              </button>
            );
          })}
        </div>
        <div className="selection-summary" aria-live="polite">
          {selectedServices.length === 0 ? "Select one or more sectors." : `${selectedServices.length} selected: ${selectedServices.map((service) => service.name).join(", ")}`}
        </div>
      </section>

      <section className="section-block" id="applyForm">
        <div className="section-heading"><span className="eyebrow">Application</span><h2>Apply to the collective</h2></div>
        <form className="form-card" onSubmit={submit}>
          <div className="form-grid">
            <label>Full Name *<input name="fullName" required minLength={2} placeholder="Your full name" /></label>
            <label>Mobile Number *<input name="phone" type="tel" required minLength={7} placeholder="+880..." /></label>
            <label>Email Address *<input name="email" type="email" required placeholder="you@example.com" /></label>
            <label>Address / Location *<input name="address" required minLength={3} placeholder="City, country" /></label>
          </div>

          <div className="field-block">
            <div className="field-label-row"><strong>Sectors Applying For *</strong><a href="#sectors">Edit sectors ↑</a></div>
            <div className="tag-row">
              {selectedServices.length ? selectedServices.map((service) => (
                <button type="button" className="tag removable" key={service.id} onClick={() => toggleSector(service.id)}>{service.name} ×</button>
              )) : <span className="muted">No sectors selected yet.</span>}
            </div>
          </div>

          <div className="field-block">
            <strong>CV / Resume * <span className="muted">PDF, DOC, DOCX up to 10MB</span></strong>
            <div
              className="dropzone"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => { event.preventDefault(); validateCv(event.dataTransfer.files?.[0] ?? null); }}
            >
              <input ref={fileRef} name="cvPicker" type="file" accept=".pdf,.doc,.docx" onChange={(event) => validateCv(event.target.files?.[0] ?? null)} />
              <p>Drop your CV here or choose a file.</p>
            </div>
            {cv && <div className="attachment-row"><span>{cv.name} · {(cv.size / 1024 / 1024).toFixed(2)} MB</span><button type="button" onClick={() => { setCv(null); if (fileRef.current) fileRef.current.value = ""; }}>Remove</button></div>}
            {cvError && <p className="form-error">{cvError}</p>}
          </div>

          <label className="field-block">Portfolio / Online Work Link <span className="muted">(Optional)</span><input name="portfolioUrl" type="url" placeholder="https://..." /></label>
          <label className="field-block">Short Message <span className="muted">(Optional)</span><textarea name="message" rows={4} placeholder="Tell us about your experience, tools, or work you are proud of." /></label>

          {formError && <p className="form-error" role="alert">{formError}</p>}
          <button className="button primary" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit Application →"}</button>
        </form>
      </section>
    </>
  );
}
