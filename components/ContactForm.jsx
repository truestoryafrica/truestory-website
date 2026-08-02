"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  organization: "",
  projectType: "",
  message: "",
  website: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setStatus("loading");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setNotice(result.error || "Please check the form and try again.");
        return;
      }

      setStatus("success");
      setNotice(result.message || "Thanks. Your project brief has been received.");
      setForm(initialState);
    } catch {
      setStatus("error");
      setNotice("We could not send the form. Please email hello@truestoryafrica.com directly.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submitForm}>
      <label className="form-honeypot" aria-hidden="true">
        Website
        <input name="website" value={form.website} onChange={updateField} tabIndex={-1} autoComplete="off" suppressHydrationWarning />
      </label>
      <div className="form-row">
        <label>
          Name
          <input name="name" value={form.name} onChange={updateField} autoComplete="name" required suppressHydrationWarning />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required suppressHydrationWarning />
        </label>
      </div>
      <label>
        Organization
        <input name="organization" value={form.organization} onChange={updateField} autoComplete="organization" suppressHydrationWarning />
      </label>
      <label>
        Project Type
        <select name="projectType" value={form.projectType} onChange={updateField} required suppressHydrationWarning>
          <option value="">Select one</option>
          <option>Documentary video</option>
          <option>Photography</option>
          <option>Event coverage</option>
          <option>Content writing</option>
          <option>Communication campaign</option>
        </select>
      </label>
      <label>
        Project Brief
        <textarea
          name="message"
          value={form.message}
          onChange={updateField}
          rows={5}
          minLength={20}
          maxLength={3000}
          placeholder="Tell us what you need, where it will be used, and the audience you want to reach."
          required
          suppressHydrationWarning
        />
      </label>
      <button className="button primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Project Brief"}
      </button>
      {notice && <p className={`form-notice ${status}`}>{notice}</p>}
    </form>
  );
}
