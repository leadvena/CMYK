import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    name: "Maria Santos",
    text: "Excellent quality tarpaulin prints! The colors were vibrant and delivery was super fast. Highly recommended!",
    rating: 5,
  },
  {
    name: "Juan Dela Cruz",
    text: "Had our team jerseys printed here. The sublimation quality is top-notch and the designs came out perfectly.",
    rating: 5,
  },
  {
    name: "Angela Reyes",
    text: "Great service for our company mugs! Professional finish and they even helped with the design layout.",
    rating: 5,
  },
  {
    name: "Mark Villanueva",
    text: "Very affordable pricing compared to others in the area. Fast turnaround and the quality speaks for itself.",
    rating: 5,
  },
];

import { spring } from "@/lib/motion";

const ReviewsSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow text-yellow" />
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-foreground">
            5.0 Google Rating
          </h2>
          <p className="mt-3 text-muted-foreground">What our customers say</p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={spring}
            className="bg-card rounded-3xl p-8 md:p-12 shadow-base text-center"
          >
            <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center mx-auto mb-6 text-xl font-bold text-foreground">
              {reviews[active].name[0]}
            </div>
            <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
              "{reviews[active].text}"
            </p>
            <p className="mt-6 font-bold text-foreground">{reviews[active].name}</p>
          </motion.div>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === active ? "bg-cyan" : "bg-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
