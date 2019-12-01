import React, { Component } from 'react';

class Menu extends Component {
    render() {
        return (

		<ul class="grid12 clearfix">
            <li><a href="./index.html">Home</a></li>
            <li><a href="./gallery.html?tag=portfolio-all">Work Portfolio</a></li>
            <li><a href="./gallery.html?tag=pixelatedviewsgallery">Photo Gallery</a></li>
            <li><a href="http://blog.pixelated.tech">Pixelated Views Blog</a></li>
            <li><a href="./socialmedia.html">Social Media</a></li>
            <li><a href="./photography.html">Photography</a></li>
            <li><a href="./recipes.html">Recipes</a></li>
        </ul>			

        );
    }
}

export default Menu;
