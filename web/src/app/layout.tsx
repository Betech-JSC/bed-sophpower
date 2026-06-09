import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SophchemHeader from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Toolbar from "@/components/layout/toolbar";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#106d38",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pioneer Herb Industrial Co., Ltd. - Sophpower Vietnam",
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
    <html lang="vi" suppressHydrationWarning className={roboto.variable}>
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
