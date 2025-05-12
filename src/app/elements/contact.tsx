"use client";

import React from "react";
import "../globals.css"

export default function ContactCTA() {
    return (
        <div className="section-container">
            <div className="contactCTA">
                <div className="textOutline">
                    Discover the transformative power of epoxy flooring
                    <br />
                    Where durability meets modern elegance
                    <br />
                    <button type="button" onClick={() => { window.location.href = '/contact'; }}>CONTACT US</button>
                </div>
            </div>
        </div>
    );
}
