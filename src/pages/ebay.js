/* eslint-disable */ 

import React, { Component } from "react";
import { getXHRData, generateURL } from "@brianwhaley/pixelated-components/dist/index";

export default class Ebay extends Component {

	constructor (props) {
		super(props);
		this.state = {
			ebay: {
				baseURL: "https://svcs.ebay.com/services/search/FindingService/v1?",
				urlProps: {
					"OPERATION-NAME": "findItemsByKeywords",
					"SERVICE-VERSION": "1.0.0",
					"SECURITY-APPNAME": "BrianWha-Pixelate-PRD-1fb4458de-1a8431fe",
					"GLOBAL-ID": "EBAY-US",
					"RESPONSE-DATA-FORMAT": "JSON",
					"REST-PAYLOAD": "",
					"keywords": "sunglasses",
					"paginationInput.entriesPerPage": 10
					// url += "&callback=_cb_findItemsByKeywords";
				}
			},
			items:{},
		}
	}

	componentDidMount () {
		var myURL = generateURL(this.state.ebay.baseURL, this.state.ebay.urlProps);
		var myMethod = "GET";
		getXHRData(myURL, myMethod, (ebayItems) => {
			var myebayItems = ebayItems;
			this.setState({ images: myebayItems });
			_cb_findItemsByKeywords(myebayItems);
		});
	}

	_cb_findItemsByKeywords(root) {
		var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
		var html = [];
		html.push("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"3\"><tbody>");
		for (var i = 0; i < items.length; ++i) {
			var item     = items[i];
			var title    = item.title;
			var pic      = item.galleryURL;
			var viewitem = item.viewItemURL;
			if (null != title && null != viewitem) {
				html.push("<tr><td>" + "<img src=\"" + pic + "\" border=\"0\">" + "</td>" + "<td><a href=\"" + viewitem + "\" target=\"_blank\">" + title + "</a></td></tr>");
			}
		}
		html.push("</tbody></table>");
		document.getElementById("results").innerHTML = html.join("");
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

	// Define global variable for the URL filter
	render() {
		// Construct the request
		var url = "https://svcs.ebay.com/services/search/FindingService/v1";
		url += "?OPERATION-NAME=findItemsByKeywords";
		url += "&SERVICE-VERSION=1.0.0";
		url += "&SECURITY-APPNAME=BrianWha-Pixelate-PRD-1fb4458de-1a8431fe";
		url += "&GLOBAL-ID=EBAY-US";
		url += "&RESPONSE-DATA-FORMAT=JSON";
		// url += "&callback=_cb_findItemsByKeywords";
		url += "&REST-PAYLOAD";
		url += "&keywords=sunglasses";
		url += "&paginationInput.entriesPerPage=10";

		// Create a JavaScript array of the item filters you want to use in your request
		var filterarray = [
			{"name":"Seller",
				"value":"btw73",
				"paramName":"",
				"paramValue":""},
			/* {"name":"MaxPrice",
				"value":"25",
				"paramName":"Currency",
				"paramValue":"USD"},
			{"name":"FreeShippingOnly",
				"value":"true",
				"paramName":"",
				"paramValue":""},
			{"name":"ListingType",
				"value":["AuctionWithBIN", "FixedPrice"],
				"paramName":"",
				"paramValue":""}, */
		];

		// Submit the request
		var s = document.createElement("script"); // create script element
		s.src = url + this.buildURLArray(filterarray);
		document.body.appendChild(s);

		return (
			<div className="section-container">
				<div id="results"></div>
			</div>
		);
	}
}