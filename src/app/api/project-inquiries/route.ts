import { NextResponse } from "next/server";

const imageExtensions = new Set(["jpg", "jpeg", "png", "webp"]);
const maxImageBytes = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const data = await request.formData();
  let payload: any;
  try { payload = JSON.parse(String(data.get("payload") || "{}")); }
  catch { return NextResponse.json({ error: "Invalid project payload." }, { status: 400 }); }

  if (!payload?.tier || !payload?.client?.name || !payload?.client?.email || !payload?.client?.phone || !payload?.client?.country || !payload?.client?.timezone) {
    return NextResponse.json({ error: "Missing required project or client details." }, { status: 400 });
  }
  if (payload.tier === "custom" && (!Array.isArray(payload.customServices) || payload.customServices.length === 0)) {
    return NextResponse.json({ error: "Custom scope requires at least one configured service." }, { status: 400 });
  }

  const references = data.getAll("references").filter((entry): entry is File => entry instanceof File);
  if (references.length > 5) return NextResponse.json({ error: "Maximum 5 reference images allowed." }, { status: 400 });
  for (const file of references) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!imageExtensions.has(ext) || file.size > maxImageBytes) {
      return NextResponse.json({ error: `Invalid reference file: ${file.name}` }, { status: 400 });
    }
  }

  // Integration point: store files and send payload to CRM/email/project management.
  const id = `SVL-PRJ-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({ ok: true, id });
}
