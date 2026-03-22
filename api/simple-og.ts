// api/simple-og.ts
// import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "edge", // fastest, lowest latency
};

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  // Very simple bot detection (expand later if needed)
  const ua = req.headers.get("user-agent") || "";
  //   const isBot =
  //     /bot|facebookexternalhit|Twitterbot|WhatsApp|Telegram|Discord|LinkedInBot/i.test(
  //       ua,
  //     );

  //   if (!isBot) {
  console.log("Function invoked for path:", url.pathname, "UA:", ua);
  return fetch(new URL("/index.html", url.origin));
  //   }

  // ── Bot only: modify HTML ───────────────────────────────────────

  // Fetch original index.html
  const originalRes = await fetch(new URL("/index.html", url.origin));
  let html = await originalRes.text();

  // Decide dynamic values based on path (super simple test logic)
  let title = "Default Title";
  let desc = "Default description for social sharing";
  let image = "https://via.placeholder.com/1200x630?text=Default+OG";

  if (path === "/Release" || path.startsWith("/release")) {
    title = "Release Page";
    desc = "This is the release page — all our work here!";
    image =
      "https://horrordelic.com/assets/HorrordelicLogo300x300-C3Uw5sCW.png";
  } else if (path.startsWith("/artist")) {
    const id = path.split("/artist/")[1] || "unknown";
    title = `Artist ${id}`;
    desc = `Description for artist ${id}`;
    image = `https://horrordelic.com/artists/ParallelBanner.jpg`;
  }

  // Replace placeholders
  html = html
    .replace(/__TITLE__/g, title)
    .replace(/__DESCRIPTION__/g, desc)
    .replace(/__OG_TITLE__/g, title)
    .replace(/__OG_DESCRIPTION__/g, desc)
    .replace(/__OG_IMAGE__/g, image)
    .replace(/__OG_URL__/g, url.href);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
