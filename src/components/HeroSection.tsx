import { motion } from "framer-motion";
import heroImg from "@/assets/hero-printer.jpg";
import { Star, Zap, DollarSign } from "lucide-react";
import { spring } from "@/lib/motion";

const HeroSection = () => {
  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Large format printer producing vibrant CMYK banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance tracking-[-0.04em]"
          style={{ color: "white" }}
        >
          Premium Printing & Design in Bogo City
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl max-w-2xl text-pretty leading-relaxed"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Tarpaulin printing, custom shirts, mugs, and professional graphic design — all crafted with precision and care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            onClick={scrollToQuote}
            className="px-8 py-4 rounded-full font-bold text-lg shadow-base hover:shadow-cyan-glow transition-shadow"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Request a Quote
          </motion.button>

          <motion.a
            href="https://www.facebook.com/p/Cmyk-Bogo-100082468363439/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            className="px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md text-center"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
          >
            Chat on Facebook
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          <span className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow text-yellow" />
            5.0 Rating
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Fast Turnaround
          </span>
          <span className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Affordable Pricing
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
