import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './home';
import Gallery from './gallery';
import SocialMedia from './socialmedia';
import Photography from './photography';
import Recipes from './recipes';

const BodyContent = ()  => (
    <Router>
       <div>
            <Route exact path='/' component={Home}/>
            <Route path='/index.html' component={Home}/>
            <Route path='/gallery.html' component={Gallery}/>
            <Route path='/socialmedia.html' component={SocialMedia}/>
            <Route path='/photography.html' component={Photography}/>
            <Route path='/recipes.html' component={Recipes}/>
        </div>
    </Router>
);

export default BodyContent;