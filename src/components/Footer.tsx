const Footer = () => {
  const scrollToQuote = () => {
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black-ink py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold font-display" style={{ color: "white" }}>
            CMYK<span className="text-cyan"> Prints</span>
          </h3>
          <p className="mt-3 leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Premium printing and design services in Bogo City, Cebu. Tarpaulins, custom apparel, mugs, and professional graphic design.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4" style={{ color: "white" }}>Quick Links</h4>
          <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            <li><a href="#services" className="hover:text-cyan transition-colors">Services</a></li>
            <li><a href="#portfolio" className="hover:text-cyan transition-colors">Portfolio</a></li>
            <li><button onClick={scrollToQuote} className="hover:text-cyan transition-colors">Get a Quote</button></li>
            <li><a href="#contact" className="hover:text-cyan transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4" style={{ color: "white" }}>Address</h4>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Dela Viña St<br />
            Bogo City, Cebu<br />
            Philippines
          </p>
          <a
            href="https://www.facebook.com/p/Cmyk-Bogo-100082468363439/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-cyan hover:underline"
          >
            Facebook Page →
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        © {new Date().getFullYear()} CMYK Prints and Design Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
