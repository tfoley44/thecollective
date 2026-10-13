import { pageMetadata } from "../../lib/metadata";
import { contactEmail } from "../../lib/content";
export const metadata = pageMetadata(
  "Website Privacy",
  "How the Foley Collective website handles project inquiries and website information.",
  "/privacy/",
);

export default function PrivacyPage() {
  return (
    <article className="legal-page shell">
      <p className="eyebrow">THE FOLEY COLLECTIVE</p>
      <h1>Website privacy.</h1>
      <p className="legal-date">Last updated: October 12, 2026</p>
      <h2>Project inquiries</h2>
      <p>
        When you select “Send my inquiry,” the website submits your name, email
        address, optional company, project type, budget range, timing, and
        project description to our server. Our email-delivery provider, Resend,
        processes those details to send the inquiry to The Foley Collective. We
        use the information to discuss and respond to your project. Your email
        app is not opened.
      </p>
      <p>
        This website does not keep a separate inquiry database. Messages may be
        retained in our company inbox and by our email provider under its
        retention practices. A successful submission means the email service
        accepted the request; it is not a guarantee of inbox delivery.
      </p>
      <h2>Website operation and abuse prevention</h2>
      <p>
        This version does not include advertising trackers, visitor analytics,
        or an account system. The hosting provider may process technical
        information such as IP addresses and request logs to serve and protect
        the website. The inquiry endpoint temporarily keeps a hashed network
        identifier and request counts in server memory to limit repeated
        submissions. Your hosting and email providers have their own privacy
        practices.
      </p>
      <h2>Your choices</h2>
      <p>
        Only share information needed to discuss your project. Do not include
        credentials, financial details, health records, or other sensitive
        information. If a submission fails, your details stay in the page so you
        can review and retry; leaving or reloading the page clears the form.
        Contact us to discuss information you have provided or request its
        removal.
      </p>
      <h2>Contact</h2>
      <p>
        For website privacy questions, write to {contactEmail}, or use the{" "}
        <a href="/contact/">contact form</a>.
      </p>
    </article>
  );
}
