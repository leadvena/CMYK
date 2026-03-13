import { motion } from "framer-motion";

import { spring } from "@/lib/motion";

const LocationSection = () => {
  return (
    <section id="location" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground">
            Find Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dela Viña St, Bogo City, Cebu, Philippines
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="rounded-3xl overflow-hidden shadow-base"
        >
          <iframe
            title="CMYK Prints and Designs Services Location"
            src="https://www.google.com/maps?q=11.0520285,124.0051351&z=17&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
