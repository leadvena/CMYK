import { motion } from "framer-motion";
import tarpImg from "@/assets/service-tarpaulin.jpg";
import shirtImg from "@/assets/service-tshirt.jpg";
import mugImg from "@/assets/service-mug.jpg";
import designImg from "@/assets/service-design.jpg";

const services = [
  {
    title: "Tarpaulin Printing",
    description: "Large-format banners for events, campaigns, and businesses. Durable, weather-resistant, and vibrant.",
    image: tarpImg,
  },
  {
    title: "T-Shirt Printing / Sublimation",
    description: "High-quality custom shirts for teams, brands, and events. Full-color sublimation that lasts.",
    image: shirtImg,
  },
  {
    title: "Mug Printing",
    description: "Personalized mugs perfect for gifts, souvenirs, and promotions. Dishwasher-safe sublimation.",
    image: mugImg,
  },
  {
    title: "Graphic Design Services",
    description: "Logos, layouts, tarpaulin designs, and marketing materials crafted by professionals.",
    image: designImg,
  },
];

import { spring } from "@/lib/motion";

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From large-format banners to personalized gifts — we bring your vision to life with precision and quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-card rounded-[32px] p-3 shadow-base hover:shadow-hover transition-shadow group"
            >
              <div className="h-64 w-full rounded-[20px] overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
