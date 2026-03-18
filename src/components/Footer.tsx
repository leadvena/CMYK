"use client";

import { motion } from "framer-motion";

const Footer = () => {
  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand & Mission */}
        <div className="lg:col-span-1">
          {/* We keep the stylized logo but put the full name immediately after */}
          <h3 className="text-2xl font-bold font-display text-white tracking-tighter">
            CMYK<span className="text-cyan">.</span>
          </h3>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1 mb-4">
            Prints and Designs Services
          </p>
          <p className="text-white/50 leading-relaxed text-sm">
            The premier choice for <span className="text-white/80">Northern Cebu's</span> printing needs. 
            From motoshops and restaurants to schools and local events.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Navigation</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li><a href="#services" className="hover:text-cyan transition-colors">Our Services</a></li>
            <li><a href="#portfolio" className="hover:text-cyan transition-colors">Portfolio</a></li>
            <li><button onClick={scrollToQuote} className="hover:text-cyan transition-colors text-left">Request a Print Quote</button></li>
            <li><a href="#contact" className="hover:text-cyan transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Specialties */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Specialties</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li>Custom Motoshop Decals</li>
            <li>Restaurant & Cafe Menus</li>
            <li>School Banners & Awards</li>
            <li>T-Shirt & Apparel Printing</li>
            <li>Mugs & Corporate Giveaways</li>
          </ul>
        </div>

        {/* Contact & Location */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Dela Viña St, Bogo City<br />
            Cebu, Philippines 6010
          </p>
          <div className="mt-6">
            <a
              href="https://www.facebook.com/p/Cmyk-Bogo-100082468363439/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-cyan hover:text-white transition-colors group"
            >
              <span className="bg-cyan/10 p-2 rounded-lg group-hover:bg-cyan group-hover:text-black transition-all font-bold">
                FB
              </span>
              Follow our latest works
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar - This is where the FULL legal name is most important */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} CMYK PRINTS AND DESIGNS SERVICES. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-white/30 text-xs">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;