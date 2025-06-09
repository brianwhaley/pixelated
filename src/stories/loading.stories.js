import React, { useEffect } from 'react';
import { Loading, ToggleLoading } from '../components/loading/pixelated.loading';
import '../css/pixelated.global.css';

export default {
	title: 'Loading',
	component: Loading
};

const Wrapper = () => {
	useEffect(() => {
		ToggleLoading({ show: true });
	}, []);
	return (
		<>
			<Loading />
		</>
	);
};

export const Primary = () => <Wrapper />;
Primary.args = {};
