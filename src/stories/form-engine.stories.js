import { FormEngine } from '../components/form/pixelated.form';
import '../components/form/pixelated.form.css';
import '../css/pixelated.less';
import data from '../data/form.json';

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
