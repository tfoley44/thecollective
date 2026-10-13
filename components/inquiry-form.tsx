"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import {
  BUDGET_RANGES,
  INQUIRY_LIMITS,
  INQUIRY_SUCCESS_MESSAGE,
  PROJECT_TIMINGS,
  PROJECT_TYPES,
  type ProjectType,
} from "../lib/inquiry";

export function InquiryForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType>(PROJECT_TYPES[0]);
  const pending = useRef(false);
  const attempt = useRef({ fingerprint: "", requestId: "" });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending.current) return;
    const data = new FormData(e.currentTarget);
    const fields = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      projectType,
      budget: String(data.get("budget") ?? ""),
      timing: String(data.get("timing") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };
    const fingerprint = JSON.stringify(fields);
    if (attempt.current.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, requestId: crypto.randomUUID() };
    }
    pending.current = true;
    setSending(true);
    setStatus("");
    try {
      const result = await fetch("/api/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          requestId: attempt.current.requestId,
        }),
        signal: AbortSignal.timeout(30_000),
      });
      const body = await result.json().catch(() => null);
      if (!result.ok || body?.ok !== true) {
        setStatus(
          typeof body?.message === "string"
            ? body.message
            : "Your inquiry could not be submitted. Please try again shortly; your details are still here.",
        );
        return;
      }
      setSent(true);
      setStatus(INQUIRY_SUCCESS_MESSAGE);
    } catch {
      setStatus(
        "We couldn’t confirm your submission. Please check your connection and try again. Your details are still here.",
      );
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="inquiry-form inquiry-success" role="status">
        <Check size={28} aria-hidden="true" />
        <h2>
          Thank you for sharing
          <br />
          your idea.
        </h2>
        <p>{status}</p>
        <p>
          No email app is needed. If you don’t hear back, check your inbox and
          spam folder.
        </p>
        <button
          type="button"
          className="button button-primary"
          onClick={() => {
            setSent(false);
            setStatus("");
            attempt.current = { fingerprint: "", requestId: "" };
          }}
        >
          Send another inquiry <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={submit} aria-busy={sending}>
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
            maxLength={INQUIRY_LIMITS.name}
            required
            disabled={sending}
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            autoComplete="email"
            type="email"
            name="email"
            placeholder="jamie@company.com"
            maxLength={INQUIRY_LIMITS.email}
            required
            disabled={sending}
          />
        </label>
      </div>
      <label>
        Company <small>(optional)</small>
        <input
          name="company"
          autoComplete="organization"
          maxLength={INQUIRY_LIMITS.company}
          placeholder="Your company or new venture"
          disabled={sending}
        />
      </label>
      <fieldset disabled={sending}>
        <legend>What are you looking to build?</legend>
        <div className="project-type-buttons">
          {PROJECT_TYPES.map((type) => (
            <button
              type="button"
              className={projectType === type ? "selected" : ""}
              aria-pressed={projectType === type}
              key={type}
              onClick={() => setProjectType(type)}
              disabled={sending}
            >
              {type}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="form-row">
        <label>
          Budget range
          <select
            name="budget"
            defaultValue={BUDGET_RANGES[0]}
            disabled={sending}
          >
            {BUDGET_RANGES.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>
        <label>
          Ideal timing
          <select
            name="timing"
            defaultValue={PROJECT_TIMINGS[0]}
            disabled={sending}
          >
            {PROJECT_TIMINGS.map((timing) => (
              <option key={timing}>{timing}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Tell us about your idea <span>*</span>
        <textarea
          name="message"
          rows={5}
          minLength={INQUIRY_LIMITS.messageMin}
          maxLength={INQUIRY_LIMITS.messageMax}
          required
          placeholder="What do you want to build? Who is it for? What would it make better?"
          disabled={sending}
        />
        <small>
          15–3,000 characters. Please don’t include passwords or sensitive
          information.
        </small>
      </label>
      <div className="inquiry-honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" autoComplete="off" tabIndex={-1} />
        </label>
      </div>
      <button
        type="submit"
        className="button button-primary"
        disabled={sending}
      >
        {sending ? "Sending your inquiry…" : "Send my inquiry"}{" "}
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note">
        Submit directly to our team—no email app required. We use your details
        to respond to your project inquiry.{" "}
        <a href="/privacy/">Privacy details</a>.
      </p>
      {status && (
        <p className="inquiry-error" role="alert">
          {status}
        </p>
      )}
    </form>
  );
}
