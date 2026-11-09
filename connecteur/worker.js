// Connecteur Claude « Double Dièse » (serveur MCP), à déployer comme Worker Cloudflare.
// Un seul fichier, sans dépendance : il se colle tel quel dans l'éditeur de Cloudflare.
// Il lit les données publiques publiées par le site (site-data.json) et va chercher
// les critiques Bachtrack et les articles Substack à la source. Rien de secret ici.
// Il sert aussi ces deux flux au site : GET /bachtrack.json et GET /substack.json.

// Adresse du site publié. L'adresse github.io renverra automatiquement vers
// double-diese.fr une fois le domaine branché sur GitHub Pages.
const SITE_URL = "https://doublediese.github.io/double-diese-site";

const SERVER_INFO = { name: "double-diese-mcp", title: "Double Dièse", version: "1.1.0" };
const INSTRUCTIONS =
  "Public tools exposing the Double Dièse portfolio: services, references, latest Bachtrack reviews, and the Substack newsletter 'Depuis le fond de la salle'. All data is public.";

const READ_ONLY = { readOnlyHint: true, idempotentHint: true };

const limitSchema = (description) => ({
  type: "object",
  properties: { limit: { type: "integer", minimum: 1, description } },
  additionalProperties: false,
});

const TOOLS = [
  {
    name: "get_site_overview",
    title: "Get Double Dièse site overview",
    description:
      "Return an overview of the Double Dièse site: positioning, services offered (Stratégie, Marketing et communication, Approche des publics), about section, and contact information.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { ...READ_ONLY, openWorldHint: false },
    run: async () => (await getJson("site-data.json")).overview,
  },
  {
    name: "list_references",
    title: "List client references",
    description:
      "List Double Dièse client references (institutions culturelles, festivals, artistes) with name, year, type of mission, description, and optional website URL.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { ...READ_ONLY, openWorldHint: false },
    run: async () => ({ clients: (await getJson("site-data.json")).references }),
  },
  {
    name: "get_bachtrack_reviews",
    title: "Get Bachtrack reviews",
    description:
      "Return the latest classical music concert reviews written by Double Dièse for Bachtrack (title, date, excerpt, link).",
    inputSchema: limitSchema("Maximum number of reviews to return (default: all available)."),
    annotations: { ...READ_ONLY, openWorldHint: true },
    run: async ({ limit }) => trim(await getFeed("bachtrack"), limit),
  },
  {
    name: "get_substack_posts",
    title: "Get Substack newsletter posts",
    description:
      "Return the latest articles from the Double Dièse Substack newsletter 'Depuis le fond de la salle' (title, date, excerpt, link).",
    inputSchema: limitSchema("Maximum number of posts to return (default: all available)."),
    annotations: { ...READ_ONLY, openWorldHint: true },
    run: async ({ limit }) => trim(await getFeed("substack"), limit),
  },
];

const trim = (data, limit) => ({ ...data, items: limit ? data.items.slice(0, limit) : data.items });

async function getJson(file) {
  const res = await fetch(`${SITE_URL}/${file}`, {
    headers: { accept: "application/json" },
    cf: { cacheTtl: 300 },
  });
  if (!res.ok) throw new Error(`Impossible de lire ${file} (HTTP ${res.status})`);
  return res.json();
}

// ---------- Flux Bachtrack et Substack ----------
// Le Worker va chercher les flux à la source (gardés 6 heures en cache par Cloudflare).
// En cas d'échec, il renvoie la copie publiée avec le site. Les mêmes fonctions de lecture
// servent aussi aux scripts de construction du site (scripts/fetch-*.mjs).

export const BACHTRACK_URL = "https://bachtrack.com/fr_FR/22/270/list-published/43994";
export const SUBSTACK_URL = "https://depuislefonddelasalle.substack.com/feed";
export const USER_AGENT = "Mozilla/5.0 (compatible; DoubleDieseBuilder/1.0; +https://double-diese.fr)";

const FEEDS = {
  bachtrack: { url: BACHTRACK_URL, parse: (t) => parseBachtrack(t), file: "bachtrack-critiques.json" },
  substack: { url: SUBSTACK_URL, parse: (t) => parseSubstack(t), file: "substack-posts.json" },
};

async function getFeed(name) {
  const f = FEEDS[name];
  let liveError = "";
  try {
    const res = await fetch(f.url, {
      headers: { "User-Agent": USER_AGENT },
      cf: { cacheTtlByStatus: { "200-299": 21600, "300-599": 0 } },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = f.parse(await res.text());
    if (!items.length) throw new Error("aucun élément lu");
    return { source: "live", updatedAt: new Date().toISOString(), items };
  } catch (e) {
    liveError = String(e.message || e);
  }
  const data = await getJson(f.file);
  return {
    source: "site",
    liveError,
    updatedAt: data.updatedAt,
    items: Array.isArray(data.items) ? data.items : [],
  };
}

function decode(str) {
  return str
    .replace(/&#0?39;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&copy;/g, "©")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

const strip = (html) => decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

export function parseBachtrack(html, max = 5) {
  const items = [];
  const blockRe = /<div class='ar-shortform'[\s\S]*?(?=<div class='ar-shortform'|<div class='pl-af-pagination'|$)/g;
  for (const b of html.match(blockRe) || []) {
    const link = b.match(/<h2><a href='(\/fr_FR\/[^']+)'[^>]*>([^<]+)<\/a><\/h2>/);
    if (!link) continue;
    const author = b.match(/<div class='ar-shortform-author'>([\s\S]*?)<\/div>/);
    const date = author?.[1].match(/,\s*([^<]+)$/)?.[1].trim() ?? "";
    const teaser = b.match(/<div class='article-teaser'>([\s\S]*?)<\/div>/);
    items.push({
      title: decode(link[2]).trim(),
      date,
      excerpt: teaser ? strip(teaser[1]) : "",
      link: "https://bachtrack.com" + link[1],
    });
    if (items.length >= max) break;
  }
  return items;
}

export function parseSubstack(xml, max = 2) {
  const tag = (block, t) =>
    block.match(new RegExp(`<${t}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${t}>`))?.[1].trim() ?? "";
  const items = [];
  for (const b of xml.match(/<item>[\s\S]*?<\/item>/g) || []) {
    let date = "";
    try {
      date = new Date(tag(b, "pubDate")).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {}
    items.push({
      title: decode(tag(b, "title")),
      link: tag(b, "link"),
      excerpt: strip(tag(b, "description")),
      date,
      image: b.match(/<enclosure url="([^"]+)"[^>]*type="image\//)?.[1] ?? "",
    });
    if (items.length >= max) break;
  }
  return items;
}

// ---------- Protocole MCP (JSON-RPC sur HTTP, sans état) ----------

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });

const result = (id, res) => ({ jsonrpc: "2.0", id, result: res });
const error = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });

async function handle(msg) {
  const { id, method, params = {} } = msg ?? {};
  if (id === undefined || id === null) return null; // notification : pas de réponse

  switch (method) {
    case "initialize":
      return result(id, {
        protocolVersion: params.protocolVersion || "2025-06-18",
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIONS,
      });
    case "ping":
      return result(id, {});
    case "tools/list":
      return result(id, {
        tools: TOOLS.map(({ run, ...tool }) => tool),
      });
    case "tools/call": {
      const tool = TOOLS.find((t) => t.name === params.name);
      if (!tool) return error(id, -32602, `Outil inconnu : ${params.name}`);
      try {
        const data = await tool.run(params.arguments ?? {});
        return result(id, {
          content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
          structuredContent: data,
        });
      } catch (e) {
        return result(id, { content: [{ type: "text", text: String(e.message || e) }], isError: true });
      }
    }
    default:
      return error(id, -32601, `Méthode non prise en charge : ${method}`);
  }
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    // Flux lus par le site : /bachtrack.json et /substack.json
    const feedName = new URL(request.url).pathname.match(/^\/(bachtrack|substack)\.json$/)?.[1];
    if (request.method === "GET" && feedName) {
      const data = await getFeed(feedName);
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600", ...CORS },
      });
    }

    if (request.method !== "POST") {
      return new Response("Connecteur MCP Double Dièse : utiliser POST.", {
        status: 405,
        headers: { Allow: "POST, OPTIONS", ...CORS },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json(error(null, -32700, "JSON invalide"), 400);
    }

    if (Array.isArray(body)) {
      const replies = (await Promise.all(body.map(handle))).filter(Boolean);
      return replies.length ? json(replies) : new Response(null, { status: 202, headers: CORS });
    }
    const reply = await handle(body);
    return reply ? json(reply) : new Response(null, { status: 202, headers: CORS });
  },
};
