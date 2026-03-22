import { NextRequest, NextResponse } from "next/server"; // ← this line is valid on Vercel

export const config = {
  matcher: [
    // Run on SPA routes only (skip static assets, api/* if you have any, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
  runtime: "edge", // or 'nodejs' if you need full Node APIs
};

export default async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Quick bot/crawler detection (expand as needed)
  const ua = request.headers.get("user-agent") || "";
  const isBot =
    /bot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Telegram|Discord|embedly/i.test(
      ua,
    );

  if (!isBot) {
    // Real users → proceed normally (Vercel serves index.html for SPA)
    return NextResponse.next();
  }

  // Bot only: fetch original response & transform
  const originalResponse = await fetch(request.url, {
    headers: {
      ...Object.fromEntries(request.headers),
      "x-middleware-subrequest": "middleware", // prevents recursion
    },
  });

  if (!originalResponse.ok || !originalResponse.body) {
    return originalResponse;
  }

  // Use HTMLRewriter (Edge-native, streaming)
  const rewriter = new HTMLRewriter()
    .on("title", {
      element(el) {
        el.setInnerContent(getDynamicTitle(pathname));
      },
    })
    .on('meta[property="og:title"]', {
      element(el) {
        el.setAttribute("content", getDynamicTitle(pathname));
      },
    })
    .on('meta[property="og:description"]', {
      element(el) {
        el.setAttribute("content", getDynamicDescription(pathname));
      },
    })
    .on('meta[property="og:image"]', {
      element(el) {
        el.setAttribute("content", getDynamicImage(pathname));
      },
    })
    .on('meta[property="og:url"]', {
      element(el) {
        el.setAttribute("content", url.href);
      },
    });
  // Add more .on() for twitter:*, name="description", etc.

  const transformed = rewriter.transform(originalResponse);

  return transformed;
}

// Your route-based logic (can fetch KV, compute from pathname, etc.)
function getDynamicTitle(path: string): string {
  if (path.startsWith("/product/")) {
    const id = path.split("/")[2] || "Unknown";
    return `Product ${id} – My SPA`;
  }
  return "My SPA Title";
}

function getDynamicDescription(path: string): string {
  // similar logic...
  return "Default SPA description for social previews";
}

function getDynamicImage(path: string): string {
  const base = `https://${process.env.VERCEL_URL || "your-domain.com"}`;
  if (path.startsWith("/product/")) {
    const id = path.split("/")[2] || "default";
    return `${base}/og-images/product-${id}.png`;
  }
  return `${base}/og-images/default.png`;
}
