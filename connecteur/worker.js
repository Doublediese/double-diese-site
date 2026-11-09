// Connecteur Claude « Double Dièse » (serveur MCP), à déployer comme Worker Cloudflare.
// Un seul fichier, sans dépendance : il se colle tel quel dans l'éditeur de Cloudflare.
// Il lit les données publiques publiées par le site (site-data.json, critiques Bachtrack,
// articles Substack). Rien de secret ici.

// Adresse du site publié. L'adresse github.io renverra automatiquement vers
// double-diese.fr une fois le domaine branché sur GitHub Pages.
const SITE_URL = "https://doublediese.github.io/double-diese-site";

const SERVER_INFO = { name: "double-diese-mcp", title: "Double Dièse", version: "1.0.0" };
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
    run: async ({ limit }) => feed("bachtrack-critiques.json", limit),
  },
  {
    name: "get_substack_posts",
    title: "Get Substack newsletter posts",
    description:
      "Return the latest articles from the Double Dièse Substack newsletter 'Depuis le fond de la salle' (title, date, excerpt, link).",
    inputSchema: limitSchema("Maximum number of posts to return (default: all available)."),
    annotations: { ...READ_ONLY, openWorldHint: true },
    run: async ({ limit }) => feed("substack-posts.json", limit),
  },
];

async function getJson(file) {
  const res = await fetch(`${SITE_URL}/${file}`, {
    headers: { accept: "application/json" },
    cf: { cacheTtl: 300 },
  });
  if (!res.ok) throw new Error(`Impossible de lire ${file} (HTTP ${res.status})`);
  return res.json();
}

async function feed(file, limit) {
  const data = await getJson(file);
  const all = Array.isArray(data.items) ? data.items : [];
  return { updatedAt: data.updatedAt, items: limit ? all.slice(0, limit) : all };
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
