import React, { Component } from 'react';
import { MenuButton } from '../components/pixelated.menu.js';

export default class Header extends Component {
    render() {
        return (

            <div className="section-container">
				<MenuButton />
                <h1 className="pull-left">Pixelated </h1>
                <h2 className="pull-left pad"> - by Brian Whaley</h2>
                <div className="addthis_sharing_toolbox push-right noMobile"></div>
            </div>

        );
    }
}
