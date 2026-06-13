import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "만성질환 디코더 | Chronic Disease Decoder",
  description: "혈압과 콜레스테롤, 숫자 너머의 진실을 탐구하는 교육용 인터랙티브 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
