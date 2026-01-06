import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale, localeNames } from '@/i18n/config';
import MotionProvider from "@/components/providers/MotionProvider";
import { GoogleAnalytics, PlausibleAnalytics, MicrosoftClarity } from "@/components/analytics";
import "../globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://squarefaceai.com";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const t = messages.metadata as { title: string; description: string };

  // Generate alternate language links
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = loc === 'en' ? siteUrl : `${siteUrl}/${loc}`;
  });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t?.title || "SquareFaceAI - Free AI Pixel Avatar Generator | Square Face Icon Maker",
      template: "%s | SquareFaceAI"
    },
    description: t?.description || "Transform your photo into a unique square face pixel avatar with AI. Free online pixel avatar generator for Discord, Twitter, gaming profiles.",
    keywords: [
      "square face avatar generator",
      "pixel avatar maker",
      "ai avatar generator from photo",
      "discord avatar generator",
      "pixel art avatar",
      "square face icon generator",
      "photo to pixel avatar",
      "free avatar maker",
      "gaming avatar generator",
      "twitter profile picture generator",
      "cute pixel avatar",
      "minecraft style avatar",
    ],
    authors: [{ name: "SquareFaceAI", url: siteUrl }],
    creator: "SquareFaceAI",
    publisher: "SquareFaceAI",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: locale === 'en' ? siteUrl : `${siteUrl}/${locale}`,
      languages,
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/logo.svg", sizes: "180x180", type: "image/svg+xml" },
      ],
    },
    openGraph: {
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      url: locale === 'en' ? siteUrl : `${siteUrl}/${locale}`,
      siteName: "SquareFaceAI",
      title: t?.title || "SquareFaceAI - Free AI Pixel Avatar Generator",
      description: t?.description || "Transform your photo into a unique square face pixel avatar with AI. Free, fast, no signup required!",
    },
    twitter: {
      card: "summary_large_image",
      title: t?.title || "SquareFaceAI - Free AI Pixel Avatar Generator",
      description: t?.description || "Transform your photo into a unique square face pixel avatar with AI. Free, fast, no signup!",
      creator: "@squarefaceai",
    },
    category: "technology",
  };
}

// JSON-LD Structured Data
function getJsonLd(locale: string, messages: Record<string, unknown>) {
  const t = messages.faq as { questions: Record<string, { q: string; a: string }> };
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "SquareFaceAI",
        description: "AI-powered pixel avatar generator",
        inLanguage: locale,
        publisher: {
          "@id": `${siteUrl}/#organization`
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "SquareFaceAI",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.svg`,
          width: 180,
          height: 180
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#app`,
        name: "SquareFaceAI",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
          bestRating: "5",
          worstRating: "1"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: t?.questions ? Object.values(t.questions).map((qa) => ({
          "@type": "Question",
          name: qa.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: qa.a
          }
        })) : []
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: pageUrl
          }
        ]
      }
    ]
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for this locale
  const messages = await getMessages();

  const jsonLd = getJsonLd(locale, messages as Record<string, unknown>);

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <GoogleAnalytics />
        <PlausibleAnalytics />
        <MicrosoftClarity />
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            {children}
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
