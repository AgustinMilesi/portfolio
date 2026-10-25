import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0A0E14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vout.network"),
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
    "VOUT Connect",
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
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Agustín Milesi · VOUT Software Architecture",
    description:
      "Entra el caos. Sale el dato. Software de gestión que entiende la operación: Retail POS, Freight, CRM & Personal Cashflow.",
    url: "https://vout.network",
    siteName: "VOUT Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/apple-touch-icon.png",
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
    images: ["/apple-touch-icon.png"],
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
      <body className="min-h-screen flex flex-col bg-[#0A0E14] technical-grid text-[#E9E7E0] font-sans">
        {children}
      </body>
    </html>
  );
}
