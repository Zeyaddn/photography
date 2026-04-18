import { Inter, Cairo, Playfair_Display, Pinyon_Script } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import "../styles/bootstrap.min.css";
import "../styles/boxicons.min.css";

import "../components/Preloader/Preloader.css";
import "../components/CursorGlow/CursorGlow.css";
import "../components/Navbar/Navbar.css";
import "../components/Hero/Hero.css";
import "../components/Gallery/Gallery.css";
import "../components/Projects/Projects.css";
import "../components/About/About.css";
import "../components/Blog/Blog.css";
import "../components/Contact/Contact.css";
import "../components/Footer/Footer.css";
import "../components/BackToTop/BackToTop.css";

const inter = Inter({ subsets: ["latin"], display: 'swap', variable: '--font-inter' });
const cairo = Cairo({ subsets: ["arabic", "latin"], display: 'swap', variable: '--font-cairo' });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ['400', '700', '900'], style: ['italic', 'normal'], variable: '--font-playfair' });
const signature = Pinyon_Script({ subsets: ["latin"], weight: ['400'], variable: '--font-signature' });

export const metadata = {
  title: "Lens of Creativity | Ziad El Asad — Professional Photographer",
  description: "Lens of Creativity — Professional photography portfolio by Ziad El Asad, specializing in landscape and architecture photography.",
  keywords: ["photographer", "nature photography", "architecture photography", "portfolio", "professional photographer", "Ziad El Asad"],
  alternates: {
    canonical: "https://lensofcreativity.com",
  },
  openGraph: {
    title: "Lens of Creativity | Ziad El Asad",
    description: "Professional photography portfolio by Ziad El Asad.",
    url: "https://lensofcreativity.com",
    siteName: "Lens of Creativity",
    images: [
      {
        url: "https://res.cloudinary.com/dma99iya8/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
        width: 1200,
        height: 630,
        alt: "Lens of Creativity Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lens of Creativity | Ziad El Asad",
    description: "Professional photography portfolio by Ziad El Asad.",
    images: ["https://res.cloudinary.com/dma99iya8/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1542038784456-1ea8e935640e"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${cairo.variable} ${playfair.variable} ${signature.variable}`}>
      <head>
        {/* Security and Performance Headers */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        {/* Locally hosted Bootstrap JS - Improved Best Practices / Third-party Cookie removal */}
        <Script src="/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
