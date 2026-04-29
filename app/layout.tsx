import type { Metadata } from "next";
import Script from "next/script";
import "./globals.scss";
import { AppShell } from "@/components/app-shell";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();
const siteName = "AI Stack Lab";
const description = "Tested AI tools, workflows, and stacks for people who actually ship.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  keywords: [
    "AI tools directory",
    "best AI tools",
    "AI tools for developers",
    "AI workflow tools",
    "AI Stack Lab",
    "BuildWithShashank",
  ],
  authors: [{ name: "Shashank Shekhar", url: siteUrl }],
  creator: "Shashank Shekhar",
  publisher: "BuildWithShashank",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description,
    siteName,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AI Stack Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/og-image.svg"],
    creator: "@shekharbuilds",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

// Inline script injected into <head> before first paint to prevent FOUC.
// Reads localStorage "theme" and applies data-theme on <html> immediately.
// Default is "light" when no preference is stored.
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        {/* FOUC prevention — must run before any paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JGPPGPKBZH" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-JGPPGPKBZH');`}
        </Script>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
