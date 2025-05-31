import { Table } from "../components/table/pixelated.table";
import requestData from "../data/requests.json";
import '../css/pixelated.global.css';


export default {
	title: 'Table',
	component: Table
};

export const Requests = {
	args: {
		data: requestData,
	}
};
