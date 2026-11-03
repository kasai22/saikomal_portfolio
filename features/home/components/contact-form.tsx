"use client";

import { useId, useState, type FormEvent } from "react";
import { Panel } from "@/components/ui/panel";
import { CONTACT } from "@/constants/profile";

const FIELD_CLASS =
  "w-full rounded-sm border border-ink/12 bg-ink/[0.035] px-3 py-2.5 text-[13px] text-ink placeholder-ink/45 transition-colors focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 aria-[invalid=true]:border-red-700/60";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name) errors.name = "Please add your name.";
  if (!values.email) errors.email = "Please add an email address to reply to.";
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = "That email address doesn't look complete.";
  if (values.message.length < 10) errors.message = "A sentence or two about the role or project, please.";
  return errors;
}

/**
 * A mailto form: there is no server behind it. Submitting opens the
 * visitor's own email client with the subject and body already written,
 * addressed to the résumé email.
 *
 * Validation runs on submit and explains itself inline, with each message
 * tied to its field through `aria-describedby`; the first invalid field takes
 * focus. The fields are kept after sending — if no email client opens, the
 * message is still there to copy, along with the address to send it to.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const ids = { name: useId(), email: useId(), message: useId() };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      setSent(false);
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const subject = encodeURIComponent(`Role opportunity — from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name} (${values.email})`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const describedBy = (field: Field) => (errors[field] ? `${ids[field]}-error` : undefined);

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`${ids[field]}-error`} className="t-meta mt-1.5 text-red-800">
        {errors[field]}
      </p>
    ) : null;

  return (
    <Panel level={2} className="p-5">
      <h3 className="t-h3 mb-4 text-ink">Reach out</h3>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
        <div>
          <label htmlFor={ids.name} className="t-meta mb-1.5 block text-ink/62">
            Name
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={FIELD_CLASS}
            placeholder="Jane Doe"
          />
          {error("name")}
        </div>
        <div>
          <label htmlFor={ids.email} className="t-meta mb-1.5 block text-ink/62">
            Email
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={FIELD_CLASS}
            placeholder="jane@company.com"
          />
          {error("email")}
        </div>
        <div>
          <label htmlFor={ids.message} className="t-meta mb-1.5 block text-ink/62">
            Message
          </label>
          <textarea
            id={ids.message}
            name="message"
            required
            rows={4}
            maxLength={4000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            className={`${FIELD_CLASS} resize-none`}
            placeholder="Team, role, stack, timeline…"
          />
          {error("message")}
        </div>
        <button
          type="submit"
          className="w-full rounded-sm bg-brand py-2.5 text-xs font-semibold text-ink transition-colors duration-instant hover:bg-brand-dark"
        >
          Send message
        </button>
        <p role="status" aria-live="polite" className="t-meta min-h-[1rem] text-ink/62">
          {sent && (
            <>
              Your email app should open with the message ready to send. If it doesn&apos;t,
              write to{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-brand-ink underline underline-offset-2">
                {CONTACT.email}
              </a>
              .
            </>
          )}
        </p>
      </form>
    </Panel>
  );
}
