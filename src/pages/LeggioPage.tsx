import { motion } from "framer-motion";
import { useEffect } from "react";
import { Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdresseEmail from "@/components/AdresseEmail";
import { leggio } from "@/data/leggio";
import { siteContent } from "@/data/content";

// Couleurs d'usage des deux déclinaisons (marque Leggio, 24 novembre 2026)
const SAISON = "#7a2e2e";
const TOUR = "#2f6468";

const apparition = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { duration: 0.8, delay },
});

const majuscule = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « Pour vous : … » en filet coloré */
const Note = ({ pour, texte, couleur }: { pour: string; texte: string; couleur: string }) => (
  <p className="font-body text-lg text-foreground/80 border-l-2 pl-5 mt-5" style={{ borderColor: couleur }}>
    <span className="font-semibold uppercase tracking-widest text-sm mr-2" style={{ color: couleur }}>
      {pour}
    </span>
    {majuscule(texte)}
  </p>
);

const LeggioPage = () => {
  const base = import.meta.env.BASE_URL;
  const email = siteContent.contact.directContact.email;
  const mailto = (objet: string) => `mailto:${email}?subject=${encodeURIComponent(objet)}`;

  useEffect(() => {
    const avant = document.title;
    document.title = "Leggio, un outil Double Dièse : le pupitre de chaque spectateur";
    return () => {
      document.title = avant;
    };
  }, []);

  const aller = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen">
      <Header />

      {/* Ouverture */}
      <section className="bg-noir text-ivory pt-36 pb-24 md:pt-44 md:pb-28">
        <div className="container max-w-3xl text-center">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src={`${base}leggio/leggio-blanc-or.svg`}
            alt="Leggio"
            className="w-60 md:w-80 mx-auto mb-10"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif italic text-2xl md:text-3xl leading-snug text-ivory/95 mb-10"
          >
            {leggio.baseline}
          </motion.p>
          <div className="w-24 h-px bg-primary mx-auto mb-10" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-lg md:text-xl text-ivory/80 leading-relaxed mb-12"
          >
            {leggio.introduction}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid sm:grid-cols-2 gap-4 text-left"
          >
            {[
              { id: "saison", logo: "leggio-saison-horizontal-blanc.svg", texte: leggio.portes.saison, alt: "Leggio Saison" },
              { id: "tour", logo: "leggio-tour-horizontal-blanc.svg", texte: leggio.portes.tour, alt: "Leggio Tour" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => aller(p.id)}
                className="border border-ivory/20 hover:border-primary p-6 transition-colors duration-300 text-left"
              >
                <img src={`${base}leggio/${p.logo}`} alt={p.alt} className="h-8 md:h-9 w-auto mb-4" />
                <span className="font-body text-lg text-ivory/80 leading-snug block">{p.texte}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Le guide, commun aux deux */}
      <section className="py-20 md:py-28 bg-ivory-warm">
        <motion.div {...apparition()} className="container max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-10">{leggio.guide.titre}</h2>
          <ul className="space-y-4">
            {leggio.guide.points.map((p) => (
              <li key={p} className="flex gap-4 font-body text-lg md:text-xl text-foreground/85 leading-relaxed">
                <span className="square-dot mt-3 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Leggio Saison */}
      <section id="saison" className="py-24 md:py-32 bg-background scroll-mt-20">
        <div className="container max-w-5xl">
          <motion.header {...apparition()} className="text-center mb-8">
            <img src={`${base}leggio/leggio-saison-horizontal.svg`} alt="Leggio Saison" className="h-12 md:h-14 w-auto mx-auto mb-5" />
            <p className="font-body italic text-xl text-muted-foreground">{leggio.saison.pourQui}</p>
          </motion.header>
          {leggio.saison.moments.map((m, i) => (
            <motion.article
              key={m.titre}
              {...apparition()}
              className="grid md:grid-cols-[14rem_1fr] gap-6 md:gap-12 py-12 border-b border-border/60"
            >
              <header>
                <span className="font-serif text-4xl block mb-2" style={{ color: SAISON }}>
                  {i + 1}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">{m.titre}</h3>
                <p className="font-body italic text-lg text-muted-foreground">{m.sousTitre}</p>
              </header>
              <div>
                <p className="font-body text-lg md:text-xl text-foreground leading-relaxed">{m.texte}</p>
                <Note pour="Pour vous" texte={m.pourVous} couleur={SAISON} />
              </div>
            </motion.article>
          ))}
          <motion.div {...apparition()} className="grid md:grid-cols-[14rem_1fr] gap-6 md:gap-12 pt-12">
            <h3 className="font-serif text-2xl md:text-3xl text-foreground">Et aussi</h3>
            <p className="font-body text-lg md:text-xl text-foreground/85 leading-relaxed">{leggio.saison.etAussi}</p>
          </motion.div>
        </div>
      </section>

      {/* Leggio Tour */}
      <section id="tour" className="py-24 md:py-32 bg-ivory-warm scroll-mt-20">
        <div className="container max-w-5xl">
          <motion.header {...apparition()} className="text-center mb-8">
            <img src={`${base}leggio/leggio-tour-horizontal.svg`} alt="Leggio Tour" className="h-12 md:h-14 w-auto mx-auto mb-5" />
            <p className="font-body italic text-xl text-muted-foreground">{leggio.tour.pourQui}</p>
            <p className="font-serif italic text-2xl md:text-3xl text-foreground mt-6 max-w-3xl mx-auto leading-snug">
              {leggio.tour.accroche}
            </p>
          </motion.header>
          {leggio.tour.faces.map((f) => (
            <motion.article
              key={f.titre}
              {...apparition()}
              className="grid md:grid-cols-[14rem_1fr] gap-6 md:gap-12 py-12 border-b border-border/60 last:border-b-0"
            >
              <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-tight" style={{ color: TOUR }}>
                {f.titre}
              </h3>
              <div>
                <p className="font-body text-lg md:text-xl text-foreground leading-relaxed">{f.texte}</p>
                {f.notes.map((n) => (
                  <Note key={n.pour} pour={n.pour} texte={n.texte} couleur={TOUR} />
                ))}
              </div>
            </motion.article>
          ))}
          <motion.p {...apparition()} className="text-center font-body italic text-lg md:text-xl text-foreground/80 mt-10">
            <button onClick={() => aller("saison")} className="link-gold italic">
              {leggio.tour.passerelle}
            </button>
          </motion.p>
        </div>
      </section>

      {/* Ce qui vaut pour les deux */}
      <section className="py-20 md:py-28 bg-noir text-ivory">
        <motion.div {...apparition()} className="container max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-10">{leggio.communs.titre}</h2>
          <ul className="space-y-4">
            {leggio.communs.points.map((p) => (
              <li key={p} className="flex gap-4 font-body text-lg md:text-xl text-ivory/85 leading-relaxed">
                <span className="square-dot mt-3 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Qui écrit les guides */}
      <section className="py-20 md:py-28 bg-background">
        <motion.div {...apparition()} className="container max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">{leggio.auteurs.titre}</h2>
          {leggio.auteurs.paragraphes.map((p) => (
            <p key={p} className="font-body text-lg md:text-xl text-foreground/85 leading-relaxed mb-5">
              {p}
            </p>
          ))}
        </motion.div>
      </section>

      {/* Commencer */}
      <section className="py-24 md:py-28 bg-ivory-warm">
        <motion.div {...apparition()} className="container max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="square-dot" />
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">{leggio.commencer.titre}</h2>
            <span className="square-dot" />
          </div>
          <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed mb-10">{leggio.commencer.texte}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={mailto(leggio.commencer.objetSaison)}
              className="btn-elegant gap-2 text-base text-white hover:opacity-90"
              style={{ backgroundColor: SAISON, borderColor: SAISON }}
            >
              {leggio.commencer.boutonSaison}
              <Send className="w-4 h-4" />
            </a>
            <a
              href={mailto(leggio.commencer.objetTour)}
              className="btn-elegant gap-2 text-base text-white hover:opacity-90"
              style={{ backgroundColor: TOUR, borderColor: TOUR }}
            >
              {leggio.commencer.boutonTour}
              <Send className="w-4 h-4" />
            </a>
          </div>
          <p className="text-lg text-foreground mb-10">
            <AdresseEmail email={email} sujet="Leggio" />
          </p>
          <p className="font-body italic text-base md:text-lg text-muted-foreground">{leggio.independance}</p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default LeggioPage;
