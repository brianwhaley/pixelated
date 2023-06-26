import React, { Component, Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CustomSunglasses from '../customsunglasses'
import Ebay from '../ebay'
import FormBuild from '../formbuild'
import FormExtract from '../formextract'
import Form from '../form'
import Gallery from '../gallery'
import Home from '../home'
import Joke from '../joke'
import NerdJokes from '../nerdjokes'
import Photography from '../photography'
import Recipes from '../recipes'
import Readme from '../readme'
import MyResume from '../resume'
import SocialMedia from '../socialmedia'
import Stkr from '../stkr'
import NotFound from '../notfound'

export default class MyRoutes extends Component {
	
	render () {
		return (
			<Fragment>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/customsunglasses.html' element={<CustomSunglasses />} />
						<Route path='/ebay.html' element={<Ebay />} />
						<Route path='/formbuild.html' element={<FormBuild />} />
						<Route path='/formextract.html' element={<FormExtract />} />
						<Route path='/form.html' element={<Form />} />
						<Route path='/gallery.html' element={<Gallery />} />
						<Route path='/index.html' element={<Home />} />
						<Route path='/joke.html' element={<Joke />} />
						<Route path='/nerdjokes.html' element={<NerdJokes />} />
						<Route path='/photography.html' element={<Photography />} />
						<Route path='/readme.html' element={<Readme />} />
						<Route path='/recipes.html' element={<Recipes />} />
						<Route path='/readme.html' element={<Readme />} />
						<Route path='/resume.html' element={<MyResume />} />
						<Route path='/socialmedia.html' element={<SocialMedia />} />
						<Route path='/stkr.html' element={<Stkr />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</Fragment>
		)
	}
}
