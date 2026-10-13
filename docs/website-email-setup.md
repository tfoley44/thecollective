# Send project inquiries from the website, not Apple Mail

> Current status: the existing `forms.thefoleycollective.com` sender is verified, Production variables are configured, and Resend reported a live V3 test delivered on October 12, 2026. Preserve those working settings. The steps below are for a new environment or recovery, not a requirement to recreate the domain or key. See `deployment-status.md`.

The original form used a `mailto:` link. That asked the visitor's email app to prepare a message; it did not send from the website. The V3 form replaces this with a server-side submission to Resend and stays on the contact page. Messages go only to `contact@thefoleycollective.com`. You can still read and reply in Apple Mail if that is where your company inbox is configured, but visitors no longer need any email app.

## Activate the sending service

Open your [Resend account](https://resend.com) and select the existing verified sending domain. Only add a new domain for a genuinely new setup. A dedicated subdomain such as `forms.thefoleycollective.com` keeps website sending records separate from existing incoming mail. Use the exact DNS records Resend shows and wait until verification succeeds. Do not replace root-domain MX records or remove existing email-provider records. The Foley root-domain records currently point to Google; Apple Mail can be the client without being the mail provider. This setup sends notifications; it does not transfer your inbox to Resend. [1]

Create a Resend API key for sending from the verified domain. Treat it as a password. Do not send it in chat or include it in committed files.

## Configure Vercel

In your existing Vercel project, open **Settings → Environment Variables**. Add:

```text
RESEND_API_KEY = your private Resend sending key
INQUIRY_FROM_EMAIL = website@forms.thefoleycollective.com
NEXT_PUBLIC_SITE_URL = https://thefoleycollective.com
```

Use the sender above only after that subdomain is actually verified. If you verify a different domain, use a plain email address on that verified domain. Select Production, and Preview only if you want previews to send real notifications too. `RESEND_API_KEY` must remain server-only; never rename it with a `NEXT_PUBLIC_` prefix. The recipient remains fixed in the source and cannot be changed by form visitors. The customer's address is used as `reply_to`, so replying to the notification replies to the customer. [2]

Deploy the V3 files in your repository's actual Vercel Root Directory. Keep the Next.js framework preset and the explicit `.next` output setting. **Do not use `output: "export"` or publish `out` for this version**: a static export cannot execute the new POST route. The V3 patch removes that setting and updates build verification accordingly.

Commit the new files and deploy the new commit after adding the environment variables. The build should show:

```text
FOLEY_VERCEL_FIX_V2: outputDirectory=.next; routing manifest verified.
FOLEY_WEBSITE_EMAIL_V3: server-side inquiry endpoint compiled; runtime email credentials required.
```

Builds do not need the email key and cannot prove delivery. If the key or sender is missing at runtime, the form explicitly reports that nothing was sent; it does not fake a success message.

## Verify delivery

Once Vercel is Ready, open the deployed contact page and submit one clearly labeled test using your own email address. The browser should remain on the page and show a submission acknowledgement, without opening Apple Mail. Check Resend's email activity and confirm the notification arrives in `contact@thefoleycollective.com`, including its spam folder. Reply to it and verify the reply targets the address you entered. An API acceptance response does not guarantee inbox delivery.

If it fails, check the selected Vercel environment, redeploy after changing variables, and inspect Resend's activity for domain/permission/rejection details. Do not share the API key in screenshots or logs. If the API returns “Submit from this website,” ensure `NEXT_PUBLIC_SITE_URL` matches the exact live origin. An optional server variable `INQUIRY_ALLOWED_ORIGINS` can list additional explicit origins, separated by commas. Vercel's generated deployment origins are also recognized.

## What is already tested, and what remains

Source validation includes 20 mocked tests covering the shared form contract, fixed recipient, reply-to, invalid input, request size, cross-origin rejection, spam honeypot, missing credentials, provider failures, retry deduplication, and best-effort throttling. Tests do not send live email. The production build and HTTP endpoint checks are separate from live-provider testing.

Live V3 provider delivery was checked successfully before source cleanup. Inbox placement and ordinary mailbox sending remain separate checks. A source cleanup is not a production rollout; preserve working variables and review the new commit before deploying it. No Apple Mail credentials are needed, and this package changes no DNS records.

## References

[1]: https://resend.com/docs/send-with-nextjs "Resend: Next.js sending prerequisites and route handlers"
[2]: https://resend.com/docs/api-reference/emails/send-email "Resend: Email sender, recipient, reply-to, and idempotency API"
