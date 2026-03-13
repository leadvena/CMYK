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
            title="CMYK Prints Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3919.0!2d124.00506603153785!3d11.05201895488637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1710000000000"
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
