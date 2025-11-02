"use client";

import React, { useEffect } from 'react';
import './pixelated.modal.css';

/* 
https://www.w3schools.com/howto/howto_css_modals.asp
*/

export function Modal(props: { modalContent: React.ReactNode, modalID?: string }) {

	const myModalID = "myModal" + (props.modalID ?? '');
	const myModalCloseID = "myModalClose" + (props.modalID ?? '');

	useEffect(() => {

		const handleModalClose = (event: MouseEvent) => {
			event.preventDefault();
			const myModal = document.getElementById(myModalID);
			if (myModal) { myModal.style.display = 'none'; }
		};
		const myModalClose = document.getElementById(myModalCloseID);
		if (myModalClose) { myModalClose.addEventListener('click', handleModalClose); } ;

		const handleWindowOnClick = (event: MouseEvent) => {
			const myModal = document.getElementById(myModalID);
			if (event.target == myModal) {
				if (myModal) { myModal.style.display = "none"; } ;
			}
		};
		window.addEventListener('click', handleWindowOnClick);

		return () => {
			window.removeEventListener('click', handleWindowOnClick);
			if (myModalClose) { myModalClose.removeEventListener('click', handleModalClose); } ;
		};

	}, []);

	return (
		<div id={myModalID} className="modal" style={{display: 'none'}}>
			<div className="modalContent">
				<span id={myModalCloseID} className="modalClose" aria-hidden="true">&times;</span>
				{ props.modalContent }
			</div>
		</div>
	);
}

export const handleModalOpen = (event: MouseEvent, modalID?: string) => {
	const myModalID = "myModal" + (modalID ?? '');
	event.preventDefault();
	const myModal = document.getElementById(myModalID);
	if (myModal) { myModal.style.display = 'block'; } ;
};
