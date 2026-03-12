import { motion } from "framer-motion";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";

import { spring } from "@/lib/motion";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground">
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: Mail, label: "Email", value: "kristaezekiel28@gmail.com", href: "mailto:kristaezekiel28@gmail.com" },
            { icon: MessageCircle, label: "Messenger", value: "CMYK Bogo on Facebook", href: "https://www.facebook.com/p/Cmyk-Bogo-100082468363439/" },
            { icon: MapPin, label: "Address", value: "Dela Viña St, Bogo City, Cebu", href: undefined },
            { icon: Clock, label: "Hours", value: "Mon–Sat: 8AM – 6PM", href: undefined },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="bg-card rounded-3xl p-6 shadow-base flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-cyan transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-semibold text-foreground">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
