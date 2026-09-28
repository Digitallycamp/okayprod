import { useState, useEffect } from 'react';
import { initialState } from '../utils/storeFrontInitial';

export default function useStorefrontForm(storefrontRes) {
	const [brandColor, setBrandColor] = useState(initialState.brandColor);
	const [isAnnouncementActive, setIsAnnouncementActive] = useState(
		initialState.isAnnouncementActive
	);
	const [announcementText, setAnnouncementText] = useState(
		initialState.announcementText
	);
	const [logoFile, setLogoFile] = useState(initialState.logoFile);
	const [logoPreview, setLogoPreview] = useState(initialState.logoPreview);
	const [savedState, setSavedState] = useState({ ...initialState });

	const maxLength = 150;
	const charCount = announcementText.length;
	const isOverLimit = charCount > maxLength;
	useEffect(() => {
		const data = storefrontRes?.data;
		if (!data) return;

		const serverState = {
			brandColor: data.primaryBrandColor ?? initialState.brandColor,
			isAnnouncementActive:
				data.announcementBar ?? initialState.isAnnouncementActive,
			announcementText: data.messageContent ?? initialState.announcementText,
			logoFile: null,
			logoPreview: data.logo ?? null,
		};

		setBrandColor(serverState.brandColor);
		setIsAnnouncementActive(serverState.isAnnouncementActive);
		setAnnouncementText(serverState.announcementText);
		setLogoFile(serverState.logoFile);
		setLogoPreview(serverState.logoPreview);
		setSavedState(serverState);
	}, [storefrontRes]);

	const hasChanges = () => {
		return (
			brandColor !== savedState.brandColor ||
			isAnnouncementActive !== savedState.isAnnouncementActive ||
			announcementText !== savedState.announcementText ||
			logoFile !== savedState.logoFile ||
			logoPreview !== savedState.logoPreview
		);
	};

	const discard = () => {
		setBrandColor(savedState.brandColor);
		setIsAnnouncementActive(savedState.isAnnouncementActive);
		setAnnouncementText(savedState.announcementText);
		setLogoFile(savedState.logoFile);
		setLogoPreview(savedState.logoPreview);
	};

	return {
		brandColor,
		isAnnouncementActive,
		announcementText,
		logoFile,
		logoPreview,
		savedState,
		maxLength,
		charCount,
		isOverLimit,
		setBrandColor,
		setIsAnnouncementActive,
		setAnnouncementText,
		setLogoFile,
		setLogoPreview,
		hasChanges,
		discard,
	};
}