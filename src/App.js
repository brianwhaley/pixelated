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

        <div id="panel-menu" className="pad">
          <div className="accordion-menu">
            <Menu></Menu>
          </div>
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
          <div className="content-container" dangerouslySetInnerHTML={{__html: '<gcse:search></gcse:search>'}}>
          </div>
        </div>
        
        <div id="page-body" className="grid12">
            <BodyContent></BodyContent>
        </div>
        
        <div id="page-footer" className="grid12">
          <div className="content-container"></div>
        </div>
        
      </div>

    );
  }
}

export default App;
