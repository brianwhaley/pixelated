import React from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from '../elements/pixelated.routing.js'

const RouterWrapper = () => {
	let element = useRoutes(routes);
	console.log(element);
	console.log(element.props.match.route);
	return element;
};

const MyRoutes = () => {
	return (
		<BrowserRouter>
			<RouterWrapper />
		</BrowserRouter>
	)
}

export default MyRoutes ;
