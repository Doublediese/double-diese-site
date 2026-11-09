import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConseilSection from "@/components/ConseilSection";
import MediaSection from "@/components/MediaSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ConseilSection />
      <MediaSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
