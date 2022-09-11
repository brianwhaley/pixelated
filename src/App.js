import React, { Component, Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./pages/nav";
import Header from "./pages/header";
import Hero from "./pages/hero";
import Search from "./pages/search";
import Footer from "./pages/footer";

import Home from "./pages/home";
import MyResume from "./pages/resume";
import Photography from "./pages/photography";
import Gallery from "./pages/gallery";
import CustomSunglasses from "./pages/customsunglasses";
import SocialMedia from "./pages/socialmedia";
import Stkr from "./pages/stkr";
import NerdJokes from "./pages/nerdjokes";
import Joke from "./pages/joke";
import Recipes from "./pages/recipes";
import Ebay from "./pages/ebay";
import NotFound from "./pages/notfound";

export default class App extends Component {
	render () {
		return (

			<Fragment>

				<header className="grid12">
					<div id="page-header" className="grid12 fixed-header">
						<Header />
					</div>
					<div id="fixed-header-spacer" className="grid12"></div>
					<BrowserRouter>
						<Routes>
							<Route exact path='/' element={<Hero />}/>
							<Route exact path='/index.html' element={<Hero />}/>
						</Routes>
					</BrowserRouter>
					<div id="page-search" className="grid12 noMobile">
						<Search />
					</div>
				</header>

				<nav>
					<Nav />
				</nav>

				<main className="grid12">
					<BrowserRouter>
						<Routes>
							<Route exact path='/' element={<Home />}/>
							<Route path='/index.html' element={<Home />}/>
							<Route path='/resume.html' element={<MyResume />}/>
							<Route path='/photography.html' element={<Photography />}/>
							<Route path='/gallery.html' element={<Gallery />}/>
							<Route path='/customsunglasses.html' element={<CustomSunglasses />}/>
							<Route path='/socialmedia.html' element={<SocialMedia />}/>
							<Route path='/stkr.html' element={<Stkr />}/>
							<Route path='/nerdjokes.html' element={<NerdJokes />}/>
							<Route path='/joke.html' element={<Joke />}/>
							<Route path='/recipes.html' element={<Recipes />}/>
							<Route path='/ebay.html' element={<Ebay />}/>
							<Route exact path='*' element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</main>

				<footer className="grid12">
					<Footer></Footer>
				</footer>

			</Fragment>

		);
	}
}
