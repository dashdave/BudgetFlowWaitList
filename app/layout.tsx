import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "PromptlyBuilt",
  description: "Create a Beautiful Portfolio From Curated Templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" ></link>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={`antialiased`}
      >
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
