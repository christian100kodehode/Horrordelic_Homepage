// api/simple-og.ts
import fs from "fs/promises";
import path from "path";

export const config = {
  runtime: "nodejs", // ← Use nodejs so we can read files reliably (Edge often fails on internal fetch)
};

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Debug log – check Vercel > Functions > Logs after hitting the URL
  console.log(
    `Function invoked | Path: ${pathname} | UA: ${req.headers.get("user-agent") || "unknown"}`,
  );

  const ua = req.headers.get("user-agent") || "";
  const isBot =
    /bot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Telegram|Discord|embedly/i.test(
      ua,
    );

  if (!isBot) {
    // Real users → redirect internally to static index.html (Vercel serves it from filesystem)
    return new Response(null, {
      status: 307, // Temporary redirect (internal, no browser change)
      headers: { Location: "/index.html" },
    });
  }

  // ── Bot/crawler only: generate dynamic meta ────────────────────────

  let title = "Default Title - My SPA";
  let description = "Default description for sharing";
  let image = "https://via.placeholder.com/1200x630?text=Default+OG+Image";

  if (pathname === "/Release" || pathname.startsWith("/releas/")) {
    title = "About Page";
    description = "Learn more about us on the about page";
    image =
      "https://via.placeholder.com/1200x630/00aaff/ffffff?text=About+Page";
  } else if (pathname.startsWith("/product/")) {
    const id = pathname.split("/product/")[1]?.split("/")[0] || "unknown";
    title = `Product ${id}`;
    description = `Details and info for product ${id}`;
    image = `https://via.placeholder.com/1200x630/ff6600/ffffff?text=Product+${id}`;
  }

  // Read the built index.html file (Vite outputs to dist/ by default)
  const filePath = path.join(process.cwd(), "dist", "index.html"); // Change 'dist' → 'build' if using CRA

  let html: string;
  try {
    html = await fs.readFile(filePath, "utf-8");
  } catch (err) {
    console.error("Error reading index.html:", err);
    return new Response("Error: Could not load template", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Replace placeholders (must exist in your index.html)
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
      "Cache-Control": "no-store, no-cache, must-revalidate", // ← Helps during testing (remove later)
    },
  });
}
