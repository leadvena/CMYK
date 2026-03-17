"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { spring } from "@/lib/motion";
import { X, CheckCircle2, UploadCloud } from "lucide-react";

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
  const [uploadProgress, setUploadProgress] = useState(0); // Track progress
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    let totalSize = uploadedFiles.reduce((sum, f) => sum + f.size, 0);
    const validFiles: File[] = [];

    for (const file of files) {
      const isValidType = ALLOWED_FILE_TYPES.some((type) =>
        type.endsWith("/") ? file.type.startsWith(type) : file.name.toLowerCase().endsWith(type)
      );
      if (!isValidType) {
        toast.error(`File "${file.name}" type is not allowed.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" is too large (Max 8MB).`);
        continue;
      }

      if (totalSize + file.size > MAX_TOTAL_SIZE) {
        toast.error(`Total upload limit (12MB) reached.`);
        continue;
      }

      validFiles.push(file);
      totalSize += file.size;
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added.`);
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(0);

    const form = e.currentTarget;
    const formData = new FormData(form);

    uploadedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });
    formData.append("fileCount", uploadedFiles.length.toString());

    // Using XMLHttpRequest for progress tracking
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    });

    xhr.onload = () => {
      setIsSubmitting(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        setSubmitted(true);
        toast.success("Quote request sent!");
        setUploadedFiles([]);
      } else {
        toast.error("Failed to send quote. Please try again.");
      }
    };

    xhr.onerror = () => {
      setIsSubmitting(false);
      toast.error("An error occurred during upload.");
    };

    xhr.open("POST", "/api/send-quote");
    xhr.send(formData);
  };

  if (submitted) {
    return (
      <section id="quote" className="py-24 px-6 bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
            className="bg-card rounded-[32px] p-12 shadow-hover border border-foreground/5"
          >
            <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-cyan w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Thank you!</h3>
            <p className="mt-3 text-muted-foreground">
              Your quote request has been sent. We'll get back to you shortly.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 text-cyan font-medium hover:underline"
            >
              Send another request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full bg-surface rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-cyan/50 border border-transparent focus:border-cyan text-foreground placeholder:text-muted-foreground font-body";

  return (
    <section id="quote" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Let's build <span className="text-cyan">something.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Tell us what you need and we'll get back to you with pricing and timelines.
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
          className="lg:col-span-7"
        >
          <form onSubmit={handleSubmit} className="bg-card rounded-[32px] p-8 shadow-hover space-y-5 border border-foreground/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input name="name" required placeholder="Full Name" className={inputClass} />
              <input name="phone" required placeholder="Phone Number" className={inputClass} />
            </div>

            <input name="email" type="email" required placeholder="Email Address" className={inputClass} />

            <select name="service" required className={inputClass} defaultValue="">
              <option value="" disabled>Select a Service</option>
              <option>Tarpaulin Printing</option>
              <option>T-Shirt Printing</option>
              <option>Mug Printing</option>
              <option>Graphic Design</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input name="size" placeholder="Size (optional)" className={inputClass} />
              <input name="quantity" type="number" min="1" placeholder="Quantity" className={inputClass} />
            </div>

            <div className="space-y-3">
              <div
                onClick={() => !isSubmitting && fileRef.current?.click()}
                className={`border-2 border-dashed border-foreground/10 rounded-xl p-8 text-center transition-colors cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan/5 hover:border-cyan/50'}`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.ai,.psd,.doc,.docx,.txt"
                  multiple
                  onChange={handleFileChange}
                />
                <UploadCloud className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground text-sm font-medium">Click to upload design files (optional)</p>
                <p className="text-muted-foreground text-xs mt-1">Max 12MB total</p>
              </div>

              {/* Progress Bar */}
              {isSubmitting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-cyan">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-foreground/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="bg-cyan h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* File List */}
              <AnimatePresence>
                {uploadedFiles.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 bg-foreground/[0.02] rounded-xl p-4 overflow-hidden"
                  >
                    {uploadedFiles.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex items-center justify-between bg-card border border-foreground/5 rounded-lg p-3 text-sm">
                        <span className="truncate flex-1 font-medium">{file.name}</span>
                        <button type="button" onClick={() => removeFile(index)} className="ml-3 p-1 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <textarea
              name="message"
              rows={3}
              placeholder="Additional instructions..."
              className={inputClass + " resize-none"}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-foreground text-background rounded-xl py-4 font-bold text-lg relative overflow-hidden group disabled:opacity-50"
            >
              <span className="relative z-10 group-hover:text-cyan transition-colors">
                {isSubmitting ? "Uploading Files..." : "Request a Print Quote"}
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