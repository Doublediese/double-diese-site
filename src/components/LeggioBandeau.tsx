import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { leggio } from "@/data/leggio";

/** Bandeau d'accueil entre Conseil et Médias : fait le pont vers la page Leggio. */
const LeggioBandeau = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const base = import.meta.env.BASE_URL;

  return (
    <section id="leggio" className="py-20 md:py-24 bg-noir text-ivory" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        <img src={`${base}leggio/leggio-blanc-or.svg`} alt="Leggio" className="w-52 md:w-64 shrink-0" />
        <div className="text-center md:text-left">
          <p className="font-serif italic text-xl md:text-2xl text-ivory/90 mb-4">{leggio.baseline}</p>
          <p className="font-body text-lg text-ivory/70 mb-8">{leggio.bandeau.texte}</p>
          <Link
            to="/leggio"
            onClick={() => window.scrollTo({ top: 0 })}
            className="btn-elegant border-primary text-primary hover:bg-primary hover:text-noir gap-2"
          >
            {leggio.bandeau.lien}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default LeggioBandeau;
