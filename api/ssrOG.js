// api/ssrOG.js
import { readFile } from "fs/promises";
import path from "path";
import { useParams, Link, useNavigate } from "react-router";

// Optional: cache the built index.html in memory (very fast on Vercel)
let cachedHtml = null;

const { path } = useParams();

async function getBaseHtml() {
  if (cachedHtml) return cachedHtml;

  // In Vercel production: the built file is at the root of the Lambda
  const filePath = path.join(process.cwd(), "dist", "index.html");

  try {
    const content = await readFile(filePath, "utf-8");
    cachedHtml = content;
    return content;
  } catch (err) {
    console.error("Failed to read index.html:", err);
    // Fallback – you could return a minimal error page or default HTML
    return "<!DOCTYPE html><html><head><title>Error</title></head><body>Server error</body></html>";
  }
}

// Your per-route metadata (can also come from DB, CMS, JSON file, etc.)
const metadata = {
  "/": {
    title: "Home | My Awesome App",
    description:
      "Welcome to the best React app built with Vite and deployed on Vercel!",
    ogTitle: "Home – My Awesome App",
    ogDescription: "Discover amazing things in our SPA.",
    ogImage: "https://yoursite.com/og-images/home.jpg",
    ogUrl: "https://yoursite.com/",
  },
  "/about": {
    title: "About Us | My Awesome App",
    description: "Learn more about who we are and what we do.",
    ogTitle: "About – My Awesome App",
    ogDescription: "We build fast, modern web apps.",
    ogImage: "https://yoursite.com/og-images/about.jpg",
    ogUrl: "https://yoursite.com/about",
  },
  // Example: dynamic blog post style route
  // In real apps → match with regex or use a router library like 'path-to-regexp'
  first: {
    title: "My First Post | Blog",
    description: "This is the story of my first blog post...",
    ogTitle: "My First Post – Read Now!",
    ogDescription: "Deep dive into why I started blogging in 2026.",
    ogImage: "https://yoursite.com/blog/og/my-first-post.png",
    ogUrl: "https://yoursite.com/blog/my-first-post",
  },
  // Add fallback for unknown routes
  default: {
    title: "My Awesome App",
    description: "React + Vite + Vercel – fast & modern.",
    ogTitle: "My Awesome App",
    ogDescription: "Default description when route not found.",
    ogImage: "https://yoursite.com/og-images/default.jpg",
    ogUrl: "https://yoursite.com/",
  },
};

export default async function handler(req, res) {
  const url = path;
  const pathname = url.pathname;

  if (path === "Release") {
    // Simple exact match failed → you can add regex/pattern matching here
    // For now: fallback
    ogData = metadata.first;
  }

  // Get the base (built) index.html
  let htmlContent = await getBaseHtml();

  // Replace all placeholders
  htmlContent = htmlContent
    .replace(/__TITLE__/g, ogData.title || "")
    .replace(/__DESCRIPTION__/g, ogData.description || "")
    .replace(/__OG_TITLE__/g, ogData.ogTitle || ogData.title || "")
    .replace(
      /__OG_DESCRIPTION__/g,
      ogData.ogDescription || ogData.description || "",
    )
    .replace(/__OG_IMAGE__/g, ogData.ogImage || "")
    .replace(
      /__OG_URL__/g,
      ogData.ogUrl || `https://${req.headers.host}${pathname}`,
    )
    // Twitter / additional cards (optional)
    .replace(/__TWITTER_TITLE__/g, ogData.ogTitle || ogData.title || "")
    .replace(
      /__TWITTER_DESCRIPTION__/g,
      ogData.ogDescription || ogData.description || "",
    )
    .replace(/__TWITTER_IMAGE__/g, ogData.ogImage || "");

  // Optional: also replace regular <title> if you used __TITLE__ there too
  // htmlContent = htmlContent.replace(/<title>.*?<\/title>/, `<title>${ogData.title}</title>`);

  res.setHeader("Content-Type", "text/html");
  res.setHeader(
    "Cache-Control",
    "public, max-age=60, stale-while-revalidate=300",
  ); // tune as needed

  return res.status(200).send(htmlContent);
}
