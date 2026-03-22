// api/simple-og.ts
import fs from "fs/promises";
import path from "path";

export const config = {
  runtime: "nodejs", // Required for process.cwd() + fs
};

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  console.log(
    `[OG] Invoked | Path: ${pathname} | UA: ${req.headers.get("user-agent") || "unknown"}`,
  );

  const ua = req.headers.get("user-agent") || "";
  const isBot =
    /bot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Telegram|Discord|embedly|google|bing|slurp|yandex/i.test(
      ua,
    );

  // This now works because runtime = 'nodejs'
  const filePath = path.join(process.cwd(), "dist", "index.html");

  let html: string;
  try {
    html = await fs.readFile(filePath, "utf-8");
    console.log("[OG] Successfully read index.html from:", filePath);
  } catch (err) {
    console.error("[OG] Failed to read file:", err);
    return new Response("Server error loading template", { status: 500 });
  }

  if (!isBot) {
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  // Bot dynamic logic (your routes)
  let title = "Horrordelic - Darkpsy Life";
  let description = "Dark psychedelic trance music, events & releases";
  let image =
    "https://horrordelic.com/assets/HorrordelicHQ_Nov_2025-B2UGlF8o.png";

  const pathLower = pathname.toLowerCase();

  if (pathLower.startsWith("/release/")) {
    const slug = pathLower.split("/release/")[1] || "unknown";
    title = `Release: ${slug.replace(/-/g, " ")} | Horrordelic`;
    description = `Darkpsy / full-on release: ${slug}`;
    // image = `.../${slug}.jpg` if you have dynamic images
  } else if (
    pathLower.startsWith("/artists/") ||
    pathLower.startsWith("/artist/")
  ) {
    const id = pathLower.split(/\/artists?\/([a-z0-9-]+)/i)[1] || "unknown";
    title = `Artist: ${id.replace(/-/g, " ")} | Horrordelic`;
    description = `Profile & releases by ${id}`;
  } else if (pathLower === "/search-results") {
    title = "Search Results | Horrordelic";
  }

  html = html
    .replace(/__TITLE__/g, title)
    .replace(/__DESCRIPTION__/g, description)
    .replace(/__OG_TITLE__/g, title)
    .replace(/__OG_DESCRIPTION__/g, description)
    .replace(/__OG_IMAGE__/g, image)
    .replace(/__OG_URL__/g, url.href);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "no-store", // remove for production if you want caching
    },
  });
}
