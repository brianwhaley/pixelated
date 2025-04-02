"use client"

import React, { useEffect } from 'react';
import './pixelated.modal.css'

export function Modal(props) {

	useEffect(() => {

		const handleModalClose = (event) => {
			event.preventDefault();
			const myModal = document.getElementById("myModal");
			if (myModal) { myModal.style.display = 'none'; }
		};
		const myModalClose = document.getElementById("myModalClose");
		if (myModalClose) { myModalClose.addEventListener('click', handleModalClose) } ;

		const handleWindowOnClick = (event) => {
			const myModal = document.getElementById("myModal");
			if (event.target == myModal) {
				if (myModal) { myModal.style.display = "none" } ;
			}
		}
		window.addEventListener('click', handleWindowOnClick);

		return () => {
			window.removeEventListener('click', handleWindowOnClick);
			if (myModalClose) { myModalClose.removeEventListener('click', handleModalClose) } ;
		};

	}, []);

	return (
		<div id="myModal" className="modal" style={{display: 'none'}}>
			<div className="modalContent">
				<span id="myModalClose" className="rounded modalClose" aria-hidden="true">&times;</span>
				{ props.modalContent }
			</div>
		</div>
	);
}

/* 
https://www.w3schools.com/howto/howto_css_modals.asp
*/