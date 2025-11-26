import { ContentfulItemDetail } from '../components/cms/contentful.items.components';
import '../components/cms/contentful.items.css';
import '../css/pixelated.global.css';

export default {
	title: 'CMS',
	component: ContentfulItemDetail
};

export const ContentfulItemDetailPage = {
	args: {
		apiProps: {
			proxyURL: 'https://proxy.pixelated.tech/prod/proxy?url=',
			base_url: "https://cdn.contentful.com",
			space_id: "soi9w77t7027",
			environment: "master",
			access_token: "muY9LfpCt4qoXosDsnRkkoH3DAVVuUFEuB0WRKRdBUM",
		},
		entry_id: "30DN0pfJeYieN31NU5X7oD",
		cloudinaryProductEnv: "dzjibwmev",
	}
};
