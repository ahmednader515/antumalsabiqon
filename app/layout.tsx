import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Flashlight } from "@/components/ui/flashlight";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "انتم السابقون | لعبة رعب جماعية تنافسية | Antum Alsabiqon",
  description: "انتم السابقون هي لعبة رعب جماعية، حيث ينقسم اللاعبون بين ناجين يسعون للهروب ووحش يسعى لإسكاتهم للأبد. استعد لأجواء مشحونة بالتوتر، خرائط مظلمة، ومهام بقاء تتطلب التعاون، التخفي، واتخاذ قرارات مصيرية تحت الضغط.",
  keywords: [
    "انتم السابقون", 
    "لعبة انتم السابقون", 
    "Antum Alsabiqon", 
    "antumalsabiqon",
    "لعبة رعب", 
    "لعبة رعب متعددة اللاعبين", 
    "لعبة تعاونية", 
    "لعبة ناجين", 
    "لعبة وحوش", 
    "لعبة اونلاين",
    "horror game",
    "survival horror",
    "multiplayer horror",
    "Arabic horror game"
  ],
  authors: [{ name: "MordeSu studio" }],
  publisher: "Mordecai",
  category: "Game",
  creator: "MordeSu studio",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', sizes: '32x32' },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://antumalsabiqon.com",
    title: "انتم السابقون | لعبة رعب جماعية تنافسية",
    description: "انتم السابقون هي لعبة رعب جماعية، حيث ينقسم اللاعبون بين ناجين يسعون للهروب ووحش يسعى لإسكاتهم للأبد. استعد لأجواء مشحونة بالتوتر وتحديات مثيرة.",
    siteName: "انتم السابقون",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "انتم السابقون logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "انتم السابقون | لعبة رعب جماعية تنافسية",
    description: "انتم السابقون هي لعبة رعب جماعية، حيث ينقسم اللاعبون بين ناجين يسعون للهروب ووحش يسعى لإسكاتهم للأبد.",
    images: ["/logo.png"],
    creator: "@MordeSuStudio",
  },
  alternates: {
    canonical: "https://antumalsabiqon.com",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark bg-black">
      <head>
        <link rel="preload" href="/font.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/font-2.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "VideoGame",
              "name": "انتم السابقون",
              "alternateName": "Antum Alsabiqon",
              "description": "انتم السابقون هي لعبة رعب جماعية، حيث ينقسم اللاعبون بين ناجين يسعون للهروب ووحش يسعى لإسكاتهم للأبد. استعد لأجواء مشحونة بالتوتر، خرائط مظلمة، ومهام بقاء تتطلب التعاون.",
              "image": "https://antumalsabiqon.com/logo.png",
              "url": "https://antumalsabiqon.com",
              "author": {
                "@type": "Organization",
                "name": "MordeSu studio",
                "url": "https://www.mordesustudio.com/"
              },
              "publisher": "Mordecai",
              "applicationCategory": "Game",
              "genre": ["Horror", "Survival", "Multiplayer"],
              "operatingSystem": "Windows",
              "gamePlatform": "PC",
              "contentRating": "Mature",
              "offers": {
                "@type": "Offer",
                "url": "https://store.steampowered.com/app/3666640/_/",
                "availability": "PreOrder"
              }
            }
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-black antialiased">
        <Flashlight enabled={true} excludeSections={['hero']} />
        <Header />
        <main className="bg-black">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
