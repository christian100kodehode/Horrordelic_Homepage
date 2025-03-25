export async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  let title = "Horrordelic";
  let description = "Darkpsy Life";
  let ogImage = "https://horrordelic.com/sawlogoWebpage.png";

  if (pathname === "/") {
    title = "Home Page";
    description = "Welcome to the home page!";
    ogImage = "https://yourdomain.com/home-image.jpg";
  } else if (pathname.startsWith("/Artist")) {
    title = "Artists";
    description = "Learn more about our team.";
    ogImage = "https://horrordelic.com/assets/horrordelic-b7d217dd.jpg";
  } else if (pathname.startsWith("/Release")) {
    title = "Products";
    description = "Check out our killer releases.";
    ogImage =
      "https://horrordelic.com/assets/HorrordelicLogo300x300-d872b950.png";
  }
  // Fetch the original HTML response
  const response = await fetch(request);
  const html = await response.text();

  // Inject dynamic meta tags into the <head>
  const modifiedHtml = html
    .replace("<title>Vite + React</title>", `<title>${title}</title>`)
    .replace(
      "</head>",
      `<meta name="description" content="${description}">
       <meta property="og:title" content="${title}">
       <meta property="og:description" content="${description}">
       <meta property="og:image" content="${ogImage}">
       <meta property="og:url" content="${request.url}">
       <meta name="twitter:card" content="summary_large_image">
       </head>`
    );

  return new Response(modifiedHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

// Middleware configuration
export const config = {
  matcher: "/:path*", // Apply to all routes
};
