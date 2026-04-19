import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import AccessibilityMenu from "@/components/AccessibilityMenu";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "אלומת שיבולים | הגנה הדדית לרכב שלך",
  description:
    "קהילת הגנה הדדית לרכבים בישראל. חיסכון של אלפי שקלים בשנה על ההגנה המקיפה לרכב - ללא מתווכים מסורתיים.",
  keywords: "הגנה הדדית לרכב, קהילת רכב, P2P, חיסכון, אלומת שיבולים, ישראל",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="he" dir="rtl" className={heebo.className}>
      <body className="min-h-screen flex flex-col">
        {children}
        <AccessibilityMenu />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
