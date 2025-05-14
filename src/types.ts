
export type Route = {
	name?: string;
	path?: string;
	title?: string;
	description?: string; 
	keywords?: string;
	routes?: Route[];
	[key: string]: any; 
}