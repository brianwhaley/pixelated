import React from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from '../elements/pixelated.routing.js'

const RouterWrapper = () => {
	let element = useRoutes(routes);
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
