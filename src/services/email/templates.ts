export function ticketEmailText(payload: {
  customerName: string;
  eventName: string;
  ticketVariant: string;
  ticketNumber: string;
  qrLink: string;
}): string {
  return [
    `Hello ${payload.customerName},`,
    `Your ticket for ${payload.eventName} is approved.`,
    `Variant: ${payload.ticketVariant}`,
    `Ticket Number: ${payload.ticketNumber}`,
    `Scan Link: ${payload.qrLink}`,
    `Present this QR code to authorized staff at the event.`
  ].join("\n\n");
}