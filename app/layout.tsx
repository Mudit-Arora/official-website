import type { Metadata } from "next";
import localFont from "next/font/local";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import "./globals.css";

const instrumentSerif = localFont({
  src: "./fonts/instrument-serif.woff2",
  weight: "400",
  variable: "--font-instrument-serif",
  display: "block",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "block",
});

export const metadata: Metadata = {
  title: "Mudit Arora, member of technical staff at Synhawk",
  description:
    "Mudit Arora is a member of technical staff at Synhawk. Projects, photos and writing from the Bay Area.",
  openGraph: {
    title: "Mudit Arora",
    description: "Member of technical staff at Synhawk. Projects, photos and writing.",
  },
};

// Runs before paint: ?theme= override, then a saved choice, then the system preference.
const themeScript = `(function(){try{var q=new URLSearchParams(location.search).get("theme");var s=null;try{s=localStorage.getItem("theme")}catch(e){}var t=q||s||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body>
        <Background />
        <a
          href="#content"
          className="caption-4 absolute -left-[999px] top-3 z-20 bg-ink px-3 py-2 text-bg focus:left-3"
        >
          Skip to content
        </a>
        <Nav />
        {/* Skip link target; pages kept mounted by the router stay inside it. */}
        <div id="content" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
