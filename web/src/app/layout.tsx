import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/i18n/provider";
import { applyDynamicTranslations } from "@/i18n/dynamic-translations";
import SophchemHeader from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Toolbar from "@/components/layout/toolbar";
import { api } from "@/lib/api";

const googleSansFlex = Google_Sans_Flex({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-google-sans",
  display: "swap",
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  themeColor: "#106d38",
  width: "device-width",
  initialScale: 1,
};

import { getLocaleServer } from "@/lib/get-locale-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleServer();
  let settings: any = null;
  try {
    settings = await api.getSettings();
  } catch (e) {
    console.error("Failed to load settings for metadata:", e);
  }

  const title = locale === "vi"
    ? (settings?.meta_title_vi || "Sophpower Vietnam - Nguyên liệu Thực phẩm & Mỹ phẩm")
    : (settings?.meta_title_en || "Sophpower Vietnam - Premium Food & Cosmetic Ingredients");

  const description = locale === "vi"
    ? (settings?.meta_desc_vi || "Sophpower là công ty thương mại đa quốc gia có trụ sở tại Việt Nam, chuyên cung cấp các giải pháp nguyên liệu thực phẩm và mỹ phẩm chất lượng cao, an toàn và đạt tiêu chuẩn quốc tế.")
    : (settings?.meta_desc_en || "Sophpower is a multinational trading company based in Vietnam, supplying premium, safe, and internationally certified food and cosmetic ingredients.");

  const keywords = locale === "vi"
    ? (settings?.meta_keywords_vi || "phụ gia thực phẩm, nguyên liệu mỹ phẩm, Beta-carotene, Carmine, Niacinamide")
    : (settings?.meta_keywords_en || "food additives, cosmetic ingredients, Beta-carotene, Carmine, Niacinamide");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  let shareImageUrl = settings?.site_logo ? api.getImageUrl(settings.site_logo) : `${baseUrl}/images/logo.png`;
  if (shareImageUrl.startsWith("/")) {
    shareImageUrl = `${baseUrl}${shareImageUrl}`;
  }

  return {
    title,
    description,
    keywords,
    icons: {
      icon: settings?.site_favicon ? api.getImageUrl(settings.site_favicon) : "/favicon.ico",
    },
    openGraph: {
      type: "website",
      url: baseUrl,
      title,
      description,
      siteName: "Sophpower Vietnam",
      images: [{
        url: shareImageUrl,
        width: 800,
        height: 800,
        alt: "Sophpower Vietnam Logo",
      }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [shareImageUrl],
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: any = null;
  let translations: any = null;
  try {
    settings = await api.getSettings();
  } catch (e) {
    console.error("Failed to load settings in RootLayout:", e);
  }

  try {
    translations = await api.getTranslations();
  } catch (e) {
  }

  if (translations) {
    applyDynamicTranslations(translations);
  }

  return (
    <html lang="vi" suppressHydrationWarning className={googleSansFlex.variable}>
      <body className="antialiased font-sans">
        {settings?.header_scripts && (
          <div
            id="header-scripts-container"
            style={{ display: "none" }}
            dangerouslySetInnerHTML={{ __html: settings.header_scripts }}
          />
        )}
        <I18nProvider initialTranslations={translations}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col bg-white text-gray-900">
              <SophchemHeader />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toolbar />
            </div>
          </ThemeProvider>
        </I18nProvider>
        {settings?.footer_scripts && (
          <div
            id="footer-scripts-container"
            style={{ display: "none" }}
            dangerouslySetInnerHTML={{ __html: settings.footer_scripts }}
          />
        )}
      {/* impeccable-live-start */}
<script async src="http://localhost:8400/live.js"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
