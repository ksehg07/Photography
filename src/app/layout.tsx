import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navigation/Navbar";
import { ReactLenis } from "lenis/react";

export const metadata: Metadata = {
  title: "Photographer & Director Portfolio",
  description: "A cinematic portfolio showcasing photography and filmmaking work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactLenis root>
          <Navbar />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
