#!/usr/bin/env node
/**
 * Récupère les derniers articles du Substack "Depuis le fond de la salle"
 * et les écrit dans public/substack-posts.json (copie publiée avec le site,
 * lue aussi par le connecteur). Substack refusant les serveurs de GitHub,
 * on passe en second recours par rss2json.com. En cas d'échec, le fichier existant
 * est conservé.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SUBSTACK_URL, USER_AGENT, parseSubstack } from "../connecteur/worker.js";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/substack-posts.json");

const strip = (html) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

async function direct() {
  const res = await fetch(SUBSTACK_URL, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Substack HTTP ${res.status}`);
  return parseSubstack(await res.text());
}

async function relay() {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_URL)}`,
  );
  if (!res.ok) throw new Error(`rss2json HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== "ok") throw new Error(`rss2json ${data.message || data.status}`);
  return (data.items || []).slice(0, 2).map((i) => ({
    title: i.title,
    link: i.link,
    excerpt: strip(i.description || ""),
    date: new Date(i.pubDate.replace(" ", "T") + "Z").toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    image: i.enclosure?.link || i.thumbnail || "",
  }));
}

console.log("[substack] Fetching", SUBSTACK_URL);
const errors = [];
let items = [];
for (const [name, get] of [["direct", direct], ["rss2json", relay]]) {
  try {
    items = await get();
    if (items.length) {
      console.log(`[substack] ${items.length} article(s) lus (${name})`);
      break;
    }
  } catch (err) {
    errors.push(err.message);
  }
}

if (items.length) {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2));
  console.log("[substack] écrit dans", OUT);
} else {
  console.warn("[substack] Échec, le fichier existant est conservé :", errors.join(" ; "));
}
