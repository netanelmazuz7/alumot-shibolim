import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "אלומות שיבולים | הגנה הדדית לרכב שלך",
  description:
    "קהילת הגנה הדדית לרכבים בישראל. חיסכון של אלפי שקלים בשנה על ההגנה המקיפה לרכב — ללא מתווכים מסורתיים.",
  keywords: "הגנה הדדית לרכב, קהילת רכב, P2P, חיסכון, אלומות שיבולים, ישראל",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.className}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
