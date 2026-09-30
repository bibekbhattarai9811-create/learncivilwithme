// Password-reset email via Resend (https://resend.com).
// NOTE: with the free test sender (onboarding@resend.dev), Resend only delivers
// to the Resend account owner's own address. To email every user, verify a
// domain in Resend and set EMAIL_FROM to an address on it.

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string) {
  const safeName = name.replace(/[<>&"]/g, "");
  const html = `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#0a1020;color:#e6ecf7;border-radius:12px">
    <p style="font-size:14px;color:#f5a524;margin:0 0 4px;font-weight:700">LearnCivilWithMe</p>
    <h1 style="font-size:20px;margin:0 0 16px">Reset your password</h1>
    <p style="font-size:14px;line-height:1.6;color:#c9d2e3">Hi ${safeName}, someone (hopefully you) asked to reset your password.
    This link works once and expires in 1 hour.</p>
    <p style="margin:24px 0"><a href="${resetUrl}" style="background:#f5a524;color:#0a1020;text-decoration:none;font-weight:600;padding:10px 20px;border-radius:8px;display:inline-block;font-size:14px">Reset password</a></p>
    <p style="font-size:12px;color:#8b9bb8;line-height:1.6">If you didn't ask for this, ignore this email and your password won't change.<br>
    Link not working? Paste this into your browser:<br>${resetUrl}</p>
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "LearnCivilWithMe <onboarding@resend.dev>",
      to,
      subject: "Reset your LearnCivilWithMe password",
      html,
      text: `Reset your LearnCivilWithMe password: ${resetUrl}\n\nThis link expires in 1 hour. If you didn't ask for this, ignore this email.`,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
}
