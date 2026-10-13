import { pageMetadata } from "../../lib/metadata";
import { ArrowUpRight, Check } from "lucide-react";
import { InquiryForm } from "../../components/inquiry-form";
import { contactEmail } from "../../lib/content";

export const metadata = pageMetadata(
  "Start an App Project",
  "Tell The Foley Collective about your app idea. Start a conversation about strategy, product design, development, and your first release.",
  "/contact/",
);

export default function ContactPage() {
  return (
    <section className="contact-page shell">
      <div className="contact-page-copy">
        <p className="eyebrow">
          <span className="status-dot" /> LET’S BUILD SOMETHING MEANINGFUL
        </p>
        <h1>
          It starts with
          <br />a <span className="serif-word">conversation.</span>
        </h1>
        <p>
          You don’t need all the answers. Tell us what you’re thinking, and
          we’ll work out the next step together.
        </p>
        <span className="contact-email">
          {contactEmail}
          <ArrowUpRight size={18} />
        </span>
        <div className="what-next">
          <h3>What happens next?</h3>
          <p>
            <Check size={16} /> You share the idea and where you are.
          </p>
          <p>
            <Check size={16} /> We discuss the goals and possibilities.
          </p>
          <p>
            <Check size={16} /> Together, we define a sensible next step.
          </p>
        </div>
        <p className="contact-side-note">
          Just exploring? That’s welcome, too.
        </p>
      </div>
      <InquiryForm />
    </section>
  );
}
