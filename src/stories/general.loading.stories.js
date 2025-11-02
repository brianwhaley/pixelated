import React, { useEffect } from 'react';
import { Loading, ToggleLoading } from '../components/general/pixelated.loading';
import '../components/general/pixelated.loading.scss';
import '../css/pixelated.global.css';

export default {
	title: 'General',
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

export const LoadingSpinner = () => <Wrapper />;
LoadingSpinner.args = {};
