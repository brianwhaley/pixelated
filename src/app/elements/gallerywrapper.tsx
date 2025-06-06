import React, { useState, useEffect } from "react";
import { GetFlickrData, GenerateFlickrCards } from '@brianwhaley/pixelated-components';


export default async function GalleryWrapper(props: { tags: string; photoSize: string; callback: (arg0: any) => void; }) {

    const flickr = {
        flickr : {
            baseURL: 'https://api.flickr.com/services/rest/?',
            urlProps: {
                method: 'flickr.photos.search',
                api_key: '882cab5548d53c9e6b5fb24d59cc321d',
                user_id: '15473210@N04',
                tags: 'btw-customsunglasses',
                extras: 'date_taken,description,owner_name',
                sort: 'date-taken-desc',
                per_page: 500,
                format: 'json',
                photoSize: 'Large',
                nojsoncallback: 'true' 
            }
        } 
    }
    if (props.tags) flickr.flickr.urlProps.tags = props.tags;
    if (props.photoSize) flickr.flickr.urlProps.photoSize = props.photoSize;
    
    async function getFlickrCards() {
        const myPromise = GetFlickrData(flickr);
        const myFlickrImages = await myPromise;
        const myFlickrCards = await GenerateFlickrCards({flickrImages: myFlickrImages, photoSize: 'Medium'});
        // REMOVE LINKS
        if (await myFlickrCards) { 
            const myScrubbedFlickrCards = await myFlickrCards.map((obj: any) => {
                delete obj.link;
                delete obj.headerText;
                delete obj.bodyText;
                return obj;
                });
            props.callback(myScrubbedFlickrCards);
            return myScrubbedFlickrCards;
        }
    } 
    return getFlickrCards();
}
