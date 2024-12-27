import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Get the site URL from environment variable, fallback to localhost
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const getJsonLd = (date: string) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PCSO Lotto Results Philippines",
    description: `Official PCSO lottery results and winning numbers for ${date}`,
  };

  // Add additional data if we have a production URL
  if (siteUrl !== "http://localhost:3000") {
    return {
      ...baseData,
      url: siteUrl,
      publisher: {
        "@type": "Organization",
        name: "PCSO Lotto Results",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
    };
  }

  return baseData;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentDate = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <html lang="en-PH">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getJsonLd(currentDate)),
          }}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="content-language" content="en-PH" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const currentDate = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const baseMetadata: Metadata = {
    title: {
      template: "%s | PCSO Lotto Results Philippines",
      default: `PCSO Lotto Results for ${currentDate}`,
    },
    description: `Check today's PCSO lottery results for ${currentDate}. Get the latest winning numbers and jackpot prizes for all Philippine lottery games including Ultra Lotto 6/58, Grand Lotto 6/55, and more.`,
    keywords: [
      "PCSO results",
      "Lotto results",
      "Philippine lottery",
      "PCSO lotto",
      "Grand Lotto 6/55",
      "Ultra Lotto 6/58",
      "Super Lotto 6/49",
      "Mega Lotto 6/45",
      "Philippine lottery results",
    ],
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_PH",
      title: `PCSO Lotto Results Philippines - ${currentDate}`,
      description: `Check today's PCSO Lotto results. Get winning numbers and jackpot prizes for all Philippine lottery games. Updated after every draw.`,
    },
  };

  // Add production-specific metadata if we have a domain
  if (siteUrl !== "http://localhost:3000") {
    return {
      ...baseMetadata,
      metadataBase: new URL(siteUrl),
      alternates: {
        canonical: "/",
      },
      openGraph: {
        ...baseMetadata.openGraph,
        url: siteUrl,
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "PCSO Lotto Results Philippines",
          },
        ],
      },
    };
  }

  return baseMetadata;
}
