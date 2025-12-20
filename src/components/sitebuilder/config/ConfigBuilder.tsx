import React, { useState, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Tab } from '../../general/tab';
import { FormEngine } from '../form/formengine';
import siteInfoForm from '../../../data/siteinfo-form.json';
import './ConfigBuilder.css';

const SiteInfoPropTypes = {
	name: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	favicon: PropTypes.string.isRequired,
	favicon_sizes: PropTypes.string.isRequired,
	favicon_type: PropTypes.string.isRequired,
	theme_color: PropTypes.string.isRequired,
	background_color: PropTypes.string.isRequired,
	default_locale: PropTypes.string.isRequired,
	display: PropTypes.string.isRequired,
	image: PropTypes.string,
	image_height: PropTypes.string,
	image_width: PropTypes.string,
	telephone: PropTypes.string,
	address: PropTypes.shape({
		streetAddress: PropTypes.string.isRequired,
		addressLocality: PropTypes.string.isRequired,
		addressRegion: PropTypes.string.isRequired,
		postalCode: PropTypes.string.isRequired,
		addressCountry: PropTypes.string.isRequired,
	}),
	priceRange: PropTypes.string,
	sameAs: PropTypes.arrayOf(PropTypes.string.isRequired),
	keywords: PropTypes.string,
};
type SiteInfoType = InferProps<typeof SiteInfoPropTypes>;

const RoutePropTypes = {
	path: PropTypes.string.isRequired,
	component: PropTypes.string.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
};
type RouteType = InferProps<typeof RoutePropTypes>;

const SiteConfigPropTypes = {
	siteInfo: PropTypes.shape(SiteInfoPropTypes).isRequired,
	routes: PropTypes.arrayOf(PropTypes.shape(RoutePropTypes).isRequired).isRequired,
};
type SiteConfigType = InferProps<typeof SiteConfigPropTypes>;

const ConfigBuilderPropTypes = {
	initialConfig: PropTypes.shape(SiteConfigPropTypes),
	onSave: PropTypes.func,
};
type ConfigBuilderPropsType = InferProps<typeof ConfigBuilderPropTypes>;

export function ConfigBuilder({ initialConfig, onSave }: ConfigBuilderPropsType) {
	const [config, setConfig] = useState<SiteConfigType>(initialConfig || { 
		siteInfo: { 
			name: '', 
			author: '', 
			description: '', 
			url: '', 
			email: '', 
			favicon: '/favicon.ico', 
			favicon_sizes: '64x64 32x32 24x24 16x16', 
			favicon_type: 'image/x-icon', 
			theme_color: '#ffffff', 
			background_color: '#ffffff', 
			default_locale: 'en', 
			display: 'standalone',
			address: {
				streetAddress: '',
				addressLocality: '',
				addressRegion: '',
				postalCode: '',
				addressCountry: ''
			}
		}, 
		routes: [] 
	});

	const [socialLinks, setSocialLinks] = useState<string[]>(initialConfig?.siteInfo?.sameAs || ['']);
	const [isFormValid, setIsFormValid] = useState(false);

	// Validate form whenever config changes
	useEffect(() => {
		const siteInfo = config.siteInfo || {};
		const isValid = 
			(siteInfo.name || '').trim() !== '' &&
			(siteInfo.author || '').trim() !== '' &&
			(siteInfo.description || '').trim() !== '' &&
			(siteInfo.url || '').trim() !== '' &&
			(siteInfo.email || '').trim() !== '' &&
			// Basic email validation
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteInfo.email || '');
		
		setIsFormValid(isValid);
	}, [config]);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const jsonContent = e.target?.result as string;
				const parsedConfig = JSON.parse(jsonContent);
				
				// Validate the structure
				if (parsedConfig.siteInfo && parsedConfig.routes) {
					setConfig(parsedConfig);
					setSocialLinks(parsedConfig.siteInfo.sameAs || ['']);
				} else {
					alert('Invalid configuration file. Expected siteInfo and routes properties.');
				}
			} catch {
				alert('Error parsing JSON file. Please ensure it contains valid JSON.');
			}
		};
		reader.readAsText(file);
		
		// Reset the input
		event.target.value = '';
	};

	useEffect(() => {
		if (initialConfig) {
			setConfig(prev => ({
				siteInfo: { ...prev.siteInfo, ...initialConfig.siteInfo },
				routes: initialConfig.routes || []
			}));
			setSocialLinks(initialConfig.siteInfo?.sameAs || ['']);
		}
	}, [initialConfig]);

	// Prepare form data for FormEngine with current values
	const formData = {
		fields: siteInfoForm.fields.map(field => ({
			...field,
			props: {
				...field.props,
				value: config.siteInfo[field.props.name as keyof SiteInfoType] || '',
				defaultValue: config.siteInfo[field.props.name as keyof SiteInfoType] || (field.props as any).defaultValue || '',
				onChange: (value: any) => {
					setConfig(prev => ({
						...prev,
						siteInfo: {
							...prev.siteInfo,
							[field.props.name]: value
						}
					}));
				}
			}
		}))
	};

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const siteInfoData: any = {};
		
		// Extract form data
		for (const [key, value] of formData.entries()) {
			siteInfoData[key] = value;
		}

		// Update config with form data
		setConfig(prev => ({
			...prev,
			siteInfo: {
				...prev.siteInfo,
				...siteInfoData,
				sameAs: socialLinks.filter(link => link.trim() !== '')
			}
		}));
	};

	const updateAddress = (field: keyof NonNullable<SiteInfoType['address']>, value: string) => {
		setConfig(prev => ({
			...prev,
			siteInfo: { 
				...prev.siteInfo, 
				address: { 
					...(prev.siteInfo.address || {}),
					[field]: value 
				} as NonNullable<SiteInfoType['address']>
			}
		}));
	};

	const addSocialLink = () => {
		setSocialLinks(prev => [...prev, '']);
	};

	const updateSocialLink = (index: number, value: string) => {
		setSocialLinks(prev => prev.map((link, i) => i === index ? value : link));
	};

	const removeSocialLink = (index: number) => {
		setSocialLinks(prev => prev.filter((_, i) => i !== index));
	};

	const addRoute = () => {
		setConfig(prev => ({
			...prev,
			routes: [...prev.routes, { path: '', component: '', title: '', description: '' }]
		}));
	};

	const updateRoute = (index: number, field: keyof RouteType, value: string) => {
		setConfig(prev => ({
			...prev,
			routes: prev.routes.map((route, i) =>
				i === index ? { ...route, [field]: value } : route
			)
		}));
	};

	const removeRoute = (index: number) => {
		setConfig(prev => ({
			...prev,
			routes: prev.routes.filter((_, i) => i !== index)
		}));
	};

	const handleSave = () => {
		if (!isFormValid) {
			alert('Please fill in all required fields correctly before saving.');
			return;
		}
		onSave?.(config);
	};

	return (
		<div className="config-builder">
			<h2>Config Builder</h2>
			<div className="file-upload-section">
				<label htmlFor="config-file-upload" className="file-upload-label">
					Load Configuration File:
				</label>
				<input
					id="config-file-upload"
					type="file"
					accept=".json"
					onChange={handleFileUpload}
					className="file-upload-input"
				/>
			</div>
			<Tab
				tabs={[
					{
						id: 'siteinfo',
						label: 'Site Info',
						content: (
							<div className="site-info-section">
								<FormEngine 
									formData={formData as any} 
									onSubmitHandler={handleFormSubmit}
									name="siteinfo"
									id="siteinfo"
								/>
								<div className="address-section">
									<h4>Address</h4>
									<div className="field-group">
										<label htmlFor="street-address">Street Address</label>
										<input
											id="street-address"
											type="text"
											placeholder="Street Address"
											value={config.siteInfo.address?.streetAddress || ''}
											onChange={(e) => updateAddress('streetAddress', e.target.value)}
										/>
									</div>
									<div className="field-group">
										<label htmlFor="city">City</label>
										<input
											id="city"
											type="text"
											placeholder="City"
											value={config.siteInfo.address?.addressLocality || ''}
											onChange={(e) => updateAddress('addressLocality', e.target.value)}
										/>
									</div>
									<div className="field-group">
										<label htmlFor="state-region">State/Region</label>
										<input
											id="state-region"
											type="text"
											placeholder="State/Region"
											value={config.siteInfo.address?.addressRegion || ''}
											onChange={(e) => updateAddress('addressRegion', e.target.value)}
										/>
									</div>
									<div className="field-group">
										<label htmlFor="postal-code">Postal Code</label>
										<input
											id="postal-code"
											type="text"
											placeholder="Postal Code"
											value={config.siteInfo.address?.postalCode || ''}
											onChange={(e) => updateAddress('postalCode', e.target.value)}
										/>
									</div>
									<div className="field-group">
										<label htmlFor="country">Country</label>
										<input
											id="country"
											type="text"
											placeholder="Country"
											value={config.siteInfo.address?.addressCountry || ''}
											onChange={(e) => updateAddress('addressCountry', e.target.value)}
										/>
									</div>
								</div>
								<div className="social-links-section">
									<h4>Social Links</h4>
									{socialLinks.map((link, index) => (
										<div key={index} className="field-group social-link-item">
											<input
												type="url"
												placeholder="https://social-link.com"
												value={link}
												onChange={(e) => updateSocialLink(index, e.target.value)}
											/>
											<button type="button" onClick={() => removeSocialLink(index)}>Remove</button>
										</div>
									))}
									<button type="button" onClick={addSocialLink}>Add Social Link</button>
								</div>
							</div>
						)
					},
					{
						id: 'routes',
						label: 'Routes',
						content: (
							<div className="routes-section">
								<div className="routes-list">
									{config.routes.map((route, index) => (
										<div key={index} className="route-item">
											<input
												type="text"
												placeholder="Path"
												value={route.path}
												onChange={(e) => updateRoute(index, 'path', e.target.value)}
											/>
											<input
												type="text"
												placeholder="Component"
												value={route.component}
												onChange={(e) => updateRoute(index, 'component', e.target.value)}
											/>
											<input
												type="text"
												placeholder="Title"
												value={route.title || ''}
												onChange={(e) => updateRoute(index, 'title', e.target.value)}
											/>
											<input
												type="text"
												placeholder="Description"
												value={route.description || ''}
												onChange={(e) => updateRoute(index, 'description', e.target.value)}
											/>
											<button onClick={() => removeRoute(index)}>Remove</button>
										</div>
									))}
								</div>
								<button onClick={addRoute}>Add Route</button>
							</div>
						)
					}
				]}
				orientation="top"
			/>
			<button 
				onClick={handleSave} 
				disabled={!isFormValid}
				className={isFormValid ? 'save-button-valid' : 'save-button-invalid'}
			>
				Save Config
			</button>
			{!isFormValid && (
				<div className="validation-message">
					Please fill in all required fields (marked with *) before saving.
				</div>
			)}
			<pre>{JSON.stringify(config, null, 2)}</pre>
		</div>
	);
}

ConfigBuilder.propTypes = ConfigBuilderPropTypes;