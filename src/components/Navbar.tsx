"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; 
import { spring } from "@/lib/motion";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["services", "portfolio", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToQuote = () => {
    setMobileMenuOpen(false);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const navTextColor = scrolled ? "text-foreground" : "text-white";
  const mutedTextColor = scrolled ? "text-muted-foreground" : "text-white/70";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-background/80 backdrop-blur-xl border-b border-foreground/5 py-3 shadow-sm" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Stylized Logo with Full Name */}
          <a href="#" className="group">
            <div className={`text-2xl font-bold font-display tracking-tighter ${navTextColor} flex items-center leading-none`}>
              CMYK
              <span className="flex ml-1">
                <span className="text-cyan">.</span>
                <span className="text-magenta">.</span>
                <span className="text-yellow">.</span>
                <span className="text-[#333] dark:text-white">.</span> 
              </span>
            </div>
            {/* Full Name Subtitle */}
            <p className={`text-[8px] uppercase tracking-[0.2em] font-bold transition-opacity duration-500 ${scrolled ? "opacity-40" : "opacity-60 text-white"}`}>
              Prints and Designs Services
            </p>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-colors hover:text-cyan relative py-1 ${
                  activeSection === link.href.slice(1) ? navTextColor : mutedTextColor
                }`}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan"
                    transition={spring}
                  />
                )}
              </a>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToQuote}
              className={`px-6 py-2.5 rounded-full text-sm font-extrabold transition-colors shadow-lg ${
                scrolled 
                  ? "bg-foreground text-background hover:bg-cyan hover:text-white" 
                  : "bg-white text-black hover:bg-cyan hover:text-white"
              }`}
            >
              Get a Quote
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 ${navTextColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  CMYK<span className="text-cyan">.</span><span className="text-magenta">.</span><span className="text-yellow">.</span>
                </span>
                <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Prints and Designs</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-bold hover:text-cyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={scrollToQuote}
                className="mt-4 w-full bg-cyan py-4 rounded-2xl text-white font-bold text-xl shadow-xl shadow-cyan/20"
              >
                Request a Quote
              </button>
            </div>
            
            <div className="mt-auto border-t border-foreground/5 pt-8 text-muted-foreground text-sm">
              <p className="font-bold text-foreground">📍 Bogo City, Cebu</p>
              <p>📧 kristaezekiel28@gmail.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;