import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { html2dom , mergeDeep , pushNewValueToStateArray } from "./pixelated.functions.js"
import '../css/pixelated.socialcard.css';

/* ==========
NOTE - FourSquare RSS stopped working March 2019
========== */

/* ========== SOCIALCARD ========== */
export class SocialCard extends Component {

    static propTypes = {
        iconSrc: PropTypes.string.isRequired,
		iconSrcAlt: PropTypes.string.isRequired,
		card: PropTypes.object.isRequired
    }

    render() {
        return (
            <div className="masonry-item" key={this.props.card.guid}>
                <div className="card">
                    <div className="cardTitle">
                        <a href={this.props.card.link} target="_blank" rel="noopener noreferrer">
                        <img className="cardIcon" src={this.props.iconSrc} alt={this.props.iconSrcAlt} />
                        {this.props.card.title}
                        </a>
                    </div>
                    <div className="cardBody" dangerouslySetInnerHTML={{__html: this.props.card.content}} />
                    <div className="cardDate">{this.props.card.pubDate}</div>
				</div>
			</div>
        );
    }

}

/* ========== SOCIALCARDS ========== */
export default class SocialCards extends Component {

    static propTypes = {
        props: PropTypes.object.isRequired
    }
    constructor(props) {

        super(props);
        this.state = {
            targetID: "#social",
            myPromises: [] ,
            promiseReady: false,
            cardCount: 0,
            myCardData: [] ,
            mySocialCards: [] ,
            rss2json: {
                apiURL: 'https://api.rss2json.com/v1/api.json' ,
                apiKey: 'c3wsmqh4h1iydxxip3sgkr1jtk3brllbp61jc6yd' ,
            },
            blank: {
                url: '',
                entryCount: 5,
                iconSrc: '',
                iconSrcAlt: ''
            },
            SOOpx: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/500px-logo.png',
                iconSrcAlt: '500px Post'
            },
            blog: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/blog-logo.png',
                iconSrcAlt: 'Blog Post'
            },
            etsy: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/etsy-logo.png',
                iconSrcAlt: 'Etsy Favorite'
            },
            /* facebook: {
                iconSrc: 'images/facebook-logo.png',
                iconSrcAlt: 'Facebook Wall Post'
            }, */
            flickr: {
                userID: '',
                apiKey: '',
                tags: '',
                entryCount: 5,
                iconSrc: 'images/flickr-logo.png',
                iconSrcAlt: 'Flickr Photo'
            },
            /* foursquare: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/foursquare-logo.png',
                iconSrcAlt: 'FourSquare Checkin'
            }, */
            goodreads:{
                url: '',
                entryCount: 5,
                iconSrc: 'images/goodreads-logo.png',
                iconSrcAlt: 'GoodReads Currently Reading'
            },
            instagram: {
                userID: '',
                entryCount: 5,
                iconSrc: 'images/instagram-logo.jpg',
                iconSrcAlt: 'Instagram Photo'
            },
            pinterest: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/pinterest-logo.png',
                iconSrcAlt: 'Pinterest Pin'
            },
            shutterfly: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/shutterfly-logo.jpg',
                iconSrcAlt: 'Shutterfly Items'
            },
            tumblr: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/tumblr-logo.png',
                iconSrcAlt: 'Tumblr Post'
            },
            twitter: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/twitter-logo.png',
                iconSrcAlt: 'Twitter Tweet'
            },
            youtube: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/youtube-logo.png',
                iconSrcAlt: 'Youtube Favorite Video'
            },
            other: {
                url: '',
                entryCount: 5,
                iconSrc: 'images/blog-logo.png',
                iconSrcAlt: 'Post'
            }
        };

        this.state = mergeDeep(this.state, props.props);

    }

    gatherData() {
        for(var prop in this.state) {
            var option = this.state[prop] ;
            if (Object.prototype.hasOwnProperty.call(option,"url")) {
                if (option.url){
                    this.getFeedEntries(option.url, option.entryCount);
                }
            }
        }
        /* if(this.state.flickr.userID){ this.getFlickrEntries(this.state.flickr.userID, this.state.flickr.apiKey, this.state.flickr.tags, this.state.flickr.entryCount); } */
        /* if(this.state.goodreads.url){ this.getGoodreadsEntries(this.state.goodreads.url, this.state.goodreads.entryCount); } */
        /* if(this.state.instagram.userID){ this.getInstagramEntries(this.state.instagram.userID, this.state.instagram.entryCount); } */
    }

    getFeedEntries(myURL, entryCount) {
        var api_key = this.state.rss2json.apiKey ;
		var result = fetch(this.state.rss2json.apiURL + '?rss_url=' + myURL + '&api_key=' + api_key + '&count=' + entryCount, { method: 'GET', credentials: 'same-origin' } )
        .then(res => res.json())
        .then(
            (result) => {
                var i = 0;
                for(var prop in result.items) {
                    var myNewCard = [];
                    var item = result.items[prop];
                    myNewCard = item ;

                    /* ===== FIX FOR DESCRIPTION ===== */
                    if ( item.content ) {
                        if (item.content.length > 500) {
                            var doc = html2dom(item.content);
                            var itemContent = doc.innerHTML ;
                            myNewCard.content = itemContent;
                        }
                    } else {
                        var myImgBase = item.thumbnail ;
                        var myImgTag = '<img src="' + myImgBase + '" alt="' + item.title + '" title="' + item.title + '">';
                        myNewCard.content = '<p>' + myImgTag + item.title + '</p>' ;
                        /* myNewCard.description = myNewCard.content; */
                    }
                    /* ===== UPDATE STATE ===== */
                    var myCardDataFromState = this.state.myCardData ;
                    myCardDataFromState.push(myNewCard);
                    myCardDataFromState.sort(this.sortCardsByPubDate);
                    this.setState({ myCardData: myCardDataFromState });

                    if (i >= entryCount) { return false; }
                    i++;
                }
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error + " \n RSS2JSON API Call failed.");
            }
        );
		/* ===== UPDATE STATE ===== */
		pushNewValueToStateArray (this, 'myPromises', result);

	}

    sortCardsByPubDate(a, b) {
        var property = "pubDate";
        var dateA = new Date(a[property]);
        var dateB = new Date(b[property]);
        if (dateA < dateB) {
            return 1;
        } else if (dateA > dateB) {
            return -1;
        } else {
            return 0;
        }
    }

    componentDidMount(){
        var myOptions = [] ;
        this.gatherData();
        /* Promise.all(this.state.myPromises).then( result => { */
        // Promise.all(this.state.myPromises).then(function(){
        Promise.all(this.state.myPromises).then( () => {
            for (var prop in this.state.myCardData){
				var card = this.state.myCardData[prop];
                switch (true) {
                    case (card.link.indexOf("500px.com") > -1): myOptions = this.state.SOOpx; break;
                    case (card.link.indexOf("blog") > -1): myOptions = this.state.blog; break;
                    case (card.link.indexOf("etsy.com") > -1): myOptions = this.state.etsy; break;
                    case (card.link.indexOf("foursquare.com") > -1): myOptions = this.state.foursquare; break;
                    case (card.link.indexOf("flickr.com") > -1): myOptions = this.state.flickr; break;
                    case (card.link.indexOf("goodreads.com") > -1): myOptions = this.state.goodreads; break;
                    case (card.link.indexOf("instagram") > -1): myOptions = this.state.instagram; break;
                    case (card.link.indexOf("pinterest.com") > -1): myOptions = this.state.pinterest; break;
                    case (card.link.indexOf("shutterfly.com") > -1): myOptions = this.state.shutterfly; break;
                    case (card.link.indexOf("tumblr.com") > -1): myOptions = this.state.tumblr; break;
                    case (card.link.indexOf("twitter") > -1): myOptions = this.state.twitter; break;
                    case (card.link.indexOf("youtube") > -1): myOptions = this.state.youtube; break;
                    case (card.link.indexOf("other") > -1): myOptions = this.state.other; break;
                    default: myOptions = this.state.blank; break;
                }
				/* ===== UPDATE STATE ===== */
                var newSocialCard = <SocialCard key={card.guid} iconSrc={myOptions.iconSrc} iconSrcAlt={myOptions.iconSrcAlt} card={card} /> ;
				pushNewValueToStateArray(this, 'mySocialCards', newSocialCard);

                this.setState({ cardCount: prop })
            }
            this.setState({ promiseReady: true })
        })

    }

    render() {

        return this.state.mySocialCards

    }

}