import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            
            <div className="content-container">
                <div className="panel-menu-button pull-left">
                    <img src="images/mobile-menu2.png" alt="Mobile Menu"/>
                </div>
                <h1 className="pull-left">Pixelated </h1>
                <h2 className="pull-left pad"> - by Brian Whaley</h2>
                <div className="addthis_sharing_toolbox push-right noMobile"></div>
            </div>

        );
    }
}

export default Header;