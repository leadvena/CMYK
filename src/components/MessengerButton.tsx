import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const MessengerButton = () => {
  return (
    <motion.a
      href="https://www.facebook.com/p/Cmyk-Bogo-100082468363439/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 400, damping: 30 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: "#0084FF" }}
      title="Chat with us on Facebook"
    >
      <MessageCircle className="w-6 h-6" style={{ color: "white" }} />
    </motion.a>
  );
};

export default MessengerButton;
