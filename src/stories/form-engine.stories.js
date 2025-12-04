import React from 'react';
import { FormEngine } from '../components/form/form';
import { PixelatedClientConfigProvider } from '../components/config/config.client';
import data from '../data/form.json';
import '../components/form/form.css';
import '../css/pixelated.global.css';

const mockConfig = {
	cloudinary: {
		product_env: 'dlbon7tpq',
		baseUrl: 'https://res.cloudinary.com',
		transforms: 'f_auto,c_limit,q_auto,dpr_auto',
	},
};

function onSubmit(){
	alert("Hooray!  Submitted!");
}

export default {
	title: 'Form',
	component: FormEngine,
	decorators: [
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(Story) => (
			<PixelatedClientConfigProvider config={mockConfig}>
				<Story />
			</PixelatedClientConfigProvider>
		),
	],
};

export const Form_Engine = {
	args: {
		formData: data,
		onSubmitHandler: onSubmit
	}
};
