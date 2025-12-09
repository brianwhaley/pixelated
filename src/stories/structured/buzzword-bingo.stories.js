import { BuzzwordBingo } from '@/components/structured/buzzwordbingo';
import { buzzwords } from "@/data/buzzwords";
import '@/css/pixelated.global.css';

export default {
	title: 'Structured',
	component: BuzzwordBingo
};

export const BuzzwordBingoStory = {
	args: {
		buzzwords: buzzwords
	}
};
