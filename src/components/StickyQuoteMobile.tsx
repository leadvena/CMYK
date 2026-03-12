import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyQuoteMobile = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    const el = document.getElementById("quote");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 w-full bg-card border-t border-foreground/5 p-4 z-40 lg:hidden"
        >
          <button
            onClick={scrollToQuote}
            className="w-full bg-foreground text-background rounded-xl py-3.5 font-bold text-base"
          >
            Request a Quote
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyQuoteMobile;
