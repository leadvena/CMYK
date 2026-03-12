import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import QuoteForm from "@/components/QuoteForm";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MessengerButton from "@/components/MessengerButton";
import StickyQuoteMobile from "@/components/StickyQuoteMobile";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <WhyChooseUs />
      <QuoteForm />
      <ReviewsSection />
      <LocationSection />
      <ContactSection />
      <Footer />
      <MessengerButton />
      <StickyQuoteMobile />
    </div>
  );
};

export default Index;
