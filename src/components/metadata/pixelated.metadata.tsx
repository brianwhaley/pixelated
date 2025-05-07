
import { getAllRoutes } from "../utilities/pixelated.routing"; 
// import myroutes from '@/data/routes.json';

/*
TODO #7 Finish setClientMetadata Function in MEtadata component
TODO #8 Finish setServerMetadata Function in MEtadata component
*/

export const getMetadata = (routes: any, key: string = "name", value: string = "Home" ) => {
    const allRoutes = getAllRoutes(routes, "routes");
    // const foundObject = routes.routes.find((obj: { [x: string]: string; }) => obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key as keyof typeof obj] === value);
    const foundObject = allRoutes.find((obj: { [x: string]: string; }) => obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key as keyof typeof obj] === value);
    if (foundObject) {
        return {
            title: foundObject.title,
            description: foundObject.description,
            keywords: foundObject.keywords,
        };
    } else {
        return {
            title: "",
            description: "",
            keywords: "",
        } ;
    }
};


export const setClientMetadata = ({title, description, keywords}: {title: string, description: string, keywords: string}) => {

    const titleElem = document.querySelector('title');
    if (titleElem) {
        titleElem.innerText = title;
    }

    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
        metaDesc.setAttribute('content', description);
    }

    const metaKeywords = document.querySelector("meta[name='keywords']");
    if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
    }
    
}

export const setServerMetadata = ({key, value}: { key: string; value: string }) => {
    const myMetaData = getMetadata({key, value});
    return {
        title: myMetaData.title,
        description: myMetaData.description,
        keywords: myMetaData.keywords
    }
}