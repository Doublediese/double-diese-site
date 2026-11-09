#!/usr/bin/env node
/**
 * Récupère les 5 dernières critiques de Thibault d'Hauthuille sur Bachtrack
 * et les écrit dans public/bachtrack-critiques.json (copie de secours du site).
 * La lecture de la page est partagée avec le connecteur (connecteur/worker.js).
 * En cas d'échec, le fichier existant est conservé.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BACHTRACK_URL, USER_AGENT, parseBachtrack } from "../connecteur/worker.js";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/bachtrack-critiques.json");

try {
  console.log("[bachtrack] Fetching", BACHTRACK_URL);
  const res = await fetch(BACHTRACK_URL, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const items = parseBachtrack(await res.text());
  if (items.length === 0) throw new Error("Aucune critique parsée");
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2));
  console.log(`[bachtrack] ${items.length} critique(s) écrite(s) dans`, OUT);
} catch (err) {
  console.warn("[bachtrack] Échec, le fichier existant est conservé :", err.message);
}
