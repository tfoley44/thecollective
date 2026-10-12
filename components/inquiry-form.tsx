"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { contactEmail } from "../lib/content";

export function InquiryForm() {
  const [status, setStatus] = useState("");
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [projectType, setProjectType] = useState("Mobile app");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Hi The Foley Collective,\n\nI'd like to talk about a ${projectType.toLowerCase()} project.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company") || "Not specified"}\nProject type: ${projectType}\nBudget: ${data.get("budget")}\nTiming: ${data.get("timing")}\n\nThe idea:\n${data.get("message")}\n\nLooking forward to connecting.`;
    setBrief(body);
    setCopied(false);
    setStatus(
      "Your brief is ready. We’ve opened an email draft—review and send it in your email app. Nothing has been sent by this website. If your email app didn’t open, copy or download the brief below.",
    );
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Project inquiry: ${projectType}`)}&body=${encodeURIComponent(body)}`;
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setStatus(
        "Your browser could not copy automatically. Select and copy the brief in the text area below.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "foley-project-brief.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <h2>
        A little about you.
        <br />A little about your idea.
      </h2>
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input
            autoComplete="name"
            name="name"
            placeholder="Jamie Taylor"
            maxLength={100}
            required
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            autoComplete="email"
            type="email"
            name="email"
            placeholder="jamie@company.com"
            maxLength={254}
            required
          />
        </label>
      </div>
      <label>
        Company <small>(optional)</small>
        <input
          name="company"
          autoComplete="organization"
          maxLength={120}
          placeholder="Your company or new venture"
        />
      </label>
      <fieldset>
        <legend>What are you looking to build?</legend>
        <div className="project-type-buttons">
          {["Mobile app", "Web platform", "MVP", "Not sure yet"].map((type) => (
            <button
              type="button"
              className={projectType === type ? "selected" : ""}
              aria-pressed={projectType === type}
              key={type}
              onClick={() => setProjectType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="form-row">
        <label>
          Budget range
          <select name="budget" defaultValue="Let’s discuss">
            <option>Let’s discuss</option>
            <option>Under $10,000</option>
            <option>$10,000–$25,000</option>
            <option>$25,000–$50,000</option>
            <option>$50,000+</option>
          </select>
        </label>
        <label>
          Ideal timing
          <select name="timing">
            <option>Let’s figure it out</option>
            <option>As soon as practical</option>
            <option>Within 3 months</option>
            <option>3–6 months</option>
            <option>Just exploring</option>
          </select>
        </label>
      </div>
      <label>
        Tell us about your idea <span>*</span>
        <textarea
          name="message"
          rows={5}
          minLength={15}
          maxLength={3000}
          required
          placeholder="What do you want to build? Who is it for? What would it make better?"
        />
        <small>
          15–3,000 characters. Please don’t include passwords or sensitive
          information.
        </small>
      </label>
      <button type="submit" className="button button-primary">
        Prepare my inquiry <ArrowUpRight size={17} />
      </button>
      <p className="form-note">
        This opens a draft in your email app. Your details are not stored by
        this site. You choose when to send.{" "}
        <a href="/privacy">Privacy details</a>.
      </p>
      {brief && (
        <div className="brief-ready">
          <p role="status">{status}</p>
          <textarea
            readOnly
            aria-label="Prepared project brief"
            value={brief}
            rows={8}
          />
          <div>
            <button type="button" onClick={copy}>
              {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
              {copied ? "Copied" : "Copy brief"}
            </button>
            <button type="button" onClick={download}>
              <Download size={15} /> Download brief
            </button>
          </div>
          <p>
            Send to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      )}
    </form>
  );
}
