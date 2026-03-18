"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

// 1. Update your brand data with image paths. 
// Make sure these images are located in your /public/brands/ folder.
const brands = [
  { name: "GWADDY'S UNLIMITED TUSLO BUWA + PUNGKO PUNGKO", logo: "/brands/1.png" },
  { name: "FAITH CAR RENTAL", logo: "/brands/2.png" },
  { name: "BAKHAW RESTAURANT", logo: "/brands/3.png" },
  { name: "JACKIE'S FOOTWEAR SHOP", logo: "/brands/4.png" },
  { name: "CHERYLL SWEET TREATS ", logo: "/brands/5.png" },
  { name: "KNOAH MARI", logo: "/brands/6.jpg" },
  { name: "KOBE MOTORPARTS & ACCESSORIES", logo: "/brands/7.jpg" },
];

const TrustedBySection = () => {
  // We double the array to ensure there's always content visible during the loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    
    <section id="partners" className="py-20 bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-12"
        >
          <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-muted-foreground mb-2">
  Our Growing Community
</p>
<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
  Trusted by Businesses Across <span className="text-cyan">Northern Cebu</span> and Beyond
</h2>
        </motion.div>
      </div>

      {/* Outer Container with Masking Gradient */}
      <div className="relative flex overflow-hidden py-8">
        {/* Gradient masks on the sides for a smooth "fade-in/out" effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"], 
          }}
          transition={{
            duration: 35, // Slower duration (35s) feels more premium for images
            ease: "linear",
            repeat: Infinity,
          }}
          // This allows users to stop the scroll to see a specific brand
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedBrands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex items-center gap-6 mx-12 group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-32 h-16 md:w-44 md:h-20 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-w-full max-h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              
              {/* Brand Name */}
              <span className="text-lg font-bold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.5 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          Join hundreds of satisfied clients who trust us with their printing and design needs.
        </motion.p>
      </div>
    </section>
  );
};

export default TrustedBySection;