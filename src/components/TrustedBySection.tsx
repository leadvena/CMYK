import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

const brands = [
  { name: "Local News Agency", logo: "📰" },
  { name: "Event Management Co.", logo: "🎯" },
  { name: "Corporate Design Firm", logo: "🎨" },
  { name: "Fashion Boutique", logo: "👗" },
  { name: "Restaurant & Cafe", logo: "☕" },
  { name: "Tourism Board", logo: "🌍" },
];

const TrustedBySection = () => {
  return (
    <section className="py-20 px-6 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-12"
        >
          <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-muted-foreground mb-2">
            Trusted By
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-foreground">
            Trusted by Leading Brands in Bogo City
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card hover:shadow-base transition-shadow group cursor-pointer"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {brand.logo}
              </div>
              <p className="text-sm font-medium text-foreground text-center text-pretty">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Join hundreds of satisfied clients who trust us with their printing and design needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
