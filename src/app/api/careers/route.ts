import { NextResponse } from "next/server";

const validCvExtensions = new Set(["pdf", "doc", "docx"]);
const maxCvBytes = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const data = await request.formData();
  const fullName = String(data.get("fullName") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const email = String(data.get("email") || "").trim();
  const address = String(data.get("address") || "").trim();
  const cv = data.get("cv");

  let sectors: string[] = [];
  try { sectors = JSON.parse(String(data.get("sectors") || "[]")); } catch { sectors = []; }

  if (fullName.length < 2 || phone.length < 7 || !email.includes("@") || address.length < 3 || sectors.length === 0) {
    return NextResponse.json({ error: "Missing or invalid required application fields." }, { status: 400 });
  }
  if (!(cv instanceof File)) return NextResponse.json({ error: "A CV/resume is required." }, { status: 400 });
  const ext = cv.name.split(".").pop()?.toLowerCase() ?? "";
  if (!validCvExtensions.has(ext) || cv.size > maxCvBytes) {
    return NextResponse.json({ error: "CV must be PDF, DOC, or DOCX and no larger than 10MB." }, { status: 400 });
  }

  // Integration point: upload CV to object storage and persist/send the application.
  const id = `SVL-CAR-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, id });
}
