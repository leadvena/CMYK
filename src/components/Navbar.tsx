import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-base" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold font-display" style={{ color: scrolled ? "hsl(var(--foreground))" : "white" }}>
          CMYK<span className="text-cyan"> Prints</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Services", "Portfolio", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-cyan"
              style={{ color: scrolled ? "hsl(var(--muted-foreground))" : "rgba(255,255,255,0.8)" }}
            >
              {link}
            </a>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToQuote}
            className="px-5 py-2.5 rounded-full text-sm font-bold bg-cyan"
            style={{ color: "white" }}
          >
            Get a Quote
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
