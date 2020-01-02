import React, { Component } from 'react';
import Callout, { CalloutHeader, CalloutRoundTiny } from '../components/pixelated.callout.js'

export default class Home extends Component {
    render() {
        return (



		<div>
            <div className="page-content-section" id="intro-section">
                <div className="content-container">
                    <div className="row">

						<div className="grid12">

							<Callout
								img='images/brianwhaley-headshot.jpg'
								title='Brian T. Whaley'
								content='Technologist,
									Digital Transformation Professional,
									User Experience Champion,
									Landscape and Macro Photographer,
									Avid World Traveler,
									Advanced Open Water Scuba Diver,
									Enthusiast of Home-Cooked Food'
								direction='horizontal'
								columnCount={2}/>

							<Callout
								url='https://www.linkedin.com/in/brianwhaley'
								img='images/linkedin-logo.png'
								title='LinkedIn Profile'
								content='My LinkedIn Profile - Work History, Education, Volunteer Work, Honors and Awards, Certifications, Skills, and more.'
								direction='horizontal'
								columnCount={2}/>

                        </div>

                    </div>
                </div>
            </div>




            <div className="page-content-section-alt" id="social-section">
                <div className="content-container">

                    <div className="row">
                        <div className="column grid6">
                            <CalloutRoundTiny url="http://www.linkedin.com/in/brianwhaley" img="images/linkedin-logo.png" title="LinkedIn" />
                            <CalloutRoundTiny url="http://twitter.com/brianwhaley" img="images/twitter-logo.png" title="Twitter" />
                            <CalloutRoundTiny url="http://www.pinterest.com/brianwhaley" img="images/pinterest-logo.png" title="Pinterest" />
                            <CalloutRoundTiny url="https://www.goodreads.com/user/show/49377228-brian-whaley" img="images/goodreads-logo.png" title="Goodreads" />
                            <CalloutRoundTiny url="http://www.youtube.com/user/brianwhaley" img="images/youtube-logo.png" title="YouTube" />
                            {/* <CalloutRoundTiny url="http://www.google.com/profiles/brian.whaley" img="images/google-plus-logo.png" title="Google Plus" /> */}
                            <CalloutRoundTiny url="http://pixelatedviews.tumblr.com" img="images/tumblr-logo.png" title="Feed Reader" />
                        </div>
                        <div className="column grid6">
                            <CalloutRoundTiny url="http://blog.pixelated.tech" img="images/google-reader-logo.png" title="Pixelated Blog" />
                            <CalloutRoundTiny url="http://www.amazon.com/gp/pdp/profile/AMIS1GDCT1RZ?ie=UTF8&amp;ref_=ya_T9_56" img="images/amazon-logo.png" title="Amazon" />
                            <CalloutRoundTiny url="https://www.etsy.com/people/bwhaley73" img="images/etsy-logo.png" title="Etsy" />
                            <CalloutRoundTiny url="https://foursquare.com/brianwhaley" img="images/foursquare-logo.png" title="Foursquare" />
                            <CalloutRoundTiny url="http://trees.ancestry.com/tree/7237865" img="images/ancestry-logo.jpg" title="Ancestry" />
                            <CalloutRoundTiny url="http://www.facebook.com/brian.t.whaley" img="images/facebook-logo.png" title="Facebook" />
                        </div>
                    </div>
                    <div className="row">
						<CalloutHeader url="socialmedia.html" title="My Social Media" />
                        <div className="callout-body grid12">
                            Links to each of my social media accounts and a few recent postings from each,
                            including Amazon, Ancestry, my Blog, Etsy, Facebook, Foursquare, Goodreads,
                            LinkedIn, Pinterest, Twitter, Youtube.
                            Check out the use of RSS feeds and APIs to generate dynamic cards on the page
                            using my SocialCards jQuery library.
                            <br/>
                            <div className="centeredbutton"><a href="socialmedia.html">My Social Media</a></div>
                        </div>
                    </div>


                </div>
            </div>





            <div className="page-content-section" id="portfolio-section">
                <div className="content-container">
                    <div className="row">

						<Callout
							url='gallery.html?tag=portfolio-all'
							img='images/circuitboard.jpg'
							title='Work Portfolio'
							content='A carousel of screenshots from my work at BMS, AP, ADP, and PR Newswire.
							The carousel was built with a native React compnent that I built myself.
							You can click on the left or right arrows to navigate, or swipe on a touch enabled device.'/>

						<Callout
							url='https://github.com/brianwhaley'
							img='images/github-logo.png'
							title='GitHub Portfolio'
							content='This is a link to my GitHub account.  I have only uploaded a few pieces of code.
							Pieces include a library of LotusScripts and agents;
							pilot applications written in Angular2, NodeJS, Spring iOS, and Java Android;
							a jQuery library of functions for use when integrating with Flickr, a photo gallery component that integrates with Flickr,
							and a component (jQuery or React) that integrates with social media providers and generates Masonary cards of the last number of items from each account.'/>

						<Callout
							url='gallery.html'
							img='https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg'
							title='Photo Gallery'
							content='A carousel of some of my best photographs throughout my life.
							They are primarily landscape photographs, macro photographs, and travel photographs.
							The carousel was built using the Galleria jQuery plugin.
							You can click on the left or right arrows to navigate, or swipe on a touch enabled device.'/>

                    </div>
                </div>
            </div>





            <div className="page-content-section-alt" id="photo-section">
                <div className="content-container">
                    <div className="row">
                        <div className="column grid6">
                            <CalloutRoundTiny url="" img="" title="" />
                            <CalloutRoundTiny url="https://500px.com/brianwhaley" img="images/500px-logo.png" title="500px" />
							<CalloutRoundTiny url="http://www.flickr.com/photos/brianwhaley/" img="images/flickr-logo.png" title="Flickr" />
							<CalloutRoundTiny url="http://www.shutterstock.com/g/brianwhaley" img="images/shutterstock-logo.png" title="Shutter Stock" />
							<CalloutRoundTiny url="https://secure.istockphoto.com/portfolio/brianwhaley" img="images/istock-logo.jpg" title="iStock Photo" />
                            <CalloutRoundTiny url="" img="" title="" />
                        </div>
                        <div className="column grid6">
                            <CalloutRoundTiny url="" img="" title="" />
                            <CalloutRoundTiny url="https://www.instagram.com/pixelated.views/" img="images/instagram-logo.jpg" title="Instagram" />
							<CalloutRoundTiny url="http://www.blurb.com/user/brianwhaley" img="images/blurb-logo.png" title="Blurb" />
							<CalloutRoundTiny url="http://brianwhaley.shutterfly.com" img="images/shutterfly-logo.jpg" title="Shutterfly" />
							<CalloutRoundTiny url="http://twitter.com/pixelatedviews" img="images/twitter-logo.png" title="Twitter" />
                            <CalloutRoundTiny url="" img="" title="" />
                        </div>
                    </div>
                    <div className="row">
						<CalloutHeader url="photography.html" title="My Photography" />
                        <div className="callout-body grid12">
                            Links to each of my social media accounts related to photography,
                            as well as a few recent postings from each,
                            including 500px, Blurb, Flickr, Instagram, iStock Photo, Shutterfly, Shutterstock, Twitter.
                            Check out the use of RSS feeds and APIs to generate dynamic cards on the page
                            using my SocialCards jQuery library.
                            <br/>
                            <div className="centeredbutton"><a href="photography.html">My Photography</a></div>
                        </div>
                    </div>
                </div>
            </div>






            <div className="page-content-section" id="book-section">
                <div className="content-container">
                    <div className="row">

                        <div className="grid12 push2">

							<Callout
								url='http://www.blurb.com/user/brianwhaley'
								img='images/blurb-logo.png'
								title='My Blurb Books'
								content='A storefront for my custom made books.  This includes books for our trip to Italy,
								a memorial for our rabbit Sunshine, a Whaley / Pace family album, A wedding album for Matt and Alex,
								a memorial book for my mom, and a collection of recipes from the Pace family. More to come!'/>

							<Callout
								url='recipes.html'
								img='images/pizza-gaine.jpg'
								title='My Recipe Book'
								content="This is <a href='recipes.html'>my recipe book</a>.
								It is a collection of recipes from 3 generations of my family, from my friends, and
								my life as an Italian-American and as a Bariatric Patient.
								I have cooked most of the recipes myself.
								I have tasted them all, however, and they are fantastic!  Please enjoy!"/>

                        </div>

                    </div>
                </div>
            </div>


        </div>



        );
    }
}
