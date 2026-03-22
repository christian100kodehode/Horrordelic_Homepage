// api/simple-og.ts
import fs from "fs/promises";
import path from "path";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Log every request (visible in Vercel → Functions → Runtime Logs)
  console.log(
    `[OG] Request | Path: ${pathname} | UA: ${req.headers.get("user-agent") || "unknown"}`,
  );

  const ua = req.headers.get("user-agent") || "";
  const isBot =
    /bot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Telegram|Discord|embedly|google|bing|slurp|yandex/i.test(
      ua,
    );

  // Read the original index.html file built by Vite
  const filePath = path.join(process.cwd(), "dist", "index.html");

  let html: string;
  try {
    html = await fs.readFile(filePath, "utf-8");
    console.log("[OG] index.html read successfully");
  } catch (err) {
    console.error("[OG] Cannot read index.html:", err);
    return new Response("Internal Server Error - cannot load template", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // For normal users → return the original file unchanged
  if (!isBot) {
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=60",
      },
    });
  }

  // ── Only for social media crawlers / bots ─────────────────────────────

  let title = "Horrordelic - Darkpsy Life";
  let description =
    "Dark psychedelic trance, full-on, forest, events, artists & releases";
  let image =
    "https://horrordelic.com/assets/HorrordelicHQ_Nov_2025-B2UGlF8o.png";

  const pathLower = pathname.toLowerCase();
  {
    console.log(pathLower);
  }
  if (pathLower === "/" || pathLower === "") {
    title = "Horrordelic – Darkpsy & Psycore";
  } else if (pathLower.startsWith("/release")) {
    const slug =
      pathLower.replace(/^\/release(s?)\//i, "").split("/")[0] || "unknown";
    title = `Release: ${slug.replace(/-/g, " ")} | Horrordelic`;
    description = `Darkpsy / full-on release – listen & download`;
    // You can make image dynamic later: image = `.../releases/${slug}.jpg`
  } else if (
    pathLower.startsWith("/artist") ||
    pathLower.startsWith("/artists")
  ) {
    const id =
      pathLower.replace(/^\/artist(s?)\//i, "").split("/")[0] || "unknown";
    title = `Artist: ${id.replace(/-/g, " ")} | Horrordelic`;
    description = `Profile, releases & mixes`;
  } else if (pathLower === "/search-results") {
    title = "Search Results | Horrordelic";
    description = "Find darkpsy, full-on, forest music, artists and events";
  }

  // Replace placeholders (must match exactly what's in your index.html)
  html = html
    .replace(/__TITLE__/g, title)
    .replace(/__DESCRIPTION__/g, description)
    .replace(/__OG_TITLE__/g, title)
    .replace(/__OG_DESCRIPTION__/g, description)
    .replace(/__OG_IMAGE__/g, image)
    .replace(/__OG_URL__/g, url.href);

  console.log(`[OG] Bot detected – returning dynamic meta for: ${pathname}`);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
