import { getXHRData, generateURL } from '../components/utilities/api';

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
	};

	const myMethod = 'GET';

	getXHRData(generateURL(flickrConfig.baseURL, flickrConfig.flickrProps), myMethod, (error, response, body) => {
		expect(error).toBe(null);
		expect(response.statusCode).toBe(200);
		expect(body).toMatchSnapshot();
		expect(body.length).toBeGreaterThan(0);
		expect(body[0].id).toBeDefined();
		expect(body.length).toBeGreaterThan(0);
	});

	getXHRData(generateURL('https://api.flickr.com/plorf/rest/?', flickrConfig.flickrProps), myMethod, (error, response, body) => {
		expect(error).toBe(null);
		expect(body).toBeDefined();
		expect(response.statusCode).toBe(404);
	});

	/* errors, blank / null, */
});
