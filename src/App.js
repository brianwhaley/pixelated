import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MyMenu from './pages/mymenu';
import Header from './pages/header';
import Hero from './pages/hero';
import Search from './pages/search';
import BodyContent from './pages/bodycontent';
import Footer from './pages/footer';

class App extends Component {
  render() {

    return (

      <div id="page-container">

        <div id="panel-menu">
            <MyMenu></MyMenu>
        </div>

        <div id="fixed-header" className="grid12">
          <div id="page-header" className="grid12">
            <Header></Header>
          </div>
        </div>

        <div id="fixed-header-spacer" className="grid12"></div>

        <Router>
          <div>
            <Route exact path='/' component={Hero}/>
            <Route exact path='/index.html' component={Hero}/>
          </div>
        </Router>

        <div id="page-search" className="grid12 noMobile">
          <Search></Search>
        </div>

        <div id="page-body" className="grid12">
            <BodyContent></BodyContent>
        </div>

        <div id="page-footer" className="grid12">
          <Footer></Footer>
        </div>

      </div>

    );
  }
}

export default App;
