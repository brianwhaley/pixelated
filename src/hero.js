import React, { Component } from 'react';

class Hero extends Component {
    render() {
        return (
            
            <div id="page-hero" class="grid12">
                <img src="#" id="flickrHeroPreload" alt="Pixelated Views Hero Photo" class="hidden" />
                <img src="https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg" id="flickrHero" alt="Pixelated Hero Photo"/>
                <div id="flickrHeroByline">Original Photos by Brian T. Whaley</div>
                <div id="flickrHeroCount">0 / 0</div>
            </div>
        
        );
    }
}

export default Hero;