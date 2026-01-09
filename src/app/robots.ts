import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://giftbound.vercel.app";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Assuming admin routes should be private
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
