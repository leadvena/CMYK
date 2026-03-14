'use client';

import { useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageModalProps {
  children: ReactNode;
  image: string;
  alt: string;
  title?: string;
}

const ImageModal = ({ children, image, alt, title }: ImageModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger - the children element */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {/* Modal Content */}
      <DialogContent className="max-w-4xl w-full border-0 bg-transparent shadow-none p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-10 right-0 z-50 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div className="relative rounded-lg overflow-hidden bg-black">
            <img
              src={image}
              alt={alt}
              className="w-full h-auto max-h-[80vh] object-cover"
            />
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-lg font-semibold">{title}</p>
              </div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
