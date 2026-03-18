"use client";

import { motion } from "framer-motion";
import heroImg from "@/assets/hero-printer.jpg";
import { Star, Zap, ShieldCheck, ChevronDown } from "lucide-react";
import { spring } from "@/lib/motion";

const HeroSection = () => {
  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with optimized overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="High-quality CMYK Printing"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto">
{/* Animated Verified Badge */}
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ ...spring, delay: 0.1 }}
  className="mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-3 group hover:border-cyan/30 transition-colors cursor-default"
>
  <div className="flex -space-x-2">
    {/* These represents the 'dots' of your CMYK logo in a mini version */}
    <div className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_#00FFFF]" />
    <div className="w-2 h-2 rounded-full bg-magenta shadow-[0_0_8px_#FF00FF]" />
    <div className="w-2 h-2 rounded-full bg-yellow shadow-[0_0_8px_#FFFF00]" />
  </div>
  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/80">
    Trusted Printing Partner <span className="text-white/30 mx-1">|</span> Bogo City
  </span>
</motion.div>

        {/* Main Headline with CMYK styling */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter"
        >
          PRINTS <span className="text-cyan">&</span> <br />
          <span className="relative">
            DESIGNS
            <svg className="absolute -bottom-2 left-0 w-full h-2 overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
               <motion.path 
                 d="M0 5 Q 25 0, 50 5 T 100 5" 
                 fill="transparent" 
                 stroke="url(#cmyk-gradient)" 
                 strokeWidth="4"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 1.5, delay: 1 }}
               />
               <defs>
                 <linearGradient id="cmyk-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#00FFFF" />
                   <stop offset="50%" stopColor="#FF00FF" />
                   <stop offset="100%" stopColor="#FFFF00" />
                 </linearGradient>
               </defs>
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.35 }}
          className="mt-10 text-lg md:text-xl max-w-2xl text-white/60 leading-relaxed font-medium"
        >
          From vibrant <span className="text-white">tarpaulins</span> and 
          <span className="text-white"> custom apparel</span> to professional 
          <span className="text-white"> graphic design</span>. We bring premium 
          visual solutions to Northern Cebu.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToQuote}
            className="group px-10 py-5 bg-white text-black rounded-2xl font-black text-lg shadow-2xl hover:bg-cyan hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            Start Your Project
            <Zap className="w-5 h-5 fill-current transition-transform group-hover:rotate-12" />
          </motion.button>

          <motion.button
            onClick={scrollToServices}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
          >
            Explore Services
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6"
        >
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
              <Star className="w-5 h-5 fill-cyan text-cyan" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm leading-none tracking-tight">5.0 Star Service</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Local Favorite</p>
            </div>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-magenta/20 transition-colors">
              <ShieldCheck className="w-5 h-5 text-magenta" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm leading-none tracking-tight">Premium Quality</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Guaranteed Prints</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden lg:block"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;