import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            
            <div class="content-container">
                <div class="panel-menu-button pull-left">
                    <img src="images/mobile-menu2.png" alt="Mobile Menu"/>
                </div>
                <h1 class="pull-left">Pixelated - by Brian Whaley</h1>
                <div class="addthis_sharing_toolbox push-right noMobile"></div>
            </div>

        );
    }
}

export default Header;