# Deployment status

## Verified production V3 — October 12, 2026

- Production website: `https://thefoleycollective.com`.
- Vercel project: `thecollective`, under `thecollective-projects`.
- All three required variables exist in Production: `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `NEXT_PUBLIC_SITE_URL`. Secrets were not decrypted or included in source.
- Sender `forms.thefoleycollective.com` is verified in Resend; sending is enabled, receiving and open/click tracking remain disabled.
- A labeled production-form test returned HTTP 200 and provider acknowledgement at 7:32 PM Pacific. Resend reported it **delivered** to `contact@thefoleycollective.com` from `website@forms.thefoleycollective.com`.
- Homepage, contact, and privacy pages returned HTTP 200. Favicon declarations were present, no mailto links remained, `/api/health/` returned success, and `www` redirected to the primary domain.

Delivered means recipient mail-server acceptance; inbox placement and human receipt were not independently confirmed. This status does not prove the company's separate mailbox can send ordinary outbound mail.

## Source cleanup

The later cleanup is a behavior-preserving local source revision. It is not a new production deployment. It retains the successful `.next` settings and email-variable names. No Vercel environment variable, DNS record, mailbox setting, or live deployment was changed during cleanup. Merge source updates with any user changes in the separately connected production repository before choosing to deploy.

## Historical context

The owner confirmed V2 deployment earlier on October 12, 2026. V2 used static export; V3 replaced that with normal server-capable Next.js so the inquiry API can execute. Historical recovery notes are not the current configuration instructions.
