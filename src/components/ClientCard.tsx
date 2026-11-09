import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { Client } from "@/data/content";

interface ClientCardProps {
  client: Client;
  index: number;
}

const ClientCard = ({ client, index }: ClientCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-elegant group relative"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          {client.url ? (
            <a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-lg text-foreground group-hover:text-primary transition-colors hover:underline"
            >
              {client.name}
            </a>
          ) : (
            <h4 className="font-serif text-lg text-foreground">
              {client.name}
            </h4>
          )}
          <div className="flex items-center gap-3 mt-1">
            <span className="font-body text-sm text-primary">{client.year}</span>
            <span className="w-1 h-1 bg-border rounded-full" />
            <span className="font-body text-sm text-muted-foreground">
              {client.type}
            </span>
          </div>
        </div>
        
        {client.logo && (
          <img
            src={client.logo}
            alt={`Logo ${client.name}`}
            className="h-10 w-auto opacity-60 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>
      
      <p className="font-body text-muted-foreground leading-relaxed">
        {client.description}
      </p>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-4 bg-primary/30 group-hover:bg-primary transition-colors" />
        <div className="absolute top-0 right-0 h-px w-4 bg-primary/30 group-hover:bg-primary transition-colors" />
      </div>
    </motion.article>
  );
};

export default ClientCard;
