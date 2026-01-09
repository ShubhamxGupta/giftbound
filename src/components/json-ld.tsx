export function JsonLd() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://giftbound.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GiftBound",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "The easiest way to organize Secret Santa exchanges with friends and family. No accounts required, totally private.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    url: baseUrl,
    author: {
      "@type": "Person",
      name: "Shubham Gupta",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
