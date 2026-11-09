import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { siteContent } from "@/data/content";
import thibaultPhoto from "@/assets/thibault-crop.jpg";

const AboutSection = () => {
  const { about } = siteContent;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <section id="a-propos" className="py-24 md:py-32 bg-card" ref={ref}>
      <div className="container max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">
            {about.title}
          </h2>
          <div className="w-12 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-14"
        >
          {/* Photo */}
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg flex-shrink-0">
            <img
              src={about.photo || thibaultPhoto}
              alt={about.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-1">
              {about.name}
            </h3>
            <p className="text-primary text-sm font-body tracking-wide uppercase mb-4">
              {about.role}
            </p>
            <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">
              {about.bio}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
