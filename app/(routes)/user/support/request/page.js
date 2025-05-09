"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!subject.trim() || !message.trim()) {
      setError("Both subject and message are required");
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create request");
      router.push("/user/support"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-[#F8F8F8] p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">New Support Request</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {/*Email*/}
      <div className="mb-6 text-sm text-center">
        Or email us directly at{" "}
        <a
          href="mailto:devtools.support@example.com"
          className="text-[#ff4500] hover:underline"
        >
          devtools.support@example.com
        </a>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            placeholder="Issue subject – Company Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Short description of the issue..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#FF4500] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Submitting…" : "Submit Request"}
        </button>
      </form>
    </div>
  );
}