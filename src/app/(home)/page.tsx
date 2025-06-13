"use client";

import React from "react";
import { PageHeader } from "@/app/components/general/pixelated.general";
import { Callout, CalloutHeader, CalloutSmall } from "@brianwhaley/pixelated-components";

export default function Home() {
	return (
		<>
			<section id="products-section">
				<div className="section-container">
					<br />
					<PageHeader title="Pixelated Products & Services" />
					<div className="row-12col">
						<div className="grid-s3-e8">
							Pixelated offers a wide varity of products and services, including custom web development for small businesses, 
							stock photography, touchup services, home design and remodeling, and more.  Explore our detailed offereings below.  
						</div>
					</div>
					<div className="row-3col">
						<Callout
							url="/workoverview" 
							img='images/circuitboard.jpg'
							title='Web Development'
							content='Passionate Web Technologist,
								Digital Transformation Professional, User Experience Champion.
								I get excited watching companies and products grow and thrive.'
							layout='vertical' />
						<Callout
							url='/photography' 
							img='https://farm6.staticflickr.com/5682/21652998256_7c5d0ce495_b.jpg'
							title='Stock Photography'
							content='I have converted my passion of Landscape, Macro, and Travel Photography 
								into a budding Stock Photography Portfolio.  Check out my work on 
								iStockPhoto or ShutterStock, or see my books on Blurb or Shutterfly. '
							layout='vertical' />
						<Callout
							url='/customsunglasses' 
							img='/images/customs/blue-splatter-3.jpg'
							title='Custom Sunglasses'
							content='I refurbish, repair, and customize Oakley sunglasses. 
								I enjoy providing custom paint jobs with a splash of colors - 
								marbled, splattered, and dripped. Custom paint can be one color, 
								or a combination of complimentary colors. Patterns can also be small or large, 
								thin or thick, dense or sparse.  As the customer, you choose!'
							layout='vertical' />
						{/* <Callout
							url='/homedesign' 
							img='https://farm66.static.flickr.com/65535/54513221006_5d2117cdf3_b.jpg'
							title='Home Design & Remodeling'
							content='We design a holistic plan for interior and exterior design of homes,
								including kitchens, bathrooms, bedrooms, color schemes, artwork, garages, patios, decks, and more.'
							layout='vertical' /> */}
					</div>
				</div>
			</section>

			<section className="section-alt" id="social-section">
				<div className="section-container">

					<div className="row-12col">
						<div className="grid-s1-e12">
							<CalloutHeader url="" title="Personal Social Media" />
						</div>
					</div>

					<div className="row-12col">
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.linkedin.com/in/brianwhaley" img="/images/logos/linkedin-logo.png" alt="LinkedIn" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://maps.app.goo.gl/j5Tpcxxr9roydxd2A" img="/images/logos/googlemaps-logo.png" alt="Google Maps Travelogue" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://twitter.com/brianwhaley" img="/images/logos/twitter-logo.png" alt="Twitter" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://reddit.com/user/btw-73/saved" img="/images/logos/reddit-logo.png" alt="Reddit" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.pinterest.com/brianwhaley" img="/images/logos/pinterest-logo.png" alt="Pinterest" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.goodreads.com/user/show/49377228-brian-whaley" img="/images/logos/goodreads-logo.png" alt="Goodreads" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.youtube.com/user/brianwhaley" img="/images/logos/youtube-logo.png" alt="YouTube" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://pixelatedviews.tumblr.com" img="/images/logos/tumblr-logo.png" alt="Feed Reader" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.etsy.com/people/bwhaley73" img="/images/logos/etsy-logo.png" alt="Etsy" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://trees.ancestry.com/tree/7237865" img="/images/logos/ancestry-logo.jpg" alt="Ancestry" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.facebook.com/brian.t.whaley" img="/images/logos/facebook-logo.png" alt="Facebook" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://github.com/brianwhaley" img="/images/logos/github-logo.png" alt="Github" title={""} content={""} /></div>
					</div>

					<div className="row-12col">
						<div className="grid-s1-e12">
							<CalloutHeader url="" title="Pixelated Social Media" />
						</div>
					</div>

					<div className="row-12col">
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.ebay.com/usr/btw73/" img="/images/logos/ebay-logo.png" alt="eBay" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://blog.pixelated.tech" img="/images/logos/google-reader-logo.png" alt="Pixelated Blog" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://twitter.com/pixelatedviews" img="/images/logos/twitter-logo.png" alt="Twitter" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.linkedin.com/company/106825397/" img="/images/logos/linkedin-logo.png" alt="LinkedIn" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://www.instagram.com/pixelated.views/" img="/images/logos/instagram-logo.jpg" alt="Instagram" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://500px.com/brianwhaley" img="/images/logos/500px-logo.png" alt="500px" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.flickr.com/photos/brianwhaley/" img="/images/logos/flickr-logo.png" alt="Flickr" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="https://secure.istockphoto.com/portfolio/brianwhaley" img="/images/logos/istock-logo.jpg" alt="iStock Photo" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.shutterstock.com/g/brianwhaley" img="/images/logos/shutterstock-logo.png" alt="Shutter Stock" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://www.blurb.com/user/brianwhaley" img="/images/logos/blurb-logo.png" alt="Blurb" title={""} content={""} /></div>
						<div className="gridItem"><CalloutSmall shape="squircle" url="http://brianwhaley.shutterfly.com" img="/images/logos/shutterfly-logo.png" alt="Shutterfly" title={""} content={""} /></div>
						<div className="gridItem"></div>
					</div>

					<div className="row-1col">
						<div className="gridItem">
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

			<section id="spotlight-section">
				<div className="section-container">
					<CalloutHeader title="Pixelated - Featured Spotlights" />
					<div className="row-4col">
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
								url='photogallery'
								img='https://farm1.static.flickr.com/736/32093760946_27cb5b34fa_b.jpg'
								title='Photo Gallery'
								layout='vertical'
								content='A carousel of some of my best photographs throughout my life.
									They are primarily landscape photographs, macro photographs, and travel photographs.
									The carousel was custom built using React and the Flickr API.
									You can click on the left or right arrows to navigate, or swipe on a touch enabled device.'/>
						</div><div className="gridItem">
							<Callout
								url='https://www.ebay.com/usr/btw73/'
								img='images/logos/ebay-logo.png'
								title='Sunglasses on eBay'
								content='View some cutomized Oakley sunglasses available for purchase on eBay.'
								layout='vertical' />
						</div><div className="gridItem">
							<Callout
								url='https://www.goodreads.com/review/list/49377228-brian-whaley?shelf=books-for-work' 
								img='/images/logos/goodreads-logo.png'
								title='Goodreads'
								layout='vertical' 
								shape='round' 
								content='This Goodreads Shelf is a collection of books that i have found to be 
									invaluable to build, strengthen, and manage my career and leadership skills over my career, 
									i hope these are useful to you too. '/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
