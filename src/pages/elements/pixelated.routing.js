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
import Photography from '../photography'
import Recipes from '../recipes'
import Readme from '../readme'
import Requests from '../requests'
import MyResume from '../resume'
import SocialMedia from '../socialmedia'
import Stkr from '../stkr'
import NotFound from '../notfound'

export const routes = [
	{ "path" : "/", "element" : <Home /> },
	{ "name" : "Home", "path" : "/index", "element" : <Home /> },
	{ 	"path" : "/index.html", "element" : <Home /> },
	{ "name" : "Resume", "path" : "/resume", "element" : <MyResume /> },
	{ 	"path" : "/resume.html", "element" : <MyResume /> },
	{ "name" : "ReadMe", "path" : "/readme", "element" : <Readme /> },
	{ 	"path" : "/readme", "element" : <Readme /> },
	{ "name" : "NerdJokes", "path" : "/nerdjokes", "element" : <NerdJokes /> },
	{ 	"path" : "/nerdjokes.html", "element" : <NerdJokes /> },
	{ "name" : "Stkr", "path" : "/stkr", "element" : <Stkr /> },
	{ 	"path" : "/stkr.html", "element" : <Stkr /> },
	{ "name" : "Photography", "path" : "/photography", "element" : <Photography /> },
	{ 	"path" : "/photography.html", "element" : <Photography /> },
	{ "name" : "Social Media", "path" : "/socialmedia", "element" : <SocialMedia /> },
	{ 	"path" : "/socialmedia.html", "element" : <SocialMedia /> },
	{ "name" : "Custom Sunglasses", "path" : "/customsunglasses", "element" : <CustomSunglasses /> },
	{ 	"path" : "/customsunglasses.html", "element" : <CustomSunglasses /> },
	{ 	"path" : "/ebay", "element" : <Ebay /> },
	{ 	"path" : "/ebay.html", "element" : <Ebay /> },
	{ 	"path" : "/requests", "element" : <Requests /> },
	{ 	"path" : "/requests.html", "element" : <Requests /> },
	{ "name" : "Recipes", "path" : "/recipes", "element" : <Recipes /> },
	{ 	"path" : "/recipes.html", "element" : <Recipes /> },
	{ "path" : "/formbuild", "element" : <FormBuild /> },
	{ "path" : "/formextract", "element" : <FormExtract /> },
	{ "path" : "/form", "element" : <Form /> },
	{ "path" : "/gallery/:tag", "element" : <Gallery /> },
	{ "path" : "/joke", "element" : <Joke /> },
	{ 	"path" : "/joke.html", "element" : <Joke /> },
	{ "path" : "*", "element" : <NotFound /> }
]