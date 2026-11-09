#!/usr/bin/env node
/**
 * Récupère les 5 dernières critiques de Thibault d'Hauthuille sur Bachtrack
 * et les écrit dans public/bachtrack-critiques.json.
 *
 * Exécuté automatiquement avant chaque build et chaque démarrage du dev server
 * via le plugin Vite (voir vite.config.ts).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/bachtrack-critiques.json");
const URL_SRC =
  "https://bachtrack.com/fr_FR/22/270/list-published/43994";
const MAX = 5;

function decodeEntities(str) {
  return str
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&copy;/g, "©")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function parse(html) {
  const items = [];
  // Chaque article = bloc <div class='ar-shortform'>...</div>
  const blockRe = /<div class='ar-shortform'[\s\S]*?(?=<div class='ar-shortform'|<div class='pl-af-pagination'|$)/g;
  const blocks = html.match(blockRe) || [];
  for (const b of blocks) {
    const linkMatch = b.match(
      /<h2><a href='(\/fr_FR\/[^']+)'[^>]*>([^<]+)<\/a><\/h2>/
    );
    if (!linkMatch) continue;
    const path = linkMatch[1];
    const title = decodeEntities(linkMatch[2]).trim();
    const authorBlock = b.match(/<div class='ar-shortform-author'>([\s\S]*?)<\/div>/);
    let date = "";
    if (authorBlock) {
      const m = authorBlock[1].match(/,\s*([^<]+)$/);
      if (m) date = m[1].trim();
    }
    const teaserMatch = b.match(/<div class='article-teaser'>([\s\S]*?)<\/div>/);
    const excerpt = teaserMatch ? stripTags(teaserMatch[1]) : "";
    items.push({
      title,
      date,
      excerpt,
      link: "https://bachtrack.com" + path,
    });
    if (items.length >= MAX) break;
  }
  return items;
}

async function main() {
  try {
    console.log("[bachtrack] Fetching", URL_SRC);
    const res = await fetch(URL_SRC, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DoubleDieseBuilder/1.0; +https://double-diese.fr)",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const items = parse(html);
    if (items.length === 0) throw new Error("Aucune critique parsée");
    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(
      OUT,
      JSON.stringify(
        { updatedAt: new Date().toISOString(), items },
        null,
        2
      )
    );
    console.log(`[bachtrack] ${items.length} critique(s) écrite(s) dans`, OUT);
  } catch (err) {
    console.warn(
      "[bachtrack] Échec de la récupération, le site utilisera le fallback :",
      err.message
    );
  }
}

main();