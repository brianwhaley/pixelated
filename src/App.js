import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./pages/nav";
import Header from "./pages/header";
import Hero from "./pages/hero";
import Search from "./pages/search";
import Footer from "./pages/footer";

import Home from "./pages/home";
import MyResume from "./pages/resume";
import Gallery from "./pages/gallery";
import SocialMedia from "./pages/socialmedia";
import Stkr from "./pages/stkr";
import Photography from "./pages/photography";
import Recipes from "./pages/recipes";
import NotFound from "./pages/notfound";

export default class App extends Component {
	render () {
		return (

			<Fragment>

				<header className="grid12">
					<div id="page-header" className="grid12 fixed-header">
						<Header></Header>
					</div>
					<div id="fixed-header-spacer" className="grid12"></div>
					<Router>
						<Route exact path='/' component={Hero}/>
						<Route exact path='/index.html' component={Hero}/>
					</Router>
					<div id="page-search" className="grid12 noMobile">
						<Search></Search>
					</div>
				</header>

				<nav>
					<Nav></Nav>
				</nav>

				<main className="grid12">
					<Router>
						<Switch>
							<Route exact path='/' component={Home}/>
							<Route path='/index.html' component={Home}/>
							<Route path='/resume.html' component={MyResume}/>
							<Route path='/gallery.html' component={Gallery}/>
							<Route path='/socialmedia.html' component={SocialMedia}/>
							<Route path='/stkr.html' component={Stkr}/>
							<Route path='/photography.html' component={Photography}/>
							<Route path='/recipes.html' component={Recipes}/>
							<Route exact path='*' component={NotFound} />
						</Switch>
					</Router>
				</main>

				<footer className="grid12">
					<Footer></Footer>
				</footer>

			</Fragment>

		);
	}
}
