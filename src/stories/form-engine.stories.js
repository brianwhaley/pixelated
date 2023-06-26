import { FormEngine } from '../components/form/pixelated.form'
import '../components/form/pixelated.form.css'
import data from '../components/form/pixelated.form.json'

export default {
	title: 'Form Engine',
	component: FormEngine
}

export const Primary = {
	args: {
		formdata: data
	}
}
