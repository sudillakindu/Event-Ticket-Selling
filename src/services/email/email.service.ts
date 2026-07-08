import nodemailer from "nodemailer";
import { env } from "@/lib/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_APP_PASSWORD
  }
});

export interface TicketEmailPayload {
  to: string;
  customerName: string;
  eventName: string;
  ticketVariant: string;
  ticketNumber: string;
  qrImageUrl: string;
  qrLink: string;
}

export async function sendTicketEmail(payload: TicketEmailPayload): Promise<void> {
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#f8fffb;padding:24px;color:#0f172a">
      <div style="max-width:680px;margin:0 auto;background:#fff;border-radius:20px;padding:32px;border:1px solid #d1fae5">
        <h1 style="margin:0 0 12px;font-size:28px;color:#064e3b">Your Ticket is Ready</h1>
        <p style="font-size:16px;line-height:1.6">Hello ${payload.customerName}, your reservation has been approved for <strong>${payload.eventName}</strong>.</p>
        <div style="margin:24px 0;padding:16px 20px;background:#ecfdf5;border-radius:16px">
          <p style="margin:0 0 6px"><strong>Ticket Number:</strong> ${payload.ticketNumber}</p>
          <p style="margin:0 0 6px"><strong>Variant:</strong> ${payload.ticketVariant}</p>
          <p style="margin:0"><strong>Scan Link:</strong> <a href="${payload.qrLink}">${payload.qrLink}</a></p>
        </div>
        <img src="${payload.qrImageUrl}" alt="QR Code" style="max-width:260px;width:100%;display:block;margin:0 auto 20px" />
        <p style="font-size:14px;color:#475569;line-height:1.6">Present the QR code to authorized staff at the venue. Each access item can be consumed only once.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM_EMAIL}>`,
    to: payload.to,
    subject: `Your Ticket for ${payload.eventName}`,
    html
  });
}