"use client";

import React from "react";
import { ShoppingCart } from "@brianwhaley/pixelated-components";

// const sbPayPalApiKey = "AT10GG2ZHoApTtEw7dJoU6XRDYkf3wEvK2k_-eZ9GOvOK-REphG8yKCyZCqFi95OrxKgrdctlfWxayHG";
// const sbPayPalSecret = "EDUrdPonwcNYZwO5j7hNmFSmF-13zptaCndUnO0-Vr_j0GYEW4m-Tfar9IaukHwm0ixL5fUojOOFtZVk";
const payPalApiKey = "AeWRwYpsrfslATCndF6xjL4GLcqA1UxQZLC5vxQE-FTvPezXfLbCJO_uAFk5zoXUKRFnP-zJ_73yEkBE";
// const payPalSecret = "EBvYvynRXZCI6RbK4rg2NiENNG4N8tbgl8qAmpxB6f9nUkZjXMODxXJZ91JycP439kPrQcnB7uRKp0-F";

export default function Cart() {
	return (
		<>
			<section id="cart-section">
				<div className="section-container">
		            <ShoppingCart payPalClientID={payPalApiKey} />
				</div>
			</section>
		</>
	);
}
