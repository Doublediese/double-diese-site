import { motion } from "framer-motion";
import { useEffect } from "react";
import { Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdresseEmail from "@/components/AdresseEmail";
import { daCapo } from "@/data/dacapo";
import { siteContent } from "@/data/content";

const DaCapoPage = () => {
  const base = import.meta.env.BASE_URL;
  const email = siteContent.contact.directContact.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(daCapo.objetEmail)}`;

  useEffect(() => {
    const avant = document.title;
    document.title = "Da Capo, par Double Dièse : un guide d'écoute pour chaque concert";
    return () => {
      document.title = avant;
    };
  }, []);

  const apparition = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -15% 0px" },
    transition: { duration: 0.8, delay },
  });

  return (
    <main className="min-h-screen">
      <Header />

      {/* Ouverture */}
      <section className="bg-noir text-ivory pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="container max-w-3xl text-center">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src={`${base}da-capo/da-capo-logo-sombre.svg`}
            alt="Da Capo, par Double Dièse"
            className="w-72 md:w-[26rem] mx-auto mb-12"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif italic text-2xl md:text-3xl leading-snug text-ivory/95 mb-10"
          >
            {daCapo.accroche}
          </motion.p>
          <div className="w-24 h-px bg-primary mx-auto mb-10" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-lg md:text-xl text-ivory/80 leading-relaxed"
          >
            {daCapo.introduction}
          </motion.p>
        </div>
      </section>

      {/* Les quatre temps de la boucle */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-5xl">
          {daCapo.temps.map((t, i) => (
            <motion.article
              key={t.titre}
              {...apparition()}
              className="grid md:grid-cols-[14rem_1fr] gap-6 md:gap-12 py-12 border-b border-border/60 last:border-b-0"
            >
              <header>
                <span className="font-serif text-primary text-4xl block mb-2">{i + 1}</span>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">{t.titre}</h2>
                <p className="font-body italic text-lg text-muted-foreground">{t.sousTitre}</p>
              </header>
              <div>
                <p className="font-body text-lg md:text-xl text-foreground leading-relaxed mb-6">{t.texte}</p>
                <p className="font-body text-lg text-foreground/80 border-l-2 border-primary pl-5">
                  <span className="font-semibold text-primary uppercase tracking-widest text-sm mr-2">
                    Pour vous
                  </span>
                  {t.pourVous.charAt(0).toUpperCase() + t.pourVous.slice(1)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Ce qui vous revient, et l'invitation */}
      <section className="py-24 md:py-28 bg-ivory-warm">
        <motion.div {...apparition()} className="container max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="square-dot" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">{daCapo.revient.titre}</h2>
            <span className="square-dot" />
          </div>
          <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">{daCapo.revient.texte}</p>
          <p className="font-body italic text-base md:text-lg text-muted-foreground mb-12">{daCapo.independance}</p>
          <a href={mailto} className="btn-elegant-filled inline-flex items-center gap-2 text-base">
            {daCapo.bouton}
            <Send className="w-4 h-4" />
          </a>
          <p className="mt-6 text-lg text-foreground">
            <AdresseEmail email={email} sujet={daCapo.objetEmail} />
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default DaCapoPage;
