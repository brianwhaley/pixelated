import { BuzzwordBingo } from '../components/buzzwordbingo/buzzwordbingo';
import '../components/buzzwordbingo/buzzwordbingo.css';
import '../css/pixelated.global.css';
import { buzzwords } from "../data/buzzwords";

export default {
	title: 'BuzzwordBingo',
	component: BuzzwordBingo
};

export const BuzzwordBingoStory = {
	args: {
		buzzwords: buzzwords
	}
};
