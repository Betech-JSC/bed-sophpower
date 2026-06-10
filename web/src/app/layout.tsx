import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SophchemHeader from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Toolbar from "@/components/layout/toolbar";

const googleSansFlex = Google_Sans_Flex({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-google-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#106d38",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sophpower Vietnam - Nguyên liệu Thực phẩm & Mỹ phẩm",
  description:
    "Sophpower là công ty thương mại đa quốc gia có trụ sở tại Việt Nam, chuyên cung cấp các giải pháp nguyên liệu thực phẩm và mỹ phẩm chất lượng cao, an toàn và đạt tiêu chuẩn quốc tế.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={googleSansFlex.variable}>
      <body className="antialiased font-sans">
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
      {/* impeccable-live-start */}
<script async src="http://localhost:8400/live.js"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
