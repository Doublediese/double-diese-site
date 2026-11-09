import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-concert.jpg";

const HeroSection = () => {
  const { hero } = siteContent;

  const scrollToNext = () => {
    const element = document.querySelector("#conseil");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Salle de concert"
          className="w-full h-full object-cover"
        />
        {/* Overlay with golden tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-noir/50 to-noir/70" />
        {/* Subtle golden glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-primary/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center">
        {/* Double diese symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="text-primary text-5xl md:text-6xl font-serif">𝄪</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl text-ivory font-medium leading-tight mb-6 max-w-4xl mx-auto"
        >
          {hero.headline}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-24 h-px bg-primary mx-auto mb-6"
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl text-ivory/90 max-w-2xl mx-auto mb-10 drop-shadow-[0_1px_8px_rgba(200,164,92,0.15)]"
        >
          Stratégie et outils pour la musique classique,
          <br />
          de la salle de réunion à la salle de concert.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={scrollToNext}
          className="btn-elegant border-ivory/50 text-ivory hover:bg-ivory hover:text-noir"
        >
          {hero.ctaText}
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/60 hover:text-primary transition-colors"
        aria-label="Défiler vers le bas"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
