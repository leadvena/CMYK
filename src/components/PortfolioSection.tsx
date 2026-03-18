"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spring } from "@/lib/motion";
import ImageModal from "./ImageModal";
import { LayoutGrid, Camera, Shirt, Palette, PenTool } from "lucide-react";

// Portfolio images (using your imports)
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";
import p7 from "@/assets/portfolio-7.jpg";
import p8 from "@/assets/portfolio-8.jpg";
import p9 from "@/assets/portfolio-9.jpg";
import p10 from "@/assets/portfolio-10.jpg";
import p11 from "@/assets/portfolio-11.jpg";
import p12 from "@/assets/portfolio-12.jpg";

const categories = [
  { id: "all", label: "All Work", icon: LayoutGrid },
  { id: "print", label: "Large Format", icon: Camera },
  { id: "apparel", label: "Apparel", icon: Shirt },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "design", label: "Digital Art", icon: PenTool },
];

const items = [
  { image: p1, label: "Event Tarpaulin", cat: "print" },
  { image: p2, label: "Custom Team Shirts", cat: "apparel" },
  { image: p3, label: "Promotional Mugs", cat: "branding" },
  { image: p4, label: "Business Signage", cat: "print" },
  { image: p5, label: "Graphic Design", cat: "design" },
  { image: p6, label: "Commemorative Banner", cat: "print" },
  { image: p7, label: "Logo Design", cat: "design" },
  { image: p8, label: "Menu Design", cat: "branding" },
  { image: p9, label: "Event Backdrop", cat: "print" },
  { image: p10, label: "Refrigerator Magnets", cat: "branding" },
  { image: p11, label: "Business Cards", cat: "branding" },
  { image: p12, label: "Sublimated Shirts", cat: "apparel" },
];

const PortfolioSection = () => {
  const [filter, setFilter] = useState("all");

  const filteredItems = items.filter(
    (item) => filter === "all" || item.cat === filter
  );

  return (
    <section id="portfolio" className="py-32 px-6 bg-surface relative overflow-hidden">
      {/* Decorative CMYK Blur */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-magenta/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={spring}
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">
              Vibrant <span className="text-cyan">Solutions.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-md">
              A showcase of premium prints and digital designs crafted for the Bogo City community.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  filter === cat.id
                    ? "bg-foreground text-background shadow-lg shadow-foreground/10"
                    : "bg-background border border-foreground/5 text-muted-foreground hover:border-cyan/30"
                }`}
              >
                <cat.icon className={`w-4 h-4 ${filter === cat.id ? "text-cyan" : ""}`} />
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Layout with Animation */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="break-inside-avoid"
              >
                <ImageModal image={item.image} alt={item.label} title={item.label}>
                  <div className="relative rounded-[2rem] overflow-hidden group cursor-pointer bg-card border border-foreground/5 shadow-sm hover:shadow-2xl hover:shadow-cyan/10 transition-all duration-500">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan mb-2 block">
                          {categories.find(c => c.id === item.cat)?.label}
                        </span>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {item.label}
                        </h3>
                      </motion.div>
                    </div>

                    {/* Quick Info Tag (Visible on Mobile/No-Hover) */}
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 opacity-100 group-hover:opacity-0 transition-opacity">
                       <p className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest">
                          View Case
                       </p>
                    </div>
                  </div>
                </ImageModal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;