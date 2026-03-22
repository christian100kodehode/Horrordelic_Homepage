// api/simple-og.ts
import fs from "fs/promises";
import path from "path";

export const config = {
  runtime: "nodejs", // Required for fs access
};

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Debug: This MUST appear in Vercel logs when you hit any route
  console.log(
    `[OG] Invoked | Path: ${pathname} | UA: ${req.headers.get("user-agent") || "unknown"}`,
  );

  const ua = req.headers.get("user-agent") || "";
  const isBot =
    /bot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Telegram|Discord|embedly/i.test(
      ua,
    );

  // Read original index.html once (Vite build → dist/index.html)
  const filePath = path.join(process.cwd(), "dist", "index.html");

  let html: string;
  try {
    html = await fs.readFile(filePath, "utf-8");
  } catch (err) {
    console.error("[OG] Failed to read dist/index.html:", err);
    return new Response("Error loading page template", { status: 500 });
  }

  if (!isBot) {
    // Real users → return original HTML directly (fast, no modification)
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "public, max-age=3600", // ← cache for users (optional, tune later)
      },
    });
  }

  // ── Bot only: dynamic replacement ─────────────────────────────────

  let title = "Horrordelic - Darkpsy Life";
  let description = "Dark psychedelic trance music & events";
  let image =
    "https://your-domain.com/assets/HorrordelicHQ_Nov_2025-B2UGlF8o.png"; // Use your real default OG image

  // Simple route-based logic (expand as needed)
  if (pathname === "/about" || pathname.startsWith("/about/")) {
    title = "About Horrordelic";
    description = "Information about the Horrordelic project and darkpsy scene";
    image = "https://your-domain.com/assets/about-og.jpg";
  } else if (
    pathname.startsWith("/product/") ||
    pathname.startsWith("/event/")
  ) {
    const slug = pathname.split("/")[2] || "unknown";
    title = `Event / Product: ${slug}`;
    description = `Details for ${slug} in the darkpsy world`;
    image = `https://your-domain.com/assets/${slug}-og.jpg`;
  }

  // Replace all placeholders
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
      "Cache-Control": "no-store, no-cache", // No cache during tests
    },
  });
}
