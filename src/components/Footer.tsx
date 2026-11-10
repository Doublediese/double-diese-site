import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/data/content";
import { X } from "lucide-react";
import { LogoDoubleDiese } from "@/components/Logo";

const Footer = () => {
  const { legal, navigation } = siteContent;
  const [showLegal, setShowLegal] = useState(false);

  return (
    <>
      <footer className="py-12 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <LogoDoubleDiese className="h-5 w-auto" />

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              {navigation.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                  className="font-body text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Legal Link */}
            <button
              onClick={() => setShowLegal(true)}
              className="font-body text-sm text-secondary-foreground/50 hover:text-secondary-foreground transition-colors"
            >
              Mentions légales
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-secondary-foreground/10 text-center">
            <p className="font-body text-sm text-secondary-foreground/50">
              {legal.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <AnimatePresence>
        {showLegal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-noir/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowLegal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-sm max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-foreground">
                  Mentions légales
                </h2>
                <button
                  onClick={() => setShowLegal(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 font-body text-muted-foreground">
                <section>
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    Éditeur du site
                  </h3>
                  <p>
                    {legal.owner.name}
                    <br />
                    {legal.owner.status}
                    <br />
                    {legal.owner.address}
                    <br />
                    SIRET : {legal.owner.siret}
                    <br />
                    Email : {legal.owner.email}
                  </p>
                </section>

                <section>
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    Hébergement
                  </h3>
                  <p>
                    {legal.host.name}
                    <br />
                    {legal.host.address}
                    <br />
                    Téléphone : {legal.host.phone}
                  </p>
                </section>

                <section>
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    Propriété intellectuelle
                  </h3>
                  <p>
                    L'ensemble du contenu de ce site (textes, images, graphismes,
                    logo, etc.) est protégé par le droit d'auteur. Toute
                    reproduction, représentation, modification ou adaptation, totale
                    ou partielle, est interdite sans l'accord préalable de
                    l'éditeur.
                  </p>
                </section>

                <section>
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    Données personnelles
                  </h3>
                  <p>
                    Les informations recueillies via le formulaire de contact sont
                    destinées uniquement à permettre la prise de contact et ne font
                    l'objet d'aucune transmission à des tiers. Conformément à la loi
                    Informatique et Libertés et au RGPD, vous disposez d'un droit
                    d'accès, de rectification et de suppression de vos données.
                  </p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
