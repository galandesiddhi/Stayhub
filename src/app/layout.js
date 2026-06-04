import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "StayHub Co-Living | Premium Co-Living Spaces",
  description:
    "Discover premium co-living spaces designed for modern professionals. Fully furnished rooms, world-class amenities, vibrant community, and meals included — all in one monthly rent.",
  keywords: [
    "co-living",
    "coliving spaces",
    "shared living",
    "furnished rooms",
    "student housing",
    "professional housing",
    "StayHub",
  ],
  authors: [{ name: "StayHub Co-Living" }],
  openGraph: {
    title: "StayHub Co-Living | Premium Co-Living Spaces",
    description:
      "Fully furnished co-living spaces with world-class amenities and vibrant community.",
    type: "website",
    locale: "en_US",
    siteName: "StayHub Co-Living",
  },
  twitter: {
    card: "summary_large_image",
    title: "StayHub Co-Living | Premium Co-Living Spaces",
    description:
      "Fully furnished co-living spaces with world-class amenities and vibrant community.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
