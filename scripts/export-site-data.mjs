// Écrit public/site-data.json à partir de src/data/content.ts.
// Ce fichier sert au connecteur Claude (dossier connecteur/), qui le lit sur le site publié.
import { writeFileSync } from "node:fs";
import { siteContent } from "../src/data/content.ts";

const { hero, conseil, about, contact } = siteContent;

const data = {
  updatedAt: new Date().toISOString(),
  overview: {
    hero,
    services: conseil.services,
    about: { name: about.name, role: about.role, bio: about.bio },
    contact: {
      title: contact.title,
      introduction: contact.introduction,
      ...contact.directContact,
    },
  },
  references: conseil.clients ?? [],
};

writeFileSync("public/site-data.json", JSON.stringify(data, null, 2));
console.log(`[site-data] ${data.references.length} référence(s) écrite(s) dans public/site-data.json`);
