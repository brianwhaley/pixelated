
import { getXHRData, generateURL } from './pixelated.api.js';

  test('Flickr data returns properly', () => {

	const flickrConfig = {
		baseURL: 'https://api.flickr.com/services/rest/?',
		flickrProps: {
			method: 'flickr.photos.search',
			api_key: '882cab5548d53c9e6b5fb24d59cc321d',
			user_id: '15473210@N04',
			tags: 'pixelatedviewsgallery',
			extras: 'date_taken,description,owner_name',
			sort: 'date-taken-desc',
			per_page: 500,
			format: 'json',
			nojsoncallback: 'true'
		}
	}
	getXHRData( generateURL(flickrConfig.baseURL, flickrConfig.flickrProps) , function (error, response, body) {
		expect(response.statusCode).toBe(200);
		expect(body).toMatchSnapshot();
		expect(body.length).toBeGreaterThan(0);
		expect(body[0].id).toBeDefined();
		expect(body.length).toBeGreaterThan(0);
	})

  });