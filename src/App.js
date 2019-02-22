import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './header';
import Menu from './menu';
import Hero from './hero'
import BodyContent from './bodycontent'

class App extends Component {
  render() {
    const gcse = '<gcse:search></gcse:search>';
    return (
	
      <div id="page-container">

        <div id="panel-menu" class="pad">
          <div class="accordion-menu">
            <Menu></Menu>
          </div>
        </div>
      
        <div id="fixed-header" class="grid12">
          <div id="page-header" class="grid12">
            <Header></Header>
          </div>
        </div>

        <div id="fixed-header-spacer" class="grid12"></div>

        <Router>
          <div>
            <Route exact path='/' component={Hero}/>
            <Route exact path='/index.html' component={Hero}/>
          </div>
        </Router>

        <div id="page-search" class="grid12 noMobile">
          <div class="content-container" dangerouslySetInnerHTML={{__html: '<gcse:search></gcse:search>'}}>
          </div>
        </div>
        
        <div id="page-body" class="grid12">
            <BodyContent></BodyContent>
        </div>
        
        <div id="page-footer" class="grid12">
          <div class="content-container"></div>
        </div>
        
      </div>

    );
  }
}

export default App;
