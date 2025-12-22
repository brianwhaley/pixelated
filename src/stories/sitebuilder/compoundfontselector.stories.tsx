import { CompoundFontSelector } from '../../components/sitebuilder/config/CompoundFontSelector';

export default {
	title: 'SiteBuilder/Config/CompoundFontSelector',
	component: CompoundFontSelector,
	parameters: {
		layout: 'padded',
	},
};

export const Default = {
	args: {
		id: 'font-selector',
		name: 'font-selector',
		label: 'Font Stack',
		value: '',
	},
};

export const WithInitialValue = {
	args: {
		id: 'font-selector',
		name: 'font-selector',
		label: 'Font Stack',
		value: '"Montserrat", Arial, sans-serif',
	},
};

export const Required = {
	args: {
		id: 'font-selector',
		name: 'font-selector',
		label: 'Font Stack',
		required: true,
		value: '',
	},
};

export const HeaderFont = {
	args: {
		id: 'header-font',
		name: 'header-font',
		label: 'Header Font Stack',
		value: '"Montserrat", Verdana, sans-serif',
	},
};

export const BodyFont = {
	args: {
		id: 'body-font',
		name: 'body-font',
		label: 'Body Font Stack',
		value: '"Roboto", Helvetica, sans-serif',
	},
};