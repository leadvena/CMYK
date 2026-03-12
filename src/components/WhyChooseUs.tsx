import { motion } from "framer-motion";
import { Award, Zap, DollarSign, Palette } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "High Quality Prints",
    description: "Modern printing equipment and durable materials for results that last.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Quick production for urgent printing jobs — we respect your deadlines.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Competitive local rates without compromising on quality.",
  },
  {
    icon: Palette,
    title: "Creative Design Support",
    description: "Professional layout and design assistance from concept to print.",
  },
];

import { spring } from "@/lib/motion";

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground">
            Why Choose Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card rounded-3xl p-8 shadow-base hover:shadow-hover transition-shadow text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-5">
                <b.icon className="w-7 h-7 text-cyan" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{b.title}</h3>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
