// api/simple-og.ts
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  // Log for debugging (check Vercel logs)
  console.log("Function invoked for path:", path, "UA:", req.headers.get('user-agent') || 'unknown');

  const ua = req.headers.get('user-agent') || '';
  const isBot = /bot|facebookexternalhit|Twitterbot|WhatsApp|Telegram|Discord|LinkedInBot/i.test(ua);

  if (!isBot) {
    // Real users: internally rewrite to static index.html (no network fetch!)
    return new Response(null, {
      status: 200,
      headers: {
        'x-vercel-fallback': '/index.html',  // hint (optional)
        // Let Vercel serve the static file
      },
      // The key: use 307 redirect internally or just let rewrite handle
      // But simplest: return fetch with modified request (see below)
    });

    // Better: rewrite-style by fetching with new path (still internal)
    // But to avoid issues, use this pattern:
    const internalReq = new Request(new URL('/index.html', url.origin), {
      method: 'GET',
      headers: req.headers,  // forward important headers
    });

    // This often still fails in edge → so fallback option below
  }

  // ── For bots (or force for testing): serve modified version ──

  // Option 1: If fetch works in your case (test it), keep:
  // const originalRes = await fetch(new URL('/index.html', url.origin));
  // But since it probably doesn't → use Option 2 or 3

  // Option 2 (recommended): Hardcode fallback to serve static via internal rewrite simulation
  // But since we can't reliably fetch, let's read it differently or force-test

  // TEMP TEST: Force always modify (remove isBot check temporarily)
  // Fetch original via a different method or assume failure → but wait

  // Real reliable fix in Edge: Don't fetch — use Node.js runtime instead for fs access (if you can)
  // But for Edge: the community pattern is often to duplicate a template HTML string or use placeholders

  // Best quick fix for now: Switch to runtime 'nodejs' + use process.cwd() + fs