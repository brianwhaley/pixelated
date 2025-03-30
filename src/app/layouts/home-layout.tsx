import React, { Fragment } from "react"
import Header from "@/app/elements/header"
import Hero from "@/app/elements/hero"
import Nav from "@/app/elements/nav"
import Search from '@/app/elements/search'
import Footer from '@/app/elements/footer'

export default function HomeLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <Fragment>
        <header className="grid12">
          <div id="page-header" className="grid12 fixed-header">
            <Header />
          </div>
          <div id="fixed-header-spacer" className="grid12">
          </div>
            <Hero />
          <div id="page-search" className="grid12 noMobile">
            <Search />
          </div>
        </header>
        <nav>
          <Nav />
        </nav>
        <main className="grid12">
          {children} 
        </main>
        <footer className="grid12">
          <Footer />
        </footer>
    </Fragment>
  );
}
