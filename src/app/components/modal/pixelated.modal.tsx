"use client"

import React, { useEffect } from 'react';
import './pixelated.modal.css'

export default function Modal({ src } : { src: string }) {

  useEffect(() => {

    const handleModalClose = (event: MouseEvent) => {
      event.preventDefault();
      const myModal: HTMLElement | null = document.getElementById("myModal");
      (myModal) ? myModal.style.display = 'none' : null ;
    };
    const myModalClose = document.getElementById("myModalClose");
    (myModalClose) ? myModalClose.addEventListener('click', handleModalClose) : null ;

    const handleWindowOnClick = (event: MouseEvent) => {
      const myModal = document.getElementById("myModal");
      if (event.target == myModal) {
        (myModal) ? myModal.style.display = "none" : null;
      }
    }
    window.addEventListener('click', handleWindowOnClick);

    return () => {
      window.removeEventListener('click', handleWindowOnClick);
      (myModalClose) ? myModalClose.removeEventListener('click', handleModalClose) : null ;
    };

  }, []);

  return (
    <div id="myModal" className="modal" style={{display: 'none'}}>
      <div className="modalContent">
        <span id="myModalClose" className="rounded modalClose" aria-hidden="true">&times;</span>
        <img src={src} alt="Modal Image" />
      </div>
    </div>
  );
}

/* 
https://www.w3schools.com/howto/howto_css_modals.asp
*/