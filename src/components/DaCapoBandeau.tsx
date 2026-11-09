import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { daCapo } from "@/data/dacapo";

/** Bandeau d'accueil entre Conseil et Médias : fait le pont vers la page Da Capo. */
const DaCapoBandeau = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const base = import.meta.env.BASE_URL;

  return (
    <section id="da-capo" className="py-20 md:py-24 bg-noir text-ivory" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        <img
          src={`${base}da-capo/da-capo-logo-sombre.svg`}
          alt="Da Capo, par Double Dièse"
          className="w-64 md:w-80 shrink-0"
        />
        <div className="text-center md:text-left">
          <p className="font-serif italic text-xl md:text-2xl text-ivory/90 mb-4">{daCapo.accroche}</p>
          <p className="font-body text-lg text-ivory/70 mb-8">{daCapo.bandeau.texte}</p>
          <Link
            to="/da-capo"
            onClick={() => window.scrollTo({ top: 0 })}
            className="btn-elegant border-primary text-primary hover:bg-primary hover:text-noir gap-2"
          >
            {daCapo.bandeau.lien}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default DaCapoBandeau;
