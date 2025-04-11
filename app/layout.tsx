import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { fontSans } from "@/lib/fonts";
import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Roboto_Serif } from "next/font/google";
import { Providers } from "./providers";

const robotoSerif = Roboto_Serif({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify API",
  description:
    "A small Next.js Application that uses the Spotify API to search for your favorite artists!",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl flex-grow px-12 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
