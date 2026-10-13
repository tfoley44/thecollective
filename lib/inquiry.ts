export const PROJECT_TYPES = [
  "Mobile app",
  "Web platform",
  "MVP",
  "Not sure yet",
] as const;

export const BUDGET_RANGES = [
  "Let’s discuss",
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000+",
] as const;

export const PROJECT_TIMINGS = [
  "Let’s figure it out",
  "As soon as practical",
  "Within 3 months",
  "3–6 months",
  "Just exploring",
] as const;

export const INQUIRY_LIMITS = {
  name: 100,
  email: 254,
  company: 120,
  messageMin: 15,
  messageMax: 3000,
} as const;

export const INQUIRY_SUCCESS_MESSAGE =
  "Your inquiry has been submitted. Thank you—we’ll be in touch using the email address you provided.";

export const INQUIRY_VALIDATION_MESSAGE =
  "Please provide a valid name, email, and 15–3,000-character project description, and select the available project options.";

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type InquiryFields = {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType;
  budget: (typeof BUDGET_RANGES)[number];
  timing: (typeof PROJECT_TIMINGS)[number];
  message: string;
  website: string;
};

export type ValidatedInquiry = Omit<InquiryFields, "website"> & {
  requestId: string;
};

export type InquiryResult = { ok: boolean; message: string };
export type InquiryValidation =
  | { ok: true; inquiry: ValidatedInquiry }
  | { ok: false; message: string };

function text(
  value: unknown,
  limit: number,
  minimum = 0,
  multiline = false,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < minimum || trimmed.length > limit) return null;
  const controls = multiline
    ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/
    : /[\u0000-\u001f\u007f]/;
  return controls.test(trimmed) ? null : trimmed;
}

export function isValidEmail(value: string): boolean {
  return (
    value.length <= INQUIRY_LIMITS.email &&
    /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(value)
  );
}

function isOption<T extends readonly string[]>(
  value: string | null,
  options: T,
): value is T[number] {
  return value !== null && options.includes(value);
}

export function validateInquiry(input: unknown): InquiryValidation {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, message: "Please review the form." };
  }
  const raw = input as Record<string, unknown>;
  if (typeof raw.website !== "string" || raw.website.trim()) {
    return { ok: false, message: "The request could not be accepted." };
  }

  const name = text(raw.name, INQUIRY_LIMITS.name, 1);
  const email = text(raw.email, INQUIRY_LIMITS.email, 3);
  const company = text(raw.company, INQUIRY_LIMITS.company);
  const message = text(
    raw.message,
    INQUIRY_LIMITS.messageMax,
    INQUIRY_LIMITS.messageMin,
    true,
  );
  const projectType = text(raw.projectType, 50, 1);
  const budget = text(raw.budget, 50, 1);
  const timing = text(raw.timing, 50, 1);
  const requestId = text(raw.requestId, 36, 36);

  if (
    !name ||
    !email ||
    !isValidEmail(email) ||
    company === null ||
    !message ||
    !isOption(projectType, PROJECT_TYPES) ||
    !isOption(budget, BUDGET_RANGES) ||
    !isOption(timing, PROJECT_TIMINGS) ||
    !requestId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestId,
    )
  ) {
    return { ok: false, message: INQUIRY_VALIDATION_MESSAGE };
  }

  return {
    ok: true,
    inquiry: {
      name,
      email,
      company,
      message,
      projectType,
      budget,
      timing,
      requestId,
    },
  };
}
