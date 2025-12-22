/* SidePanel canonical implementation */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './sidepanel.css';

export interface SidePanelProps {
	isOpen: boolean;
	onClose: () => void;
	onToggle?: () => void;
	position?: 'left' | 'right';
	width?: string;
	showOverlay?: boolean;
	showTab?: boolean;
	tabIcon?: React.ReactNode;
	tabLabel?: string;
	children?: React.ReactNode;
	className?: string;
}

export default function SidePanel({
	isOpen,
	onClose,
	onToggle,
	position = 'left',
	width = '300px',
	showOverlay = true,
	showTab = false,
	tabIcon /* = "≡" */ ,
	tabLabel,
	children,
	className = ''
}: SidePanelProps) {
	const portalRootRef = useRef<HTMLElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		if (typeof document === 'undefined') return;
		// Reuse existing root or create one
		let root = document.getElementById('sidepanel-portal-root');
		if (!root) {
			root = document.createElement('div');
			root.id = 'sidepanel-portal-root';
			document.body.appendChild(root);
		}
		portalRootRef.current = root;
		setHasMounted(true);
	}, []);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && isOpen && onClose();
		document.addEventListener('keydown', handleKey);
		return () => document.removeEventListener('keydown', handleKey);
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = '';
		return () => { document.body.style.overflow = ''; };
	}, [isOpen]);

	// Close on click outside if no overlay
	useEffect(() => {
		if (!isOpen || showOverlay) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, showOverlay, onClose]);

	if (!hasMounted || !portalRootRef.current) return null;

	const overlay = showOverlay && (
		<div 
			className="sidepanel-overlay"
			data-state={isOpen ? 'open' : 'closed'}
			onClick={onClose} 
			aria-hidden="true" 
		/>
	);

	const content = (
		<div 
			className="sidepanel-wrapper" 
			ref={wrapperRef}
			data-position={position}
			data-state={isOpen ? 'open' : 'closed'}
			data-has-tab={showTab ? 'true' : 'false'}
			style={{ '--panel-width': width } as React.CSSProperties}
		>
			<div 
				className={`sidepanel ${className}`} 
				role="dialog" 
				aria-modal="true" 
				aria-hidden={!isOpen}
			>
				<div className="sidepanel-content">{children}</div>
			</div>
			
			{showTab && (
				<button 
					className="sidepanel-fixed-tab" 
					onClick={() => onToggle?.()} 
					aria-label={isOpen ? 'Close panel' : 'Open panel'} 
					type="button"
				>
					{tabIcon && <span className="sidepanel-tab-icon">{tabIcon}</span>}
					{tabLabel && <span className="sidepanel-tab-label">{tabLabel}</span>}
				</button>
			)}
		</div>
	);

	return createPortal(
		<div className="sidepanel-portal">{overlay}{content}</div>,
		portalRootRef.current
	);
}

export { SidePanel };
