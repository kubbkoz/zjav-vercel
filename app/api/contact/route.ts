import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = "smtp.hostcreators.sk";
const SMTP_PORT = 465;
const SMTP_USER = "hello@zjav.sk";
const SMTP_PASS = process.env.SMTP_PASSWORD || "@Fmhpx8g8#";
const ADMIN_EMAIL = "hello@zjav.sk";

// Simple in-memory rate limiter: max 3 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

// Honeypot + time-based antispam check
function isSpam(body: {
  honeypot?: string;
  formLoadedAt?: number;
  name: string;
  email: string;
  message: string;
}): boolean {
  // Filled honeypot = bot
  if (body.honeypot) return true;
  // Submitted too fast (under 3 seconds) = bot
  if (body.formLoadedAt && Date.now() - body.formLoadedAt < 3000) return true;
  return false;
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Príliš veľa pokusov. Skúste to znova o chvíľu." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { name, email, phone, message, budget, features, packageName, honeypot, formLoadedAt } = body;

  if (isSpam({ honeypot, formLoadedAt, name, email, message })) {
    // Return 200 so bots think it worked
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Vyplňte prosím všetky povinné polia." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Neplatná emailová adresa." }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : "";
  const safeMessage = escapeHtml(message);
  const safePackageName = packageName ? escapeHtml(packageName) : "";
  const safeBudget = budget ? escapeHtml(budget) : "";
  const safeFeatures = features ? escapeHtml(features) : "";

  try {
    // 1) Admin notification
    await transporter.sendMail({
      from: `"ZJAV_ Web" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: safePackageName
        ? `Dopyt k balíku ${safePackageName} od ${safeName} — zjav.sk`
        : `Nový dopyt od ${safeName} — zjav.sk`,
      html: `
        <div style="font-family: monospace; background:#0a0f1a; color:#f0f4ff; padding:32px; border-radius:8px; max-width:600px;">
          <div style="border-bottom:1px solid #1e3a5f; padding-bottom:16px; margin-bottom:24px;">
            <span style="font-size:24px; font-weight:700; color:#00cfe8;">ZJAV_</span>
            <span style="color:#a0abcb; font-size:12px; margin-left:8px;">nový dopyt</span>
          </div>
          <table style="width:100%; border-collapse:collapse;">
            ${safePackageName ? `<tr><td style="color:#a0abcb; padding:8px 0; width:120px;">Balík:</td><td style="color:#00e5a0;">${safePackageName}</td></tr>` : ""}
            <tr><td style="color:#a0abcb; padding:8px 0; width:120px;">Meno:</td><td style="color:#f0f4ff;">${safeName}</td></tr>
            <tr><td style="color:#a0abcb; padding:8px 0;">Email:</td><td style="color:#00cfe8;"><a href="mailto:${safeEmail}" style="color:#00cfe8;">${safeEmail}</a></td></tr>
            ${safePhone ? `<tr><td style="color:#a0abcb; padding:8px 0;">Telefón:</td><td style="color:#f0f4ff;">${safePhone}</td></tr>` : ""}
            ${safeBudget ? `<tr><td style="color:#a0abcb; padding:8px 0;">Rozpočet:</td><td style="color:#f0f4ff;">${safeBudget}</td></tr>` : ""}
            ${safeFeatures ? `<tr><td style="color:#a0abcb; padding:8px 0; vertical-align:top;">Funkcie:</td><td style="color:#f0f4ff; white-space:pre-line;">${safeFeatures}</td></tr>` : ""}
            <tr><td style="color:#a0abcb; padding:8px 0; vertical-align:top;">Správa:</td><td style="color:#f0f4ff; white-space:pre-line;">${safeMessage}</td></tr>
          </table>
          <div style="margin-top:24px; padding-top:16px; border-top:1px solid #1e3a5f; color:#a0abcb; font-size:11px;">
            Odoslané cez zjav.sk · ${new Date().toLocaleString("sk-SK")}
          </div>
        </div>
      `,
    });

    // 2) Customer confirmation
    await transporter.sendMail({
      from: `"Jakub — ZJAV_" <${SMTP_USER}>`,
      to: email,
      subject: `Dostal som váš dopyt, ${safeName.split(" ")[0]}!`,
      html: `
        <div style="font-family: monospace; background:#0a0f1a; color:#f0f4ff; padding:32px; border-radius:8px; max-width:600px;">
          <div style="border-bottom:1px solid #1e3a5f; padding-bottom:16px; margin-bottom:24px;">
            <span style="font-size:24px; font-weight:700; color:#00cfe8;">ZJAV_</span>
          </div>
          <p style="color:#f0f4ff; font-size:16px; line-height:1.7;">Ahoj <strong>${safeName.split(" ")[0]}</strong>,</p>
          <p style="color:#a0abcb; line-height:1.7;">
            dostal som váš dopyt a ozvem sa do <span style="color:#00e5a0;">24 hodín</span>.
            Medzitým si pripravím náhľad webu, aby sme mali hneď čo prebrať.
          </p>
          <p style="color:#a0abcb; line-height:1.7;">Ak sa chcete ozvať vy, napíšte priamo sem:
            <a href="mailto:hello@zjav.sk" style="color:#00cfe8;">hello@zjav.sk</a>
          </p>
          <div style="margin-top:32px; padding:16px; border:1px solid #1e3a5f; border-radius:4px;">
            <p style="color:#a0abcb; font-size:12px; margin:0 0 8px;">Vaša správa:</p>
            <p style="color:#f0f4ff; white-space:pre-line; margin:0;">${safeMessage}</p>
          </div>
          <p style="color:#a0abcb; margin-top:32px;">Jakub<br/><span style="color:#00cfe8;">zjav.sk</span></p>
          <div style="margin-top:24px; padding-top:16px; border-top:1px solid #1e3a5f; color:#4a5568; font-size:11px;">
            ZJAV_ · zjav.sk · IČO: 50532596
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact API] email error:", err);
    return NextResponse.json(
      { error: "Odoslanie zlyhalo. Skúste znova alebo napíšte priamo na hello@zjav.sk" },
      { status: 500 }
    );
  }
}
