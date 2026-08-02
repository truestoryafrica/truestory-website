import { Barlow_Condensed, DM_Sans, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { site } from "@/content/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap"
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

export const viewport = {
  themeColor: "#151515",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${montserrat.variable} ${barlowCondensed.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preload" href="/assets/images/hero-poster.webp" as="image" fetchPriority="high" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('truestory-theme')||'dark';document.documentElement.dataset.theme=t;}catch(e){}"
          }}
        />
      </head>
      <body>
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  applicationName: site.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "business",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/assets/icons/logo-mark.svg",
    shortcut: "/assets/icons/logo-mark.svg",
    apple: "/assets/icons/logo-mark.svg"
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};
