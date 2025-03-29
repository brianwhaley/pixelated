"use client";

import React from "react"
import { MenuAccordion } from "../components/menu/pixelated.menu-accordion";
import myroutes from '../data/routes.json'
const allRoutes = myroutes.routes

export default function Nav() {
    const menuItems = allRoutes.map((thisRoute) => (
        { [thisRoute.name]: thisRoute.path } 
    )).reduce((obj, item) => {
        Object.assign(obj, item);
        return obj; 
    });
    return (
        <MenuAccordion menuItems={menuItems} ref={(myMenu) => { window.myMenu = myMenu; }}/>
    );
}
