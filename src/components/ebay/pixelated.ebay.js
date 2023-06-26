/* eslint-disable */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { getXHRData, generateURL } from "../utilities/pixelated.api";
import { mergeDeep } from "../utilities/pixelated.functions";
import "./pixelated.ebay.css";

export class EbayItems extends Component {

	// https://developer.ebay.com/devzone/finding/HowTo/GettingStarted_JS_NV_JSON/GettingStarted_JS_NV_JSON.html
    
	static propTypes = {
		ebayProps: PropTypes.object.isRequired,
	};

	constructor (props) {
		super(props);
		this.gotoPage = this.gotoPage.bind(this);
		this.state = {
			/* 
			// proxyURL: "https://api.codetabs.com/v1/proxy/?quest=",
			// proxyURL: 'https://x3cf4kv0nk.execute-api.us-east-2.amazonaws.com/prod/proxy?url=',
			proxyURL: 'https://corsproxy.io/?',
			baseURL: "https://svcs.ebay.com/services/search/FindingService/v1?",
			urlProps: {
				"OPERATION-NAME": "findItemsByKeywords",
				"SERVICE-VERSION": "1.0.0",
				"SECURITY-APPNAME": "BrianWha-Pixelate-PRD-1fb4458de-1a8431fe",
				"GLOBAL-ID": "EBAY-US",
				"RESPONSE-DATA-FORMAT": "JSON",
				"REST-PAYLOAD": "",
				"keywords": "sunglasses",
				"outputSelector": "PictureURLSuperSize",
				"paginationInput.entriesPerPage": 10,
				"paginationInput.pageNumber": 1,
				"sortOrder": "StartTimeNewest",
				"itemFilter(0).name": "Seller",
				"itemFilter(0).value": "btw73"
				// url += "&callback=_cb_findItemsByKeywords";
			},
			filterarray: [{
				"name":"Seller",
				"value":"btw73",
				"paramName":"",
				"paramValue":""
			}], */
			proxyURL: "",
			baseURL: "",
			urlProps: {},
			filterarray: [{}],
			totalPages: 1,
			items: [],
		};
		if (this.props.ebayProps.proxyURL) { this.state.proxyURL = this.props.ebayProps.proxyURL; }
		if (this.props.ebayProps.baseURL) { this.state.baseURL = this.props.ebayProps.baseURL; }
		this.state.urlProps = mergeDeep(this.state.urlProps, this.props.ebayProps.urlProps);
	}

	// Generates an indexed URL snippet from the array of item filters
	buildURLArray(filterarray) {
		var urlfilter = "";
		// Iterate through each filter in the array
		for(var i=0; i<filterarray.length; i++) {
			//Index each item filter in filterarray
			var itemfilter = filterarray[i];
			// Iterate through each parameter in each item filter
			for(var index in itemfilter) {
				// Check to see if the paramter has a value (some don't)
				if (itemfilter[index] !== "") {
					if (itemfilter[index] instanceof Array) {
						for(var r=0; r<itemfilter[index].length; r++) {
							var value = itemfilter[index][r];
							urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
						}
					} else {
						urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
					}
				}
			}
		}
		return urlfilter;
	}

	loadItems(root){
		var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
		var pages = root.findItemsByKeywordsResponse[0].paginationOutput[0].totalPages;
		this.setState({totalPages: pages});
		var newItems = [];
		for (var i = 0; i < items.length; ++i) {
			var newItem = {};
			var item = items[i];
			newItem.title = item.title[0];
			// newItem.image = item.galleryURL[0];
			newItem.image = item.pictureURLSuperSize[0];
			newItem.price = (item.sellingStatus[0].currentPrice[0].__value__ * 1).toFixed(2);
			newItem.url = item.viewItemURL[0];
			newItem.location = item.location[0];
			newItem.endTime = item.listingInfo[0].endTime[0];
			newItem.watchCount = (item.listingInfo[0].watchCount) ? item.listingInfo[0].watchCount[0] * 1 : 0 ;
			newItem.id = item.itemId[0];
			newItem.key = item.itemId[0];
			newItems.push(newItem);
		}
		this.setState({items: newItems});
	}

	paintItems(items){
		var newItems = [];
		for (let i in items) {
			var item = items[i];
			var newItem = <EbayItemH url={item.url} image={item.image} title={item.title} price={item.price} id={item.id} key={item.id} location={item.location} endTime={item.endTime} watchCount={item.watchCount} />
			newItems.push(newItem);
		}
		return newItems;
	}

	gotoPage(pageNum) {
		window.scrollTo({top: 0})
		// window.scroll({ top: 0, behavior: 'smooth' })let state = { ...this.state };
		let state = { ...this.state };
		state.urlProps["paginationInput.pageNumber"] = pageNum ;
 		this.setState(state);
		this.componentDidMount();
	}

	componentDidMount() {
		const myURL = generateURL(this.state.proxyURL + this.state.baseURL, this.state.urlProps);
		console.log(myURL);
        // console.log(myURL);
		var myMethod = "GET";
		getXHRData(myURL, myMethod, (btw73) => {
			this.loadItems(btw73);
		});
	}

	render() {
		return (
			<div className="section-container">
				<div className="EbayPagination grid12">
					<EbayPagination 
						totalPages={ 1 * this.state.totalPages } 
						currentPage={ 1 * this.state.urlProps["paginationInput.pageNumber"] } 
						gotoPage={this.gotoPage}/>
				</div>
				<div id="EbayItems" className="EbayItems grid12">
					{ this.paintItems(this.state.items) }
				</div>
				<div className="EbayPagination grid12">
					<EbayPagination 
						totalPages={ 1 * this.state.totalPages } 
						currentPage={ 1 * this.state.urlProps["paginationInput.pageNumber"] } 
						gotoPage={this.gotoPage}/>
				</div>
			</div>
		);
	}

}


export class EbayItem extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		endTime: PropTypes.string.isRequired,
		watchCount: PropTypes.number,
		id: PropTypes.string.isRequired,
	};

	render () {
		var EbayItemTarget = this.props.url && this.props.url.substring(0, 4).toLowerCase() === "http" ? "_blank" : "_self" ;
		return (
			<div className="EbayItem column grid4">
                <div className="EbayItemHeader">
                    { this.props.url
                        ? <EbayItemHeader url={this.props.url} title={this.props.title} />
                        : <EbayItemHeader title={this.props.title} />
                    }
                </div>
				<div className="EbayItemPhoto grid12">
					{ this.props.url
						? <a href={this.props.url} target={EbayItemTarget} rel="noopener noreferrer"><img src={this.props.image} alt={this.props.title} /></a>
						: <img src={this.props.image} alt={this.props.title} />
					}
				</div>
				<div className="EbayItemDetails grid12">
					<div>Location: {this.props.location}</div>
					<div>End Time: {this.props.endTime}</div>
					<div>Watchers: {this.props.watchCount}</div>
				</div>
				<div className="EbayItemPrice">
					{ this.props.url
						? <a href={this.props.url} target={EbayItemTarget}>${this.props.price}</a>
						: $this.props.price
					}
				</div>
			</div>
		);
	}
}


export class EbayItemH extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		endTime: PropTypes.string.isRequired,
		watchCount: PropTypes.number,
		id: PropTypes.string.isRequired,
	};

	render () {
		var EbayItemTarget = this.props.url && this.props.url.substring(0, 4).toLowerCase() === "http" ? "_blank" : "_self" ;
		return (
			<div className="EbayItemH column grid6">

				<div className="EbayItemPhoto grid6">
					{ this.props.url
						? <a href={this.props.url} target={EbayItemTarget} rel="noopener noreferrer"><img src={this.props.image} alt={this.props.title} /></a>
						: <img src={this.props.image} alt={this.props.title} />
					}
				</div>
				<div className="grid6">
					<div className="EbayItemHeader">
						{ this.props.url
							? <EbayItemHeader url={this.props.url} title={this.props.title} />
							: <EbayItemHeader title={this.props.title} />
						}
					</div>
					<div className="EbayItemDetails grid12">
						<div>Location: {this.props.location}</div>
						<div>End Time: {new Date(this.props.endTime).toLocaleTimeString('en-us', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'} )}</div>
						<div>Watchers: {this.props.watchCount}</div>
					</div>
					<div className="EbayItemPrice">
						{ this.props.url
							? <a href={this.props.url} target={EbayItemTarget}>${this.props.price}</a>
							: $this.props.price
						}
					</div>
				</div>
			</div>
		);
	}
}


export class EbayItemHeader extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		url: PropTypes.string
	};

	render () {
		var EbayItemTarget = this.props.url && this.props.url.substring(0, 4).toLowerCase() === "http" ? "_blank" : "_self" ;
		return (
			<span>
				{ this.props.url
					? <a href={this.props.url} target={EbayItemTarget} rel="noopener noreferrer"><h2 className="">{this.props.title}</h2></a>
					: <h2 className="">{this.props.title}</h2>
				}
			</span>
		);
	}
}


export class EbayPagination extends Component {

	static propTypes = {
		totalPages: PropTypes.number,
		currentPage: PropTypes.number,
		gotoPage: PropTypes.func
	};

	render () {
		var pageLinks = [];
		console.log()
		for (let i = 1; i <= this.props.totalPages; i++) {
			var key = "page" + i ;
			// var pageLink = <div className="EbayPage" key={key} onClick={() => { this.props.gotoPage(i);} }>{i}</div> ;
			var pageLink = (i == this.props.currentPage ) 
				? <div className="EbayPageCurrent" key={key}>{i}</div>
				: <a href="#" className="EbayPage" key={key} onClick={(e) => { e.preventDefault(); this.props.gotoPage(i);}}>{i}</a> ;
			pageLinks.push(pageLink);
		}
		return(pageLinks);
	}
 
}