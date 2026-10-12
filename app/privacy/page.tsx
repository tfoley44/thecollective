import { pageMetadata } from "../../lib/metadata";
import { contactEmail } from "../../lib/content";
export const metadata = pageMetadata(
  "Website Privacy",
  "How the Foley Collective marketing website handles project inquiry drafts and website information.",
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
        The inquiry form prepares an email draft on your device. This website
        does not submit the form to a database or send it automatically. Your
        name, email, company, and project information remain in the page until
        you leave or reload it. If you choose to send the prepared draft through
        your email app, The Foley Collective receives the information in that
        email and uses it to respond to your inquiry.
      </p>
      <h2>Website operation</h2>
      <p>
        This version does not include advertising trackers, visitor analytics,
        or an account system. The hosting provider may process technical
        information such as IP addresses and request logs to serve and protect
        the website. Your browser and email provider have their own privacy
        practices.
      </p>
      <h2>Downloads and copying</h2>
      <p>
        Downloading a project brief creates a text file on your device. The copy
        action writes the prepared brief to your clipboard only when you select
        it. Neither action uploads the brief to this website.
      </p>
      <h2>Your choices</h2>
      <p>
        Only share information needed to discuss your project. Do not include
        credentials, financial details, health records, or other sensitive
        information in an inquiry. You can contact us about information you have
        provided by email.
      </p>
      <h2>Contact</h2>
      <p>
        For website privacy questions, contact{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </article>
  );
}
