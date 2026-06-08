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
  metadataBase: new URL('https://solstay.in'),
  title: {
    default: "SOL Stay | Premium Co-Living & Furnished PG in Pune",
    template: "%s | SOL Stay Co-Living Pune"
  },
  description:
    "Discover premium co-living spaces and fully furnished PG in Pune for students and working professionals. Locations in Kharadi, Viman Nagar, and Lohegaon. Book a tour today!",
  keywords: [
    "PG in Pune",
    "Boys PG in Pune",
    "Co-Living in Pune",
    "Furnished PG in Pune",
    "PG for Students in Pune",
    "PG for Working Professionals in Pune",
    "PG in Kharadi",
    "Co-Living in Kharadi",
    "SOL Stay",
  ],
  authors: [{ name: "SOL Stay Co-Living" }],
  openGraph: {
    title: "SOL Stay | Premium Co-Living & Furnished PG in Pune",
    description:
      "Premium co-living spaces and furnished PG for students and working professionals across Pune (Kharadi, Viman Nagar, Lohegaon).",
    url: 'https://solstay.in',
    type: "website",
    locale: "en_IN",
    siteName: "SOL Stay Co-Living",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOL Stay | Premium Co-Living & Furnished PG in Pune",
    description:
      "Premium co-living spaces and furnished PG for students and working professionals across Pune (Kharadi, Viman Nagar, Lohegaon).",
  },
  alternates: {
    canonical: '/',
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
