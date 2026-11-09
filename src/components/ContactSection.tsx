import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { siteContent } from "@/data/content";
import { Send, Phone, Linkedin, Newspaper } from "lucide-react";

const ContactSection = () => {
  const { contact } = siteContent;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  const { email, phone, linkedin, substack } = contact.directContact;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(contact.mailSubject)}`;
  const tel = phone ? `tel:+33${phone.replace(/\D/g, "").replace(/^0/, "")}` : "";

  return (
    <section id="contact" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Colonne gauche : présentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="square-dot" />
              <span className="text-primary font-body text-sm tracking-widest uppercase">
                Parlons de votre projet
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              {contact.title}
            </h2>

            <div className="gold-line w-20 mb-8" />

            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">
              {contact.introduction}
            </p>

            <div className="space-y-4">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                  LinkedIn
                </a>
              )}
              {substack && (
                <a
                  href={substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-foreground hover:text-primary transition-colors"
                >
                  <Newspaper className="w-5 h-5 text-primary" />
                  Newsletter « Depuis le fond de la salle »
                </a>
              )}
            </div>
          </motion.div>

          {/* Colonne droite : écrire ou appeler */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center"
          >
            <div className="card-elegant w-full text-center py-12 px-6">
              <a
                href={mailto}
                className="btn-elegant-filled inline-flex items-center justify-center gap-2 text-lg"
              >
                {contact.cta}
                <Send className="w-4 h-4" />
              </a>
              <p className="mt-6 font-body text-lg text-foreground break-all">
                <a href={mailto} className="hover:text-primary transition-colors">
                  {email}
                </a>
              </p>
              {phone && (
                <a
                  href={tel}
                  className="mt-4 inline-flex items-center gap-3 font-body text-lg text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  {phone}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
