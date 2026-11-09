import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { siteContent } from "@/data/content";
import ClientCard from "./ClientCard";

const ConseilSection = () => {
  const { conseil } = siteContent;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  const clients = conseil.clients;

  return (
    <section id="conseil" className="py-24 md:py-32 bg-background" ref={ref}>
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
              Accompagnement
            </span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            {conseil.title}
          </h2>
          
          <div className="gold-line w-20 mb-8" />
          
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {conseil.introduction}
          </p>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {conseil.services.map((service, index) => (
            <div key={index} className="double-bar">
              <h3 className="font-serif text-xl text-foreground mb-2">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Clients Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-serif text-2xl text-foreground mb-8">
            Références
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {clients.map((client, index) => (
              <ClientCard key={index} client={client} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConseilSection;
