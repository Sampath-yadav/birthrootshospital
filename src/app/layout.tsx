import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Nunito_Sans, Plus_Jakarta_Sans } from "next/font/google";

import { MobileBottomBar } from "~/app/_components/layout/mobile-bottom-bar";
import { SiteFooter } from "~/app/_components/layout/site-footer";
import { SiteHeader } from "~/app/_components/layout/site-header";
import { BRAND } from "~/config/brand";
import { LOCALE, metadataBase, SITE_NAME } from "~/lib/seo";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  metadataBase,
  // Inner pages set their own title; this suffix keeps the brand and place in every tab.
  title: {
    default: `${BRAND.name} | Maternity, IVF & Laparoscopy in Mancherial`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Birth Roots Women Hospital, Mancherial: maternity and delivery, gynaecology, laparoscopy, IVF and fertility care by Dr. Shruthi Goli. 50-bed hospital with 24/7 emergency. Book an appointment.",
  applicationName: SITE_NAME,
  // Icons come from src/app/icon.png and apple-icon.png (the logo mark).
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: { type: "website", siteName: SITE_NAME, locale: LOCALE },
  formatDetection: { telephone: true, address: true },
  // TODO(user): add verification tokens once Google Search Console is set up.
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Without JavaScript nothing can un-hide a reveal, so show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <TRPCReactProvider>
          <a
            href="#main"
            className="bg-ink fixed top-2 left-2 z-[100] -translate-y-20 rounded-md px-4 py-2 text-white focus:translate-y-0"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileBottomBar />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
