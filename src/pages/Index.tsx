import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConseilSection from "@/components/ConseilSection";
import DaCapoBandeau from "@/components/DaCapoBandeau";
import MediaSection from "@/components/MediaSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  // Arrivée depuis une autre page sur /#section : défiler jusqu'à la section
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ConseilSection />
      <DaCapoBandeau />
      <MediaSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
