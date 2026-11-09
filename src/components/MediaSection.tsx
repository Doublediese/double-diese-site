import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/data/content";
import { ExternalLink, Headphones, PenLine, Newspaper } from "lucide-react";

type SubstackPost = {
  title: string;
  link: string;
  excerpt: string;
  date: string;
  image?: string;
};

const MediaSection = () => {
  const { media } = siteContent;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  // Critiques Bachtrack chargées automatiquement (généré au build)
  const [bachtrackCritiques, setBachtrackCritiques] = useState<
    typeof media.critiques.items | null
  >(null);
  const [substackPosts, setSubstackPosts] = useState<SubstackPost[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bachtrack-critiques.json`, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.items?.length) setBachtrackCritiques(data.items);
      })
      .catch(() => {
        /* fallback sur le contenu statique */
      });
    fetch(`${import.meta.env.BASE_URL}substack-posts.json`, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.items?.length) setSubstackPosts(data.items);
      })
      .catch(() => {});
  }, []);

  // Priorité : Bachtrack auto > contenu statique
  const critiques =
    bachtrackCritiques && bachtrackCritiques.length > 0
      ? bachtrackCritiques
      : media.critiques.items;

  return (
    <section id="medias" className="py-24 md:py-32 bg-ivory-warm" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="square-dot" />
            <span className="text-primary font-body text-sm tracking-widest uppercase">
              Présence médiatique
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            {media.title}
          </h2>

          <div className="gold-line w-20 mb-8" />

          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {media.introduction}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Podcast Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Headphones className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-2xl text-foreground">
                {media.podcast.title}
              </h3>
            </div>

            <p className="font-body text-muted-foreground mb-6">
              {media.podcast.description}
            </p>

            {/* Podcast Embed Container */}
            <div className="bg-card border border-border rounded-sm overflow-hidden mb-6">
              <iframe
                name="Ausha Podcast Player"
                src={media.podcast.embedUrl}
                loading="lazy"
                style={{ border: "none", width: "100%", height: "480px" }}
                allow="autoplay"
                title="Double Dièse Podcast"
              />
            </div>

            <a
              href={media.podcast.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="link-gold inline-flex items-center gap-2 font-body"
            >
              Écouter tous les épisodes
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Substack — Newsletter "Depuis le fond de la salle" */}
            {substackPosts.length > 0 && (
              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Newspaper className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-2xl text-foreground">
                    Newsletter « Depuis le fond de la salle »
                  </h3>
                </div>
                <p className="font-body text-muted-foreground mb-6">
                  Chronique régulière sur l'actualité de la musique classique, publiée sur Substack.
                </p>
                <div className="space-y-5">
                  {substackPosts.map((post, i) => (
                    <article key={post.link} className="group">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {post.date && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-body text-sm text-primary">{post.date}</span>
                            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                        <h4 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors mb-1">
                          {post.title}
                        </h4>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                      </a>
                      {i < substackPosts.length - 1 && (
                        <div className="mt-5 h-px bg-border" />
                      )}
                    </article>
                  ))}
                </div>
                <a
                  href="https://depuislefonddelasalle.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-gold inline-flex items-center gap-2 font-body mt-6"
                >
                  S'abonner à la newsletter
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Critiques Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <PenLine className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-2xl text-foreground">
                {media.critiques.title}
              </h3>
            </div>

            <p className="font-body text-muted-foreground mb-6">
              {media.critiques.description}
            </p>

            {/* Critiques List */}
            <div className="space-y-6">
              {critiques.map((critique, index) => (
                <article key={index} className="group">
                  <a
                    href={critique.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {critique.date && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-body text-sm text-primary">
                          {critique.date}
                        </span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                    <h4 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                      {critique.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {critique.excerpt}
                    </p>
                  </a>
                  {index < critiques.length - 1 && (
                    <div className="mt-6 h-px bg-border" />
                  )}
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
