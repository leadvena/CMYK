import { motion } from "framer-motion";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

const items = [
  { image: p1, label: "Event Tarpaulin" },
  { image: p2, label: "Custom Team Shirts" },
  { image: p3, label: "Promotional Mugs" },
  { image: p4, label: "Business Signage" },
  { image: p5, label: "Graphic Design" },
  { image: p6, label: "Birthday Banner" },
];

import { spring } from "@/lib/motion";

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground">
            Our Work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real projects. Real quality. See what we've created.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden group"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-lg font-bold" style={{ color: "white" }}>
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
