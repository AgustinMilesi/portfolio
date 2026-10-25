import type { Metadata, Viewport } from "next";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import "./globals.css";

const isGithubPages = process.env.DEPLOY_TARGET === "gh-pages";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPages ? "/portfolio" : "");

export const viewport: Viewport = {
  themeColor: "#0A0E14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://agustinmilesi.github.io/portfolio/"),
  title: "Agustín Milesi · VOUT Architecture — Software de Gestión que Entiende la Operación",
  description:
    "Ecosistema de software de gestión de alta disponibilidad: Punto de venta retail para cajeros reales, logística aduanera de carga internacional, CRM de ingesta multicanal y finanzas personales soberanas. Creado por Agustín Milesi.",
  applicationName: "VOUT Architecture",
  keywords: [
    "Agustín Milesi",
    "VOUT",
    "VOUT Retail",
    "VOUT Cargo",
    "VOUT Inbox",
    "VOUT Pocket",
    "Point of Sale",
    "SaaS Architecture",
    "Retail ERP",
    "Customs Freight Logistics",
    "Next.js",
    "PostgreSQL",
    "TypeScript",
    "Offline-First",
  ],
  authors: [{ name: "Agustín Milesi", url: "https://github.com/AgustinMilesi" }],
  creator: "Agustín Milesi",
  publisher: "VOUT Ecosystem",
  alternates: {
    canonical: basePath ? `${basePath}/` : "/",
  },
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/favicon.ico`, sizes: "any" },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png` },
    ],
  },
  openGraph: {
    title: "Agustín Milesi · VOUT Software Architecture",
    description:
      "Entra el caos. Sale el dato. Software de gestión que entiende la operación: Retail POS, Freight, CRM & Personal Cashflow.",
    url: "https://agustinmilesi.github.io/portfolio/",
    siteName: "VOUT Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: `${basePath}/apple-touch-icon.png`,
        width: 512,
        height: 512,
        alt: "VOUT Official Mark · Agustín Milesi Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agustín Milesi · VOUT Architecture",
    description: "Software de gestión que entiende la operación. Creado por Agustín Milesi.",
    images: [`${basePath}/apple-touch-icon.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark bg-[#0A0E14] text-[#E9E7E0] antialiased selection:bg-[#C6F827] selection:text-[#0A0E14]">
      <head>
        <link rel="icon" href={`${basePath}/icon.svg`} type="image/svg+xml" />
        <link rel="alternate icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="apple-touch-icon" href={`${basePath}/apple-touch-icon.png`} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0A0E14] technical-grid text-[#E9E7E0] font-sans">
        <PreferencesProvider>
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
