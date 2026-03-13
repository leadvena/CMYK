"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { spring } from "@/lib/motion";

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  // FIX: store form in a separate variable BEFORE awaiting anything
  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const res = await fetch("/api/send-quote", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to send quote request");

    setSubmitted(true);
    toast.success("Quote request sent successfully!");

    // RESET the stored form, not e.currentTarget
    form.reset();
    setFileName("");
  } catch (err) {
    console.error("Submit error:", err);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  if (submitted) {
    return (
      <section id="quote" className="py-24 px-6 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="bg-card rounded-[32px] p-12 shadow-hover"
          >
            <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Thank you!</h3>
            <p className="mt-3 text-muted-foreground">
              Your quote request has been sent. Our team will contact you shortly.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full bg-surface rounded-xl px-4 py-3 outline-none transition-shadow focus:shadow-[0_0_0_2px_hsl(var(--cyan))] text-foreground placeholder:text-muted-foreground font-body";

  return (
    <section id="quote" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="lg:col-span-5"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground">
            Let's build something.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
            Get a precise quote in hours, not days. Tell us what you need and we'll get back to you with pricing and timelines.
          </p>
          <div className="mt-8 space-y-3 text-sm text-muted-foreground">
            <p>📧 kristaezekiel28@gmail.com</p>
            <p>📍 Dela Viña St, Bogo City, Cebu</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-[32px] p-8 shadow-hover space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input name="name" required placeholder="Full Name" className={inputClass} />
              <input name="phone" required placeholder="Phone Number" className={inputClass} />
            </div>

            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className={inputClass}
            />

            <select name="service" required className={inputClass} defaultValue="">
              <option value="" disabled>Select a Service</option>
              <option>Tarpaulin Printing</option>
              <option>T-Shirt Printing</option>
              <option>Mug Printing</option>
              <option>Graphic Design</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input name="size" placeholder="Size (optional)" className={inputClass} />
              <input
                name="quantity"
                type="number"
                min="1"
                placeholder="Quantity"
                className={inputClass}
              />
            </div>

            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-foreground/10 rounded-xl p-8 text-center hover:bg-foreground/[0.02] transition-colors cursor-pointer"
            >
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf,.ai,.psd"
                name="file"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />

              <p className="text-muted-foreground text-sm">
                {fileName || "Click to upload your design file (optional)"}
              </p>
            </div>

            <textarea
              name="message"
              rows={3}
              placeholder="Additional message or instructions..."
              className={inputClass + " resize-none"}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={spring}
              className="w-full bg-foreground text-background rounded-xl py-4 font-bold text-lg relative overflow-hidden group disabled:opacity-50"
            >
              <span className="relative z-10 group-hover:text-foreground transition-colors">
                {isSubmitting ? "Sending..." : "Get My Quote"}
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-cyan via-magenta to-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteForm;