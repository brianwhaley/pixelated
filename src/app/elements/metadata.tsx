import myroutes from '../data/routes.json';

export function getMetadata({ key, value }: { key: string; value: string }): { title: string; description: string; keywords: string } {
	function findObject( key: string = "name", value: string = "Home" ) {
		const myRoutes = myroutes.routes;
		return myRoutes.find(obj => obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key as keyof typeof obj] === value);
	}
	const foundObject = findObject(key, value);
	if (foundObject) {
		return {
			title: foundObject.name,
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
