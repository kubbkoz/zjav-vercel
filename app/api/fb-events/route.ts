import { NextRequest, NextResponse } from "next/server";
import { sendFacebookServerEvent } from "@/lib/facebook-conversions-api";

interface FbEventBody {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  contentName?: string;
  email?: string;
  phone?: string;
}

// Receives client-side tracking calls and forwards them to Meta's
// Conversions API with server-derived identifiers (IP, user agent, _fbp/
// _fbc cookies) that the browser can't reliably provide itself. Best-effort:
// always responds 200 so a tracking hiccup never surfaces as a user-facing
// error in the calling flow (e.g. the contact form).
export async function POST(req: NextRequest) {
  let body: FbEventBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { eventName, eventId, eventSourceUrl, contentName, email, phone } = body;
  if (!eventName || !eventId || !eventSourceUrl) {
    return NextResponse.json(
      { ok: false, error: "Missing eventName, eventId or eventSourceUrl" },
      { status: 400 }
    );
  }

  const clientIpAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined;
  const clientUserAgent = req.headers.get("user-agent") || undefined;
  const fbp = req.cookies.get("_fbp")?.value;
  const fbc = req.cookies.get("_fbc")?.value;

  await sendFacebookServerEvent({
    eventName,
    eventId,
    eventSourceUrl,
    contentName,
    email,
    phone,
    clientIpAddress,
    clientUserAgent,
    fbp,
    fbc,
  });

  return NextResponse.json({ ok: true });
}
