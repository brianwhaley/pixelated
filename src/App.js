import React, { Component } from 'react';
import Header from './header'

class App extends Component {
  render() {
    return (
	
      <div id="page-container">

        <div id="panel-menu" class="pad">
          <div class="accordion-menu"></div>
        </div>
      
        <div id="fixed-header" class="grid12">
          <div id="page-header" class="grid12">
            <Header></Header>
          </div>
        </div>

        <div id="fixed-header-spacer" class="grid12"></div>

        <div id="page-search" class="grid12 noMobile">
          <div class="content-container"></div>
        </div>
        
        <div id="page-body" class="grid12">
          <div class="content-container">
          
            <h2 class="title-bar">Grid System</h2>
            
          </div>
        </div>
        
        <div id="page-footer" class="grid12">
          <div class="content-container"></div>
        </div>
        
      </div>

    );
  }
}

export default App;
