import { Callout, CalloutType } from "@brianwhaley/pixelated-components";

export type CalloutLibraryType = {
	variant?: CalloutType["variant"];
	gridColumns?: CalloutType["gridColumns"];
	layout?: CalloutType["layout"];
	direction?: CalloutType["direction"];
};

export function scheduleAppointment(props: CalloutLibraryType) {
	return (
		<Callout
			variant={props.variant || undefined}
			gridColumns={props.gridColumns || undefined}
			layout={props.layout || 'vertical'}
			direction={props.direction || undefined}
			url='/schedule' 
			img='/images/icons/calendar-icon.png'
			imgShape='squircle'
			title='Schedule Your Free Digital Assessment'
			content='Sign up for your free personalized consultations to understand your 
			current digital presence - web, social media, and search engine optimization - 
			and review tailored solutions that help you achieve your business goals. 
			Whether you need a new website, a social media strategy, 
			improved search engine optimization, or a complete 
			digital transformation, we are here to help. 
			Click here to schedule your free Digital Assessment today with Pixelated Technologies 
			and take the first step towards growing your business in the digital age.' />
	);
}
