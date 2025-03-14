import React from 'react'

import CustomSunglasses from '../customsunglasses'
import Ebay from '../ebay'
import FormBuild from '../formbuild'
import FormExtract from '../formextract'
import Form from '../form'
import Gallery from '../gallery'
import Home from '../home'
import Joke from '../joke'
import NerdJokes from '../nerdjokes'
import Recipes from '../recipes'
import Readme from '../readme'
import Requests from '../requests'
import MyResume from '../resume'
import SocialMedia from '../socialmedia'
import Stkr from '../stkr'
import NotFound from '../notfound'

export const routes = [
	{ "path" : "/", "element" : <Home /> },
	{ "name" : "Home", "path" : "/index.html", "element" : <Home /> },
	{ "name" : "Resume", "path" : "/resume.html", "element" : <MyResume /> },
	{ "name" : "ReadMe", "path" : "/readme.html", "element" : <Readme /> },
	{ "name" : "Work Portfolio", "path" : "/workportfolio.html", "element" : <Gallery tag={"portfolio-all"} /> },
	{ "name" : "Photo Gallery", "path" : "/photogallery.html", "element" : <Gallery tag={"pixelatedviewsgallery"} /> },
	{ "name" : "Social Media", "path" : "/socialmedia.html", "element" : <SocialMedia /> },
	{ "name" : "Recipes", "path" : "/recipes.html", "element" : <Recipes /> },
	{ "name" : "Custom Sunglasses", "path" : "/customsunglasses.html", "element" : <CustomSunglasses /> },
	{ "name" : "Customs Gallery", "path" : "/customsgallery.html", "element" : <Gallery tag={"customsunglasses"} /> },
	{ "name" : "Customs on eBay", "path" : "/ebay.html", "element" : <Ebay /> },
	{ "name" : "Customs Request", "path" : "/requests.html", "element" : <Requests /> },
	{ "name" : "My Customs", "path" : "/mycustoms.html", "element" : <Gallery tag={"btw-customsunglasses"} /> },
	{ "name" : "NerdJokes", "path" : "/nerdjokes.html", "element" : <NerdJokes /> },
	{ "name" : "Stkr", "path" : "/stkr.html", "element" : <Stkr /> },
	{ 	"path" : "/formbuild.html", "element" : <FormBuild /> },
	{ 	"path" : "/formextract.html", "element" : <FormExtract /> },
	{ 	"path" : "/form.html", "element" : <Form /> },
	{ 	"path" : "/joke.html", "element" : <Joke /> },
	{ "path" : "*", "element" : <NotFound /> }
]