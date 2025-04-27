"use client";

import React, { Fragment } from "react";
import { Callout, CalloutHeader, CalloutRoundTiny } from "@brianwhaley/pixelated-components"; 

export default function Home() {
	return (
		<Fragment>
			<section id="intro-section">
				<div className="section-container">
					<div className="row-3col">
						<div className="gridItem">
							<Callout
								img='images/brianwhaley-headshot.jpg'
								title='Brian T. Whaley'
								content='Technologist,
									Digital Transformation Professional, User Experience Champion,
									Landscape and Macro Photographer, Avid World Traveler,
									Advanced Open Water Scuba Diver, Enthusiast of Home-Cooked Food'
								layout='vertical' />
						</div><div className="gridItem">
							<Callout
								url='https://www.linkedin.com/in/brianwhaley'
								img='images/logos/linkedin-logo.png'
								title='LinkedIn Profile'
								content='My LinkedIn Profile - Work History, Education, Volunteer Work, Honors and Awards, Certifications, Skills, and more.'
								layout='vertical' />
						</div><div className="gridItem">
							<Callout
								url='https://www.ebay.com/usr/btw73/'
								img='images/logos/ebay-logo.png'
								title='Sunglasses on eBay'
								content='View some cutomized Oakley sunglasses available for purchase on eBay.'
								layout='vertical' />
						</div>
					</div>
				</div>
			</section>

			<section className="section-alt" id="social-section">
				<div className="section-container">
					<div className="row-12col">
						
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://www.linkedin.com/in/brianwhaley" img="/images/logos/linkedin-logo.png" title="LinkedIn" alt="LinkedIn" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://twitter.com/brianwhaley" img="/images/logos/twitter-logo.png" title="Twitter" alt="Twitter" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://reddit.com/user/btw-73/saved" img="/images/logos/reddit-logo.png" title="Reddit" alt="Reddit" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://www.pinterest.com/brianwhaley" img="/images/logos/pinterest-logo.png" title="Pinterest" alt="Pinterest" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="https://www.goodreads.com/user/show/49377228-brian-whaley" img="/images/logos/goodreads-logo.png" title="Goodreads" alt="Goodreads" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://www.youtube.com/user/brianwhaley" img="/images/logos/youtube-logo.png" title="YouTube" alt="YouTube" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://pixelatedviews.tumblr.com" img="/images/logos/tumblr-logo.png" title="Feed Reader" alt="Feed Reader" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="https://www.etsy.com/people/bwhaley73" img="/images/logos/etsy-logo.png" title="Etsy" alt="Etsy" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="https://www.ebay.com/usr/btw73/" img="/images/logos/ebay-logo.png" title="ebay" alt="eBay" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://blog.pixelated.tech" img="/images/logos/google-reader-logo.png" title="Pixelated Blog" alt="Pixelated Blog" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://trees.ancestry.com/tree/7237865" img="/images/logos/ancestry-logo.jpg" title="Ancestry" alt="Ancestry" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://www.facebook.com/brian.t.whaley" img="/images/logos/facebook-logo.png" title="Facebook" alt="Facebook" /></div>
					</div>

					<div className="row-12col">
						<div className="gridItem"></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="https://github.com/brianwhaley" img="/images/logos/github-logo.png" title="Github" alt="Github" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="https://maps.app.goo.gl/j5Tpcxxr9roydxd2A" img="/images/logos/googlemaps-logo.png" title="Google Maps" alt="Google Maps Travelogue" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="https://500px.com/brianwhaley" img="/images/logos/500px-logo.png" title="500px" alt="500px" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://www.flickr.com/photos/brianwhaley/" img="/images/logos/flickr-logo.png" title="Flickr" alt="Flickr" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="https://secure.istockphoto.com/portfolio/brianwhaley" img="/images/logos/istock-logo.jpg" title="iStock Photo" alt="iStock Photo" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://www.shutterstock.com/g/brianwhaley" img="/images/logos/shutterstock-logo.png" title="Shutter Stock" alt="Shutter Stock" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="https://www.instagram.com/pixelated.views/" img="/images/logos/instagram-logo.jpg" title="Instagram" alt="Instagram" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://www.blurb.com/user/brianwhaley" img="/images/logos/blurb-logo.png" title="Blurb" alt="Blurb" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://brianwhaley.shutterfly.com" img="/images/logos/shutterfly-logo.jpg" title="Shutterfly" alt="Shutterfly" /></div>
						<div className="gridItem"><CalloutRoundTiny shape="squircle" url="http://twitter.com/pixelatedviews" img="/images/logos/twitter-logo.png" title="Twitter" alt="Twitter" /></div>
						<div className="gridItem"></div>
					</div>

					<div className="row-1col">
						<div className="gridItem">
							<CalloutHeader url="socialmedia" title="My Social Media" />
							<div className="callout-body">
								Links to each of my social media accounts and a few recent postings from each,
								including 500px, Ancestry, my Blog, Blurb, eBay, Etsy, Facebook, Flickr, Goodreads,
								Instagram, iStock Photo, LinkedIn, Pinterest, Reddit, Shutterfly, Shutterstock, 
								Twitter, Tumblr, Youtube, and more.
								Check out the use of RSS feeds and APIs to generate dynamic cards on the page
								using my React component library.
								<br/>
								<div className="centeredbutton"><a href="socialmedia">My Social Media</a></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="portfolio-section">
				<div className="section-container">
					<div className="row-3col">
						<div className="gridItem">
							<Callout
								url='workportfolio'
								img='images/circuitboard.jpg'
								title='Work Portfolio'
								layout='vertical'
								content='A carousel of screenshots from my work at BMS, AP, ADP, PR Newswire, AmEx, and more.
									The carousel runs on a custom component that I built myself, using React and the Flickr API.
									You can click on the left or right arrows to navigate, or swipe on a touch enabled device.'/>
						</div><div className="gridItem">
							<Callout
								url='https://github.com/brianwhaley'
								img='images/logos/github-logo.png'
								title='GitHub Portfolio'
								layout='vertical'
								content='This is a link to my GitHub account.  I have only uploaded a few pieces of code.
									Pieces include a library of LotusScripts and agents;
									pilot applications written in Angular2, NodeJS, Spring iOS, and Java Android;
									a jQuery library of functions for use when integrating with Flickr, a photo gallery component that integrates with Flickr,
									and a component (jQuery or React) that integrates with social media providers and generates Masonary cards of the last number of items from each account.'/>
						</div><div className="gridItem">
							<Callout
								url='photogallery'
								img='https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg'
								title='Photo Gallery'
								layout='vertical'
								content='A carousel of some of my best photographs throughout my life.
									They are primarily landscape photographs, macro photographs, and travel photographs.
									The carousel was custom built using React and the Flickr API.
									You can click on the left or right arrows to navigate, or swipe on a touch enabled device.'/>
						</div>
					</div>
				</div>
			</section>

			<section className="section-alt" id="portfolio-section-2">
				<div className="section-container">
					<div className="row-3col">
						<div className="gridItem">
							<Callout
								url='http://www.blurb.com/user/brianwhaley'
								img='images/logos/blurb-logo.png'
								title='My Blurb Books'
								layout='vertical'
								content='A storefront for my custom made books.  This includes books for our trip to Italy,
									a memorial for our rabbit Sunshine, a Whaley / Pace family album, A wedding album for Matt and Alex,
									a memorial book for my mom, and a collection of recipes from the Pace family. More to come!'/>
						</div><div className="gridItem">
							<Callout
								url='recipes'
								img='images/pizza-gaine.jpg'
								title='My Recipe Book'
								layout='vertical'
								content="This is <a href='recipes'>my recipe book</a>.
									It is a collection of recipes from 3 generations of my family, from my friends, and
									my life as an Italian-American and as a Bariatric Patient.
									I have cooked most of the recipes myself.
									I have tasted them all, however, and they are fantastic!  Please enjoy! "/>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
