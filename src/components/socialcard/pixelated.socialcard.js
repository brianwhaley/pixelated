import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mergeDeep, pushNewValueToStateArray } from '../utilities/pixelated.functions'
import './pixelated.socialcard.css'

/* ========== NOTES ==========
TO DO : Blurb FaceBook Github iStock LinkedIn SnapChat ShutterStock TickTock
ERRORS: 500px, shutterfly
*/

/* ========== SOCIALCARDS ========== */
export class SocialCards extends Component {
	static propTypes = {
		sources: PropTypes.object.isRequired
	}
	constructor (props) {
		super(props)
		this.debug = false
		this.state = {
			loading: true,
			targetID: '#social',
			myPromises: [],
			promiseReady: false,
			cardCount: 0,
			myCardData: [],
			mySocialCards: [],
			proxy: {
				proxyURL: 'https://proxy.pixelated.tech/prod/proxy',
				proxyURLParam: 'url'
			},
			rss2json: {
				apiURL: 'https://api.rss2json.com/v1/api.json',
				apiURLParam: 'rss_url',
				apiKey: 'c3wsmqh4h1iydxxip3sgkr1jtk3brllbp61jc6yd'

			},
			toptal: {
				apiURL: 'https://www.toptal.com/developers/feed2json/convert',
				apiURLParam: 'url',
				apiKey: ''
			},
			sources: {
				/* DEFAULT VALUES FOR KNOWN SOURCES */
				blank: {
					url: '',
					entryCount: 5,
					iconSrc: '',
					iconSrcAlt: ''
				},
				SOOpx: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/500px-logo.png',
					iconSrcAlt: '500px Post'
				},
				blog: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/blog-logo.png',
					iconSrcAlt: 'Blog Post'
				},
				ebay: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/ebay-logo.png',
					iconSrcAlt: 'eBay Items For Sale'
				},
				etsy: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/etsy-logo.png',
					iconSrcAlt: 'Etsy Favorite'
				},
				/* facebook: {
          			iconSrc: '/images/logos/facebook-logo.png',
          			iconSrcAlt: 'Facebook Wall Post'
        		}, */
				flickr: {
					userID: '',
					apiKey: '',
					tags: '',
					entryCount: 5,
					iconSrc: '/images/logos/flickr-logo.png',
					iconSrcAlt: 'Flickr Photo'
				},
				/* ==========
				NOTE - FourSquare RSS stopped working March 2019
				========== */
				/* foursquare: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/foursquare-logo.png',
					iconSrcAlt: 'FourSquare Checkin'
					}, */
				github: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/github-logo.png',
					iconSrcAlt: 'Github Activity'
				},
				goodreads: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/goodreads-logo.png',
					iconSrcAlt: 'GoodReads Currently Reading'
				},
				instagram: {
					userID: '',
					entryCount: 5,
					iconSrc: '/images/logos/instagram-logo.jpg',
					iconSrcAlt: 'Instagram Photo'
				},
				pinterest: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/pinterest-logo.png',
					iconSrcAlt: 'Pinterest Pin'
				},
				reddit: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/reddit-logo.png',
					iconSrcAlt: 'Reddit Saves'
				},
				shutterfly: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/shutterfly-logo.jpg',
					iconSrcAlt: 'Shutterfly Items'
				},
				tumblr: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/tumblr-logo.png',
					iconSrcAlt: 'Tumblr Post'
				},
				twitter: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/twitter-logo.png',
					iconSrcAlt: 'Twitter Tweet'
				},
				x: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/x-logo.png',
					iconSrcAlt: 'X Post'
				},
				youtube: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/youtube-logo.png',
					iconSrcAlt: 'Youtube Favorite Video'
				},
				other: {
					url: '',
					entryCount: 5,
					iconSrc: '/images/logos/blog-logo.png',
					iconSrcAlt: 'Post'
				}
			}
		}
		this.state.sources = mergeDeep(this.state.sources, props.sources)
	}

	RSSFeedToJson (url) {
		if (this.debug) { console.log('Fetching RSS...') }
		async function fetchRSS () {
			try {
				const response = await fetch(url, {
					method: 'GET',
					credentials: 'same-origin',
					crossDomain: true,
					mode: 'cors',
					headers: { 'Content-Type': 'application/json' }
				})
				const text = await response.text()
				const parser = new DOMParser()
				const xml = parser.parseFromString(text, 'application/xml')
				let items
				if (xml.querySelectorAll('item').length > 0) {
					items = Array.from(xml.querySelectorAll('item')).map(item => {
						return {
							author: item.querySelector('author')?.textContent,
							category: item.querySelector('category')?.textContent,
							description: item.querySelector('description')?.textContent,
							guid: item.querySelector('guid')?.textContent,
							link: item.querySelector('link')?.textContent,
							pubDate: item.querySelector('pubDate')?.textContent,
							source: item.querySelector('source')?.textContent,
							title: item.querySelector('title')?.textContent
						}
					})
				} else {
					/* ===== FIX FOR REDDIT ===== */
					items = Array.from(xml.querySelectorAll('entry')).map(item => {
						return {
							author: item.querySelector('author')?.textContent,
							category: item.querySelector('category')?.attributes.getNamedItem('term').nodeValue,
							description: item.querySelector('content')?.textContent,
							guid: item.querySelector('id')?.textContent,
							link: item.querySelector('link')?.attributes.getNamedItem('href').nodeValue,
							pubDate: item.querySelector('published')?.textContent,
							source: item.querySelector('source')?.textContent,
							title: item.querySelector('title')?.textContent
						}
					})
				}
				return (items)
			} catch (err) {
				return (err)
			}
		}
		return fetchRSS()
	}

	sortCardsByPubDate (a, b) {
		const property = 'pubDate'
		const dateA = new Date(a[property])
		const dateB = new Date(b[property])
		if (dateA < dateB) {
			return 1
		} else if (dateA > dateB) {
			return -1
		} else {
			return 0
		}
	}

	getFeedEntries (myURL, entryCount) {
		if (this.debug) { console.log('Getting Feed Entries...') }
		const proxiedURL = this.state.proxy.proxyURL + '?' + this.state.proxy.proxyURLParam + '=' + encodeURIComponent(myURL)
		const result = this.RSSFeedToJson(proxiedURL)
			.then(
				(items) => {
					let i = 0
					for (const prop in items) {
						let myNewCard = []
						const item = items[prop]
						myNewCard = item
						/* ===== FIX FOR DESCRIPTION ===== */
						/* if (item.description) {
							if (item.description.length > 500) {
								const doc = html2dom(item.description)
								console.log(doc);
								const itemDescription = doc.innerHTML
								myNewCard.description = itemDescription
							}
						} else {
							const myImgBase = item.thumbnail
							const myImgTag = '<img src="' + myImgBase + '" alt="' + item.title + '" title="' + item.title + '">'
							myNewCard.description = '<p>' + myImgTag + item.title + '</p>'
						} */
						/* ===== FIX FOR SOURCE ===== */
						if (!(item.source)) {
							myNewCard.source = new URL(myURL).hostname
						}
						/* ===== UPDATE STATE ===== */
						const myCardDataFromState = this.state.myCardData
						myCardDataFromState.push(myNewCard)
						myCardDataFromState.sort(this.sortCardsByPubDate)
						this.setState({ myCardData: myCardDataFromState })
						if (i >= entryCount) { return false }
						i++
					}
				}
			)
		/* ===== UPDATE STATE ===== */
		pushNewValueToStateArray(this, 'myPromises', result)
	}

	gatherData () {
		if (this.debug) { console.log('Gathering Data...') }
		for (const prop in this.state.sources) {
			const source = this.state.sources[prop]
			if (Object.prototype.hasOwnProperty.call(source, 'url') && source.url) {
				this.getFeedEntries(source.url, source.entryCount)
			}
		}
	}

	componentDidMount () {
		if (this.debug) { console.log("Did Mount!") }
		let myOptions = []
		this.gatherData()
		Promise.all(this.state.myPromises).then(() => {
			for (const prop in this.state.myCardData) {
				const card = this.state.myCardData[prop]
				switch (true) {
				case (card.link.indexOf('500px.com') > -1): myOptions = this.state.sources.SOOpx; break
				case (card.link.indexOf('blog') > -1): myOptions = this.state.sources.blog; break
				case (card.link.indexOf('ebay.com') > -1): myOptions = this.state.sources.ebay; break
				case (card.link.indexOf('etsy.com') > -1): myOptions = this.state.sources.etsy; break
				// case (card.link.indexOf('facebook.com') > -1): myOptions = this.state.sources.facebook; break
				case (card.link.indexOf('flickr.com') > -1): myOptions = this.state.sources.flickr; break
				// case (card.link.indexOf('foursquare.com') > -1): myOptions = this.state.sources.foursquare; break
				case (card.link.indexOf('github.com') > -1): myOptions = this.state.sources.github; break
				case (card.link.indexOf('goodreads.com') > -1): myOptions = this.state.sources.goodreads; break
				case (card.link.indexOf('instagram') > -1): myOptions = this.state.sources.instagram; break
				case (card.link.indexOf('pinterest.com') > -1): myOptions = this.state.sources.pinterest; break
				case (card.link.indexOf('reddit.com') > -1): myOptions = this.state.sources.reddit; break
				case (card.link.indexOf('shutterfly.com') > -1): myOptions = this.state.sources.shutterfly; break
				case (card.link.indexOf('tumblr.com') > -1): myOptions = this.state.sources.tumblr; break
				case (card.link.indexOf('twitter') > -1): myOptions = this.state.sources.twitter; break
				case (card.link.indexOf('x.com') > -1): myOptions = this.state.sources.x; break
				case (card.link.indexOf('youtube') > -1): myOptions = this.state.sources.youtube; break
				case (card.link.indexOf('other') > -1): myOptions = this.state.sources.other; break
				default: myOptions = this.state.sources.blank; break
				}
				/* ===== UPDATE STATE ===== */
				const newSocialCard = <SocialCard key={prop + '' + card.guid} iconSrc={myOptions.iconSrc} iconSrcAlt={myOptions.iconSrcAlt} card={card} />
				pushNewValueToStateArray(this, 'mySocialCards', newSocialCard)
				this.setState({ cardCount: prop })
			}
			this.setState({ loading: false, promiseReady: true })
		})
	}

	render () {
		if (this.state.loading) {
			return (<Spinner />)
		} else {
			return (this.state.mySocialCards)
		}
	}
}

/* ========== SOCIALCARD ========== */
export class SocialCard extends Component {
	static propTypes = {
		iconSrc: PropTypes.string.isRequired,
		iconSrcAlt: PropTypes.string.isRequired,
		card: PropTypes.object.isRequired
	}

	render () {
		return (
			<div className="masonryItem" key={this.props.card.guid}>
				<div className="card">
					<div className="cardTitle">
						<a href={this.props.card.link} target="_blank" rel="noopener noreferrer">
							<img className="cardIcon" src={this.props.iconSrc} alt={this.props.iconSrcAlt} />
							{this.props.card.title}
						</a>
					</div>
					<div className="cardBody" dangerouslySetInnerHTML={{ __html: this.props.card.description }} />
					<div className="cardDate">{this.props.card.pubDate}</div>
				</div>
			</div>
		)
	}
}

/* ========== SPINNER ========== */
export class Spinner extends Component {
	render () {
		return (
			<div className="spinner">
				<div>Loading...</div>
			</div>
		)
	}
}
