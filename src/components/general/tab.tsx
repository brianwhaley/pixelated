import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import './tab.css';

const TabItemPropTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,//
	content: PropTypes.node.isRequired,
};
// type TabItemType = InferProps<typeof TabItemPropTypes>;

Tab.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.shape(TabItemPropTypes).isRequired).isRequired,
	orientation: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
	defaultActiveTab: PropTypes.string,
	onTabChange: PropTypes.func,
};
type TabType = InferProps<typeof Tab.propTypes>;

export function Tab({
	tabs,
	orientation = 'top',
	defaultActiveTab,
	onTabChange
}: TabType) {
	const [activeTab, setActiveTab] = useState<string>(
		defaultActiveTab || tabs[0]?.id || ''
	);

	const handleTabClick = (tabId: string) => {
		setActiveTab(tabId);
		onTabChange?.(tabId);
	};

	const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

	const tabClass = `tab-container tab-${orientation}`;

	return (
		<div className={tabClass}>
			<div className="tab-headers">
				{tabs.map(tab => (
					<button
						key={tab.id}
						className={`tab-header ${activeTab === tab.id ? 'active' : ''}`}
						onClick={() => handleTabClick(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className="tab-content">
				{activeContent}
			</div>
		</div>
	);
}
