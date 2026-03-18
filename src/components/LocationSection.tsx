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
            // Updated with the specific place coordinate embed
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.146522434151!2d124.00287877587422!3d11.052008789114383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x330669120c1655f1%3A0x3b460376b6511a85!2sCMYK%20Prints%20and%20Designs%20Services%20-%20BOGO%20CITY!5e0!3m2!1sen!2sph!4v1710750000000!5m2!1sen!2sph"
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