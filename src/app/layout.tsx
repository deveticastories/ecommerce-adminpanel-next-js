import type { Metadata } from "next";
import AppProviders from "@/components/providers/AppProviders";
import { APP_NAME } from "@/utils/Constants";
import { fontVariables } from "@/utils/Fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${APP_NAME} — Admin Panel`, template: `%s · ${APP_NAME}` },
  description:
    "Aavya Heritage & Bachpan Boutique — single-vendor admin panel for a ladies & kids ethnic garments shop: products, orders, customers, coupons and shop settings.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets the `dark` class before hydration, so the attribute is expected to differ.
    <html lang="en" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
