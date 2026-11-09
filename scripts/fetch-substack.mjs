#!/usr/bin/env node
/**
 * Récupère les derniers articles du Substack "Depuis le fond de la salle"
 * et les écrit dans public/substack-posts.json.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/substack-posts.json");
const FEED = "https://depuislefonddelasalle.substack.com/feed";
const MAX = 2;

function decode(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function cdata(block, tag) {
  const re = new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`);
  const m = block.match(re);
  return m ? m[1].trim() : "";
}

function strip(html) {
  return decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function formatDate(rfc) {
  try {
    const d = new Date(rfc);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

function parse(xml) {
  const items = [];
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  for (const b of blocks) {
    const title = decode(cdata(b, "title"));
    const link = cdata(b, "link");
    const description = strip(cdata(b, "description"));
    const pubDate = formatDate(cdata(b, "pubDate"));
    const imgMatch = b.match(/<enclosure url="([^"]+)"[^>]*type="image\//);
    const image = imgMatch ? imgMatch[1] : "";
    items.push({ title, link, excerpt: description, date: pubDate, image });
    if (items.length >= MAX) break;
  }
  return items;
}

async function main() {
  try {
    console.log("[substack] Fetching", FEED);
    const res = await fetch(FEED, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; DoubleDieseBuilder/1.0; +https://double-diese.fr)",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = parse(xml);
    if (items.length === 0) throw new Error("Aucun article parsé");
    mkdirSync(dirname(OUT), { recursive: true });
    writeFileSync(
      OUT,
      JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2)
    );
    console.log(`[substack] ${items.length} article(s) écrit(s) dans`, OUT);
  } catch (err) {
    console.warn("[substack] Échec :", err.message);
  }
}

main();