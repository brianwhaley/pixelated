import React, { useState, useEffect } from 'react';
import { CalloutSmall } from "../components/callout/pixelated.callout";
import { Modal, handleModalOpen } from "../components/modal/pixelated.modal";

export default {
	title: 'Modal',
	component: Modal
};

const PageModal = () => {
    const [modalContent, setModalContent] = useState();
	const handleImageClick = (event, url) => {
		const myContent = <img src={url} alt="Modal Image" />;
		setModalContent(myContent);
		handleModalOpen(event);
  	};
	return (
		<>
        	<div className="row-4col">
                <div className="gridItem">
                    <CalloutSmall url="https://farm66.static.flickr.com/65535/50797219348_a7f5b18dd5_b.jpg" imgclick={handleImageClick} img="https://www.pixelated.tech/images/customs/black-white-splatter.jpg" alt="Black White Splatter" />
                </div>
            </div>
            <Modal modalContent={modalContent} />
		</>
	);
};

export const Primary = () => <PageModal />;