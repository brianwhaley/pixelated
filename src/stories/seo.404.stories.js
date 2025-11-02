import { FourOhFour } from "../components/seo/pixelated.404";
import '../css/pixelated.global.css';
import data404 from "../data/404-data.json";
const images = data404.images;

export default {
    title: 'SEO',
    component: FourOhFour
};

export const NotFound = {
    args: {
        images: images
    }
};
