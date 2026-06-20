"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/lib/data";

type FormState = "idle" | "sending" | "sent";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".contact-reveal"),
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 2000));
    setFormState("sent");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormState("idle"), 5000);
  };

  return (
    <section id="contact" ref={ref} className="section-muted py-20 md:py-28 md:pl-[38%] lg:pl-[36%]">
      <div className="section-wrap">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeader
              index="04 — Contact"
              title="Let's work together"
              description="Open to full-time roles, contract work, and consulting on backend architecture."
              className="contact-reveal invisible"
            />

            <div className="space-y-4">
              {[
                { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { label: "Phone", value: siteConfig.phone },
                { label: "Location", value: siteConfig.location },
              ].map((item) => (
                <div key={item.label} className="contact-reveal surface-card invisible flex items-center justify-between p-5">
                  <span className="text-sm text-ink-faint">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-ink-heading hover:text-brand-dark">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-ink-heading">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-reveal surface-card invisible space-y-5 p-7 lg:col-span-3 lg:p-9"
          >
            {(["name", "email"] as const).map((field) => (
              <div key={field}>
                <label htmlFor={field} className="mb-2 block text-sm font-medium text-ink-heading">
                  {field === "name" ? "Name" : "Email"}
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  required
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
                  placeholder={field === "name" ? "Your name" : "you@company.com"}
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-heading">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
                placeholder="Tell me about your project..."
              />
            </div>

            {formState === "sent" ? (
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Message sent — I&apos;ll reply soon.
              </p>
            ) : (
              <MagneticButton type="submit" disabled={formState === "sending"}>
                {formState === "sending" ? "Sending..." : "Send message"}
              </MagneticButton>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
