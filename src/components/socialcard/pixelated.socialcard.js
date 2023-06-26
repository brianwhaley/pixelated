import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { html2dom, mergeDeep, pushNewValueToStateArray } from '../utilities/pixelated.functions'
import './pixelated.socialcard.css'

/* ==========
NOTE - FourSquare RSS stopped working March 2019
========== */

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
			rss2json: {
				apiURL: 'https://api.rss2json.com/v1/api.json',
				apiKey: 'c3wsmqh4h1iydxxip3sgkr1jtk3brllbp61jc6yd'
			},
			sources: {
				blank: {
					url: '',
					entryCount: 5,
					iconSrc: '',
					iconSrcAlt: ''
				},
				SOOpx: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/500px-logo.png',
					iconSrcAlt: '500px Post'
				},
				blog: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/blog-logo.png',
					iconSrcAlt: 'Blog Post'
				},
				etsy: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/etsy-logo.png',
					iconSrcAlt: 'Etsy Favorite'
				},
				/* facebook: {
          iconSrc: 'images/logos/facebook-logo.png',
          iconSrcAlt: 'Facebook Wall Post'
        }, */
				flickr: {
					userID: '',
					apiKey: '',
					tags: '',
					entryCount: 5,
					iconSrc: 'images/logos/flickr-logo.png',
					iconSrcAlt: 'Flickr Photo'
				},
				/* foursquare: {
          url: '',
          entryCount: 5,
          iconSrc: 'images/logos/foursquare-logo.png',
          iconSrcAlt: 'FourSquare Checkin'
        }, */
				goodreads: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/goodreads-logo.png',
					iconSrcAlt: 'GoodReads Currently Reading'
				},
				instagram: {
					userID: '',
					entryCount: 5,
					iconSrc: 'images/logos/instagram-logo.jpg',
					iconSrcAlt: 'Instagram Photo'
				},
				pinterest: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/pinterest-logo.png',
					iconSrcAlt: 'Pinterest Pin'
				},
				shutterfly: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/shutterfly-logo.jpg',
					iconSrcAlt: 'Shutterfly Items'
				},
				tumblr: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/tumblr-logo.png',
					iconSrcAlt: 'Tumblr Post'
				},
				twitter: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/twitter-logo.png',
					iconSrcAlt: 'Twitter Tweet'
				},
				youtube: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/youtube-logo.png',
					iconSrcAlt: 'Youtube Favorite Video'
				},
				other: {
					url: '',
					entryCount: 5,
					iconSrc: 'images/logos/blog-logo.png',
					iconSrcAlt: 'Post'
				}
			}
		}
		this.state.sources = mergeDeep(this.state.sources, props.sources)
	}

	gatherData () {
		if (this.debug) { console.log('Gathering Data...') }
		for (const prop in this.state.sources) {
			const source = this.state.sources[prop]
			if (Object.prototype.hasOwnProperty.call(source, 'url') && source.url) {
				this.getFeedEntries(source.url, source.entryCount)
			}
		}
		/* if(this.state.flickr.userID){ this.getFlickrEntries(this.state.flickr.userID, this.state.flickr.apiKey, this.state.flickr.tags, this.state.flickr.entryCount); } */
		/* if(this.state.goodreads.url){ this.getGoodreadsEntries(this.state.goodreads.url, this.state.goodreads.entryCount); } */
		/* if(this.state.instagram.userID){ this.getInstagramEntries(this.state.instagram.userID, this.state.instagram.entryCount); } */
	}

	getFeedEntries (myURL, entryCount) {
		if (this.debug) { console.log('Getting Feed Entries...') }
		const apiKey = this.state.rss2json.apiKey
		const result = fetch(this.state.rss2json.apiURL + '?rss_url=' + myURL + '&api_key=' + apiKey + '&count=' + entryCount, { method: 'GET', credentials: 'same-origin' })
			.then(res => res.json())
			.then(
				(result) => {
					let i = 0
					for (const prop in result.items) {
						let myNewCard = []
						const item = result.items[prop]
						myNewCard = item

						/* ===== FIX FOR DESCRIPTION ===== */
						if (item.content) {
							if (item.content.length > 500) {
								const doc = html2dom(item.content)
								const itemContent = doc.innerHTML
								myNewCard.content = itemContent
							}
						} else {
							const myImgBase = item.thumbnail
							const myImgTag = '<img src="' + myImgBase + '" alt="' + item.title + '" title="' + item.title + '">'
							myNewCard.content = '<p>' + myImgTag + item.title + '</p>'
							/* myNewCard.description = myNewCard.content; */
						}
						/* ===== UPDATE STATE ===== */
						const myCardDataFromState = this.state.myCardData
						myCardDataFromState.push(myNewCard)
						myCardDataFromState.sort(this.sortCardsByPubDate)
						this.setState({ myCardData: myCardDataFromState })

						if (i >= entryCount) { return false }
						i++
					}
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					console.log(error + ' \n RSS2JSON API Call failed.')
				}
			)
		/* ===== UPDATE STATE ===== */
		pushNewValueToStateArray(this, 'myPromises', result)
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

	componentDidMount () {
		let myOptions = []
		this.gatherData()
		/* Promise.all(this.state.myPromises).then( result => { */
		// Promise.all(this.state.myPromises).then(function(){
		Promise.all(this.state.myPromises).then(() => {
			for (const prop in this.state.myCardData) {
				const card = this.state.myCardData[prop]
				switch (true) {
				case (card.link.indexOf('500px.com') > -1): myOptions = this.state.sources.SOOpx; break
				case (card.link.indexOf('blog') > -1): myOptions = this.state.sources.blog; break
				case (card.link.indexOf('etsy.com') > -1): myOptions = this.state.sources.etsy; break
				case (card.link.indexOf('foursquare.com') > -1): myOptions = this.state.sources.foursquare; break
				case (card.link.indexOf('flickr.com') > -1): myOptions = this.state.sources.flickr; break
				case (card.link.indexOf('goodreads.com') > -1): myOptions = this.state.sources.goodreads; break
				case (card.link.indexOf('instagram') > -1): myOptions = this.state.sources.instagram; break
				case (card.link.indexOf('pinterest.com') > -1): myOptions = this.state.sources.pinterest; break
				case (card.link.indexOf('shutterfly.com') > -1): myOptions = this.state.sources.shutterfly; break
				case (card.link.indexOf('tumblr.com') > -1): myOptions = this.state.sources.tumblr; break
				case (card.link.indexOf('twitter') > -1): myOptions = this.state.sources.twitter; break
				case (card.link.indexOf('youtube') > -1): myOptions = this.state.sources.youtube; break
				case (card.link.indexOf('other') > -1): myOptions = this.state.sources.other; break
				default: myOptions = this.state.sources.blank; break
				}
				/* ===== UPDATE STATE ===== */
				const newSocialCard = <SocialCard key={card.guid} iconSrc={myOptions.iconSrc} iconSrcAlt={myOptions.iconSrcAlt} card={card} />
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
			<div className="masonry-item" key={this.props.card.guid}>
				<div className="card">
					<div className="cardTitle">
						<a href={this.props.card.link} target="_blank" rel="noopener noreferrer">
							<img className="cardIcon" src={this.props.iconSrc} alt={this.props.iconSrcAlt} />
							{this.props.card.title}
						</a>
					</div>
					<div className="cardBody" dangerouslySetInnerHTML={{ __html: this.props.card.content }} />
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
