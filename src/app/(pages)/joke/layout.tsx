"use client" 

import { usePathname } from 'next/navigation';
import React from "react"
import { getMetadata } from "@/app/elements/metadata"
/* import "../globals.css"; */

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const metadata = getMetadata({key:"path", value: pathname})
  return (
    <html lang="en">
      <head>
      <title>{metadata.title}</title>
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content="" />
      <meta name="google-site-verification" content="t2yy9wL1bXPiPQjBqDee2BTgpiGQjwVldlfa4X5CQkU" />
      <meta name="google-site-verification" content="l7D0Y_JsgtACBKNCeFAXPe-UWqo13fPTUCWhkmHStZ4" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
      <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
      <link rel="alternate" href="www.pixelated.tech" hrefLang="en-us" />
      <link rel="manifest" href="/manifest.json" />
    </head>
      <body>
        <header className="grid12"></header>
        <nav></nav>
        <main className="grid12">
          {children} 
        </main>
        <footer className="grid12"></footer>
      </body>
    </html>
  );
}
