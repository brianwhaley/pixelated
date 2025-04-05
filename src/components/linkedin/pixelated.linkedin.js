import React, { useState, useEffect } from 'react';

export function LinkedIn(props) {

	const [data, setData] = useState(null);
	const proxyURL = 'https://proxy.pixelated.tech/prod/proxy?url=';
	const url = 'https://api.linkedin.com/v2/recommendation?q=recipient&statusFilters=List(VISIBLE)';
	const clientID = '78sh51y6nl3xe8';
	const clientSecret = 'WPL_AP1.dug4iQXjl3VjEGG0.tok/0A==';
	useEffect(() => {
		fetch(proxyURL + url, {
			method: 'GET',
			headers: new Headers({
				'Authorization': `Bearer ${clientSecret}`, 
				'Content-Type': 'application/json',
				'X-Restli-Protocol-Version': '2.0.0'
			})
		})
			.then(response => response.json())
			.then(data => setData(data))
			.then(data => console.log(data))
			.catch(error => console.error('There was an error!', error));
	}, []);

	return (
		<div>
			{data ? <div>{JSON.stringify(data)}</div> : <p>Loading...</p>}
		</div>
	);
}

/* 
https://www.linkedin.com/company/pixelatedtech
https://www.linkedin.com/company/106825397/admin/dashboard/

https://developer.linkedin.com/
https://www.linkedin.com/developers/apps/222241632/products?refreshKey=1743873578146
https://learn.microsoft.com/en-us/linkedin/shared/integrations/people/reputation-guides/recommendation

https://github.com/jsushank17/LinkedIN-Rest-API-with-React-JS-and-Express/blob/master/CustomLinkedIN.jsx
*/