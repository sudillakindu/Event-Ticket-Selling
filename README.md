# Event Ticket Selling Platform

Production-ready enterprise event ticket selling and QR access control platform built with Next.js 15, TypeScript, Tailwind CSS, shadcn-style UI primitives, Firebase Realtime Database, Firebase Authentication, Firebase Admin SDK, Nodemailer Gmail SMTP, and secure QR token validation.

## Overview

This system is designed for event organizers that sell tickets through offline payment methods such as cash or bank transfer. The customer submits a reservation and uploads payment proof. An organizer manually verifies the payment. After approval, the system generates a secure ticket, creates a QR token, stores the token hash, and sends a ticket email with the QR code.

On the event day, only authenticated organizer or scanner staff accounts can validate tickets through the website. Each access item inside a ticket variant is consumed individually and can only be used once. Unauthorized users must never see protected ticket information.

## Core Roles

- Super Admin: platform administration, user management, organizer oversight, reporting, and settings.
- Organizer: create and manage events, ticket variants, access items, reservations, approvals, and revenue tracking.
- Scanner Staff: scan QR codes and consume access items during event entry or service usage.
- Customer: register, reserve tickets, upload payment proof, and view purchased tickets.

## How The System Works

1. Customer registers and signs in with Firebase Authentication.
2. Customer creates a reservation for an event and ticket variant.
3. Customer uploads payment proof for an offline payment method.
4. Organizer manually verifies the payment.
5. After approval, the server generates a secure random QR token, stores only the hashed token, and creates the ticket record.
6. The system sends an HTML email via Gmail SMTP with the QR code and ticket details.
7. At the venue, an authorized organizer or scanner staff member opens the scan page and validates the QR token.
8. Each access item is consumed independently and audited with timestamp, staff ID, browser, scanner device, and IP address.

## Tech Stack

- Framework: Next.js 15 App Router
- Language: TypeScript strict mode
- Styling: Tailwind CSS
- UI primitives: shadcn-style components built on Radix and utility helpers
- State management: React Context API and TanStack Query
- Forms: React Hook Form ready architecture
- Validation: Zod
- Database: Firebase Realtime Database
- Authentication: Firebase Authentication and Firebase Admin SDK
- Storage: Firebase Storage
- Email: Nodemailer with Google Gmail App Password
- QR generation: qrcode
- QR scanning: html5-qrcode ready integration
- Charts: Recharts
- Animations: Framer Motion ready integration
- Deployment: Vercel

## Architecture

The codebase uses a feature-based enterprise layout so business logic stays separated from UI and infrastructure concerns.

- src/app: App Router pages, layouts, routes, and API handlers.
- src/components: reusable UI and layout primitives.
- src/features: feature-specific components and flows.
- src/lib: Firebase client/admin initialization, session helpers, environment contract.
- src/repositories: Realtime Database access layer.
- src/services: QR, email, security, and business services.
- src/shared: domain types shared across app layers.
- src/validators: Zod schemas for request and form validation.
- src/utils: shared utility helpers.
- firebase: Realtime Database and Storage rules.

## Folder Structure

```text
src/
	app/
		api/
		dashboard/
		scan/
		sign-in/
	components/
		layout/
		ui/
	features/
	lib/
		firebase/
	providers/
	repositories/
	services/
	shared/
	validators/
	constants/
	utils/
firebase/
```

## Environment Setup

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Fill in the values below.

### Required Environment Variables

| Variable | Purpose |
| --- | --- |
| NEXT_PUBLIC_APP_URL | Public app URL used for QR links and email links |
| NEXT_PUBLIC_FIREBASE_API_KEY | Firebase web API key |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | Firebase auth domain |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | Firebase project ID |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | Firebase storage bucket |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | Firebase messaging sender ID |
| NEXT_PUBLIC_FIREBASE_APP_ID | Firebase app ID |
| FIREBASE_CLIENT_EMAIL | Firebase Admin service account client email |
| FIREBASE_PRIVATE_KEY | Firebase Admin private key, keep line breaks escaped as \n |
| FIREBASE_PROJECT_ID | Firebase project ID for Admin SDK |
| FIREBASE_DATABASE_URL | Realtime Database URL |
| FIREBASE_STORAGE_BUCKET | Firebase Storage bucket |
| FIREBASE_AUTH_EMULATOR_HOST | Optional auth emulator host |
| FIREBASE_SESSION_COOKIE_NAME | Cookie name used for session storage |
| FIREBASE_SESSION_COOKIE_SECRET | Long secret value for session related security |
| GMAIL_USER | Gmail address used to send ticket emails |
| GMAIL_APP_PASSWORD | Google App Password for Gmail SMTP |
| SMTP_FROM_NAME | Sender display name |
| SMTP_FROM_EMAIL | Sender email address |
| RATE_LIMIT_WINDOW_MS | Rate limit window in milliseconds |
| RATE_LIMIT_MAX_REQUESTS | Maximum requests allowed per window |

## Firebase Setup

1. Create a Firebase project.
2. Enable Authentication with Email and Password.
3. Create a Realtime Database instance.
4. Enable Firebase Storage.
5. Download a service account JSON for Firebase Admin SDK.
6. Copy the values into your .env.local file.
7. Deploy the rules from firebase/database.rules.json and firebase/storage.rules.

### Firebase Realtime Database Model

The project is designed around these top-level collections:

- users
- roles
- events
- ticketVariants
- accessItems
- reservations
- payments
- tickets
- qrTokens
- ticketUsages
- auditLogs

The structure avoids unnecessary deep nesting and keeps records query-friendly for enterprise reporting and admin operations.

## Gmail SMTP Setup

This project uses Nodemailer with Gmail SMTP and a Google App Password.

1. Enable 2-Step Verification on the Gmail account.
2. Create a Google App Password.
3. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local.
4. Set SMTP_FROM_NAME and SMTP_FROM_EMAIL to match the sender identity.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the application at:

```bash
http://localhost:3000
```

## Validation and Quality Checks

Run a strict TypeScript check:

```bash
npm run typecheck
```

Run linting:

```bash
npm run lint
```

## Production Flow Summary

- Customer signs in and submits a reservation.
- Organizer verifies the offline payment.
- System generates a secure ticket and QR token.
- Email is sent automatically through Gmail SMTP.
- Scanner staff validates the QR token on the event day.
- Each access item is consumed once and recorded in the audit log.

## Security Notes

- Never expose Firebase Admin credentials or private keys in the client.
- Only store QR token hashes in persistent storage.
- Protect dashboard and scan routes with server-side session checks.
- Use Firebase Security Rules alongside server-side authorization.
- Validate all incoming payloads with Zod before processing.

## Deployment

This project is suitable for Vercel deployment.

1. Set all environment variables in the Vercel project settings.
2. Deploy the Firebase rules.
3. Confirm Gmail App Password authentication works in production.
4. Verify that the Firebase Admin private key and session cookie secret are configured.

## Current Implementation Status

The repository already includes the production scaffold, shared architecture, auth/session flow, QR issuance and validation services, initial dashboard routes, and Firebase rules. Additional feature expansion can continue from the current structure without refactoring the base layout.