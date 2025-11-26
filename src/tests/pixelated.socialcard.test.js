import React from 'react';
import renderer from 'react-test-renderer';
/* import { shallow, mount, render } from 'enzyme'; */
import { mount } from 'enzyme';
import SocialCards, { SocialCard } from '../components/socialcard/socialcard';

const card = {
	title: 'Vintage 1960’s AMERICAN EXPRESS Credit Cards Sign by MoonshineMantiques',
	pubDate: '2019-10-14 01:43:16',
	link: 'https://www.etsy.com/listing/744423345/vintage-1960s-american-express-credit?ref=rss',
	guid: 'https://www.etsy.com/listing/744423345/vintage-1960s-american-express-credit',
	author: '',
	thumbnail: 'https://i.etsystatic.com/14377257/r/il/4b3d2f/1928553244/il_570xN.1928553244_je4r.jpg',
	description: '↵<p class="image"><img src="https://i.etsystatic.com/14377257/r/il/4b3d2f/1928553244/il_570xN.1928553244_je4r.jpg" border="0" width="570" height="429"></p>↵<p class="price">145.00 USD</p>↵<p class="description">AMERICAN EXPRESS SIGN<br>- Double Sided.<br>- Painted Metal<br>- Circa 1960’s<br>- 16" x 21"<br>- See pictures for best description.<br><br>Moonshine Mantiques - Mooresville, NC<br>Alan Cagle 980-521-1874<br><br>Specializing in Petroliana, Gas Pumps, and Advertising Signs<br>You can find us on Facebook, Instagram, EBay, and Etsy.</p>↵',
	content: '<img src="https://i.etsystatic.com/14377257/r/il/4b3d2f/1928553244/il_570xN.1928553244_je4r.jpg" border="0" width="570" height="429">'
};

const myState = {
	blog: { url: 'https://blog.pixelated.tech/feed/', iconSrcAlt: 'Pixelated Technologies Blog Post' },
	etsy: { url: 'https://www.etsy.com/people/bwhaley73/favorites/items.rss' },
	/* foursquare: { url: 'https://feeds.foursquare.com/history/LZSXBIJMSBHI5EQXV1GTQOVQW5XRJ0FP.rss' }, */
	/* goodreads:{ url: 'https://www.goodreads.com/review/list?id=49377228&v=2&key=mRDzpwnLeoPPAQf7CAIpPQ&shelf=currently-reading' }, */
	goodreads: { url: 'https://www.goodreads.com/review/list_rss/49377228?key=CAJAyLh9iRMHgyWZ781elQK_Bs8acH23gMzA2mvwiBIwPaah&shelf=currently-reading' },
	pinterest: { url: 'https://www.pinterest.com/brianwhaley/feed.rss' },
	tumblr: { url: 'http://pixelatedviews.tumblr.com/rss' },
	twitter: { url: 'https://twitrss.me/twitter_user_to_rss/?user=brianwhaley' },
	youtube: { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCKk2eBwml-4mEsmMK-dK6sQ' },

	SOOpx: { url: 'https://500px.com/brianwhaley/rss' },
	shutterfly: { url: 'https://cmd.shutterfly.com/commands/format/rss?site=brianwhaley&page=brianwhaley' }
	/* twitter: { url: 'https://twitrss.me/twitter_user_to_rss/?user=pixelatedviews' } */
};

describe('SocialCards', () => {
	test('SocialCards snapshot renders', () => {
		const cSocialCards = renderer.create(<SocialCards sources={myState} />);
		const tree = cSocialCards.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('SocialCard snapshot renders', () => {
		const iconSrc = 'images/etsy-logo.png';
		const iconSrcAlt = 'Etsy Favorite';

		const cSocialCard = renderer.create(<SocialCard iconSrc={iconSrc} iconSrcAlt={iconSrcAlt} card={card} />);
		const tree = cSocialCard.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('SocialCards gatherData function is called properly', () => {
		const cSocialCards = mount(<SocialCards sources={myState} />);
		const instance = cSocialCards.instance();
		jest.spyOn(instance, 'gatherData');
		instance.componentDidMount();
		expect(instance.gatherData).toHaveBeenCalledTimes(1);
	});

	test('SocialCards getFeedEntries function is called properly', () => {
		const cSocialCards = mount(<SocialCards sources={myState} />);
		const instance = cSocialCards.instance();
		jest.spyOn(instance, 'getFeedEntries');
		instance.componentDidMount();
		expect(instance.getFeedEntries).toHaveBeenCalledTimes(Object.keys(myState).length);
	});
});
