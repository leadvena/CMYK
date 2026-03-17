"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { spring } from "@/lib/motion";
import { X } from "lucide-react";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB per file
const MAX_TOTAL_SIZE = 12 * 1024 * 1024; // 12MB total
const ALLOWED_FILE_TYPES = [
  "image/",
  ".pdf",
  ".ai",
  ".psd",
  ".doc",
  ".docx",
  ".txt",
];

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    let totalSize = uploadedFiles.reduce((sum, f) => sum + f.size, 0);
    const validFiles: File[] = [];

    for (const file of files) {
      // File type validation
      const isValidType = ALLOWED_FILE_TYPES.some((type) =>
        type.endsWith("/") ? file.type.startsWith(type) : file.name.endsWith(type)
      );
      if (!isValidType) {
        toast.error(`File "${file.name}" type is not allowed.`);
        continue;
      }

      // Individual size validation
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File "${file.name}" is too large. Max per file is ${MAX_FILE_SIZE / 1024 / 1024}MB.`
        );
        continue;
      }

      // Total size validation
      if (totalSize + file.size > MAX_TOTAL_SIZE) {
        toast.error(
          `Cannot add "${file.name}". Total upload limit is ${MAX_TOTAL_SIZE / 1024 / 1024}MB.`
        );
        continue;
      }

      validFiles.push(file);
      totalSize += file.size;
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added successfully!`);
    }

    // Reset input so same file can be selected again
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    uploadedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });
    formData.append("fileCount", uploadedFiles.length.toString());

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to send quote request");

      setSubmitted(true);
      toast.success("Quote request sent successfully!");
      form.reset();
      setUploadedFiles([]);
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

            <div className="space-y-3">
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-foreground/10 rounded-xl p-8 text-center hover:bg-foreground/[0.02] transition-colors cursor-pointer"
              >
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.ai,.psd,.doc,.docx,.txt"
                  multiple
                  onChange={handleFileChange}
                />

                <p className="text-muted-foreground text-sm font-medium">
                  Click to upload your design files (optional)
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  Max 8MB per file, 12MB total. Support: Images, PDF, AI, PSD, DOC, TXT
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2 bg-foreground/[0.02] rounded-xl p-4">
                  <p className="text-sm font-medium text-foreground">
                    Uploaded files ({uploadedFiles.length}):
                  </p>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between bg-card rounded-lg p-3 text-sm"
                    >
                      <div className="flex-1">
                        <p className="text-foreground font-medium truncate">{file.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-3 p-1 hover:bg-foreground/10 rounded transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                {isSubmitting ? "Sending..." : "Request a Print Quote"}
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