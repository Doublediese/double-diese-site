#!/usr/bin/env node
/**
 * Récupère les derniers articles du Substack "Depuis le fond de la salle"
 * et les écrit dans public/substack-posts.json (copie de secours du site).
 * La lecture du flux est partagée avec le connecteur (connecteur/worker.js).
 * En cas d'échec, le fichier existant est conservé.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SUBSTACK_URL, USER_AGENT, parseSubstack } from "../connecteur/worker.js";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/substack-posts.json");

try {
  console.log("[substack] Fetching", SUBSTACK_URL);
  const res = await fetch(SUBSTACK_URL, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const items = parseSubstack(await res.text());
  if (items.length === 0) throw new Error("Aucun article parsé");
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2));
  console.log(`[substack] ${items.length} article(s) écrit(s) dans`, OUT);
} catch (err) {
  console.warn("[substack] Échec, le fichier existant est conservé :", err.message);
}
