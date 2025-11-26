import { FormEngine } from '../components/form/form';
import data from '../data/form.json';
import '../components/form/form.css';
import '../css/pixelated.global.css';

function onSubmit(){
	alert("Hooray!  Submitted!");
}

export default {
	title: 'Form',
	component: FormEngine
};

export const Form_Engine = {
	args: {
		formData: data,
		onSubmitHandler: onSubmit
	}
};
