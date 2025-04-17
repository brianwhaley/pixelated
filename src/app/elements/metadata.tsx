import myroutes from '../data/routes.json';

export const getMetadata = ({ key, value }: { key: string; value: string }) => {
	function findObject( key: string = "name", value: string = "Home" ) {
		const myRoutes = myroutes.routes;
		return myRoutes.find(obj => obj && Object.prototype.hasOwnProperty.call(obj, key) && obj[key as keyof typeof obj] === value);
	}
	const foundObject = findObject(key, value);
	if (foundObject) {
		return {
			title: "Pixelated - Brian Whaley - " + foundObject.name,
			description: foundObject.description,
		};
	} else {
		return {
			title: "Pixelated - Brian Whaley",
			description: "",
		} ;
	}
};
