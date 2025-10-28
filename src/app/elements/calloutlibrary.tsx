import { Callout, CalloutType } from "@brianwhaley/pixelated-components";

export type CalloutLibraryType = {
	style?: CalloutType["style"];
	gridColumns?: CalloutType["gridColumns"];
	layout?: CalloutType["layout"];
	direction?: CalloutType["direction"];
};

export function scheduleAppointment(props: CalloutLibraryType) {
	return (
		<Callout
			style={props.style || undefined}
			gridColumns={props.gridColumns || undefined}
			layout={props.layout || 'vertical'}
			direction={props.direction || undefined}
			url='/schedule' 
			img='/images/icons/calendar-icon.png'
			imgShape='squircle'
			title='Schedule an Appointment'
			content='We offer personalized consultations to understand your business needs 
			and provide tailored solutions that help you achieve your goals. 
			Whether you need a new website, a social media strategy, 
			improved search engine optimization, or a complete 
			digital transformation, we are here to help. 
			Click here to schedule your appointment today with Pixelated Technologies 
			and take the first step towards growing your business in the digital age.' />
	);
}
