import { ContentfulItems } from '../components/cms/contentful.items.components';
import '../components/cms/contentful.items.css';
import '../css/pixelated.global.css';

export default {
	title: 'CMS',
	component: ContentfulItems
};

export const ContentfulItemsGrid = {
	args: {
		apiProps: {
			proxyURL: 'https://proxy.pixelated.tech/prod/proxy?url=',
			base_url: "https://cdn.contentful.com",
			space_id: "soi9w77t7027",
			environment: "master",
			access_token: "muY9LfpCt4qoXosDsnRkkoH3DAVVuUFEuB0WRKRdBUM",
		},
		cloudinaryProductEnv: "dzjibwmev",
	}
};
