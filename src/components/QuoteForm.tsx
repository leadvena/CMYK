"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { spring } from "@/lib/motion";
import { X, CheckCircle2, UploadCloud, FileText, Info } from "lucide-react";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const MAX_TOTAL_SIZE = 12 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/", ".pdf", ".ai", ".psd", ".doc", ".docx", ".txt"];

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
        toast.error(`File "${file.name}" type is not supported.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" is too large (Max 8MB).`);
        continue;
      }
      if (totalSize + file.size > MAX_TOTAL_SIZE) {
        toast.error(`Total limit (12MB) reached.`);
        break;
      }
      validFiles.push(file);
      totalSize += file.size;
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) attached.`);
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

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        setUploadProgress(Math.round((event.loaded / event.total) * 100));
      }
    });

    xhr.onload = () => {
      setIsSubmitting(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        setSubmitted(true);
        setUploadedFiles([]);
      } else {
        toast.error("Submission failed. Please try again.");
      }
    };

    xhr.onerror = () => {
      setIsSubmitting(false);
      toast.error("Network error occurred.");
    };

    xhr.open("POST", "/api/send-quote");
    xhr.send(formData);
  };

  const inputClass = "w-full bg-surface border border-foreground/10 rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 focus:ring-cyan/20 focus:border-cyan text-foreground placeholder:text-muted-foreground font-medium";

  if (submitted) {
    return (
      <section id="quote" className="py-24 px-6 bg-surface">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-[40px] p-12 shadow-2xl border border-cyan/10">
            <div className="w-20 h-20 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="text-cyan w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold">Project Received!</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Thanks for reaching out to **CMYK Prints and Designs Services**. 
              We'll review your details and send your quote via email/phone shortly.
            </p>
            <button onClick={() => setSubmitted(false)} className="mt-8 px-8 py-3 bg-foreground text-background rounded-full font-bold hover:bg-cyan hover:text-white transition-colors">
              Submit Another Project
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5">
          <span className="text-cyan font-bold tracking-widest uppercase text-sm">Get a Quote</span>
          <h2 className="text-5xl font-bold tracking-tighter mt-4 leading-[1.1]">
            Ready to bring your <span className="text-cyan">vision</span> to life?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Whether it's a single mug for a gift or 500 shirts for a school event, 
            we provide the highest quality prints in Northern Cebu.
          </p>
          
          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Quick Turnaround</h4>
                <p className="text-xs text-muted-foreground mt-1">Most small orders are ready in 24-48 hours.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-card rounded-[32px] p-8 md:p-10 shadow-xl border border-foreground/5 space-y-8">
            
            {/* Step 1: Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-cyan rounded-full" />
                <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">Client Information</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" required placeholder="Contact Person / Shop Name" className={inputClass} />
                <input name="phone" required placeholder="Phone Number" className={inputClass} />
              </div>
              <input name="email" type="email" required placeholder="Email Address" className={inputClass} />
            </div>

            {/* Step 2: Project Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-magenta rounded-full" />
                <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">Project Details</h3>
              </div>
              <select name="service" required className={inputClass} defaultValue="">
                <option value="" disabled>Select Primary Service</option>
                <option>Tarpaulin & Large Format</option>
                <option>Custom Apparel (T-Shirts/Uniforms)</option>
                <option>Restaurant Menus & Signage</option>
                <option>Motoshop Decals & Stickers</option>
                <option>Mugs & Souvenirs</option>
                <option>Graphic Design & Branding</option>
                <option>School/Office Supplies</option>
              </select>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="size" placeholder="Dimensions (e.g. 2x3ft)" className={inputClass} />
                <input name="quantity" type="number" min="1" placeholder="Quantity" className={inputClass} />
              </div>
            </div>

            {/* Step 3: Files */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-yellow rounded-full" />
                <h3 className="font-bold text-sm uppercase tracking-wider opacity-60">Design Assets</h3>
              </div>
              <div
                onClick={() => !isSubmitting && fileRef.current?.click()}
                className={`group border-2 border-dashed border-foreground/10 rounded-2xl p-10 text-center transition-all cursor-pointer ${
                  isSubmitting ? 'opacity-40 cursor-not-allowed' : 'hover:border-cyan hover:bg-cyan/[0.02]'
                }`}
              >
                <input ref={fileRef} type="file" className="hidden" accept={ALLOWED_FILE_TYPES.join(',')} multiple onChange={handleFileChange} />
                <div className="w-14 h-14 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7 text-muted-foreground group-hover:text-cyan" />
                </div>
                <p className="font-bold text-sm">Click to upload your design</p>
                <p className="text-xs text-muted-foreground mt-2 italic">Supports: JPG, PNG, PDF, AI, PSD (Max 12MB)</p>
              </div>

              {/* Progress & Files List */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-cyan animate-pulse">UPLOADING...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-cyan" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} />
                    </div>
                  </motion.div>
                )}
                {uploadedFiles.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 gap-2 pt-2">
                    {uploadedFiles.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-surface border border-foreground/5 p-3 rounded-lg">
                        <div className="flex items-center gap-3 truncate">
                          <FileText className="w-4 h-4 text-cyan" />
                          <span className="text-xs font-medium truncate">{file.name}</span>
                        </div>
                        <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <textarea name="message" rows={3} placeholder="Tell us more about your request (Material type, finish, deadline...)" className={inputClass + " resize-none"} />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="w-full h-16 bg-foreground text-background rounded-2xl font-black text-lg flex items-center justify-center relative overflow-hidden group disabled:opacity-50"
            >
              <span className="relative z-10">{isSubmitting ? "PROCESSING..." : "GET MY QUOTE"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan via-magenta to-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteForm;