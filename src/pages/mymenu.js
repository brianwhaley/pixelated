import React, { Component } from 'react';
import Menu from '../components/pixelated.menu.js';

export default class MyMenu extends Component {

    render() {

		let menuItems = {
			"Home" : "./index.html" ,
			"Work Portfolio" : "./gallery.html?tag=portfolio-all" ,
			"Photo Gallery" : "./gallery.html?tag=pixelatedviewsgallery" ,
			"Pixelated Views Blog" : "https://blog.pixelated.tech" ,
			"Social Media" : "./socialmedia.html" ,
			"Photography" : "./photography.html" ,
			"Recipes" : "./recipes.html"
		}

        return (
			<Menu menuItems={menuItems} ref={(myMenu) => {window.myMenu = myMenu}}/>
        );
    }
}