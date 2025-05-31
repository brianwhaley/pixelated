import { BuzzwordBingo } from '../components/buzzwordbingo/pixelated.buzzwordbingo';
import '../components/buzzwordbingo/pixelated.buzzwordbingo.css';
import '../css/pixelated.global.css';
import { buzzwords } from "../data/buzzwords";

export default {
	title: 'BuzzwordBingo',
	component: BuzzwordBingo
};

export const Primary = {
	args: {
		buzzwords: buzzwords
	}
};
