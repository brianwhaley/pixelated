"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@brianwhaley/pixelated-components";

export type PageTitleType = {
    title: string
}
export function PageTitle({title}: PageTitleType ) {
    return (
        <>
            <br />
            <section className="section-bwchip textOutline" id="page-title-section">
                <PageHeader title={title} />
            </section>
        </>
    )
}