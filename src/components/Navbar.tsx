"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; 
import { spring } from "@/lib/motion";

const navLinks = [
  { name: "Services", href: "services" },
  { name: "Portfolio", href: "portfolio" },
  { name: "Partners", href: "partners" },
  { name: "Contact", href: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      // 1. Clear active state if at the very top (Hero section)
      if (scrollY < 200) {
        setActiveSection("");
        return;
      }

      const sections = ["services", "portfolio", "partners", "quote", "contact"];

      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Detect section when it hits the top 20% of the viewport
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (current) {
        // 2. If the section is 'quote', we set active to "" so NO link highlights.
        if (current === "quote") {
          setActiveSection("");
        } else {
          setActiveSection(current);
        }
      } 
      
      // 3. Logic for the absolute bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      
      if (isAtBottom) {
        // Check if the element at the bottom is actually 'quote'
        // If it is, we still want nothing highlighted.
        const bottomEl = document.getElementById("quote");
        const isQuoteAtBottom = bottomEl && bottomEl.getBoundingClientRect().top < window.innerHeight;

        if (isQuoteAtBottom) {
          setActiveSection(""); 
        } else {
          setActiveSection("contact");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    
    // 3. Map 'contact' link clicks to the '#quote' element ID
    const targetId = id === "contact" ? "quote" : id;
    const element = document.getElementById(targetId);
    
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("");
    setMobileMenuOpen(false);
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
          <a href="#" onClick={scrollToTop} className="group">
            <div className={`text-2xl font-bold font-display tracking-tighter ${navTextColor} flex items-center leading-none`}>
              CMYK
              <span className="flex ml-1">
                <span className="text-cyan">.</span>
                <span className="text-magenta">.</span>
                <span className="text-yellow">.</span>
                <span className="text-[#333] dark:text-white">.</span> 
              </span>
            </div>
            <p className={`text-[8px] uppercase tracking-[0.2em] font-bold transition-opacity duration-500 ${scrolled ? "opacity-40" : "opacity-60 text-white"}`}>
              Prints and Designs Services
            </p>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-bold transition-colors hover:text-cyan relative py-1 ${
                    isActive ? navTextColor : mutedTextColor
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan"
                      transition={spring}
                    />
                  )}
                </a>
              );
            })}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleNavClick(e, "quote")}
              className={`px-6 py-2.5 rounded-full text-sm font-extrabold transition-colors shadow-lg ${
                scrolled 
                  ? "bg-foreground text-background hover:bg-cyan hover:text-white" 
                  : "bg-white text-black hover:bg-cyan hover:text-white"
              }`}
            >
              Get a Quote
            </motion.button>
          </div>

          <button 
            className={`md:hidden p-2 ${navTextColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

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
              <button onClick={scrollToTop} className="flex flex-col text-left">
                <span className="text-2xl font-bold text-foreground">
                  CMYK<span className="text-cyan">.</span><span className="text-magenta">.</span><span className="text-yellow">.</span>
                </span>
                <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest text-foreground">Prints and Designs</span>
              </button>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8 text-foreground" /></button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-4xl font-bold hover:text-cyan transition-colors text-foreground"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={(e) => handleNavClick(e, "quote")}
                className="mt-4 w-full bg-cyan py-4 rounded-2xl text-white font-bold text-xl shadow-xl shadow-cyan/20"
              >
                Request a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;