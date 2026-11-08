import { useRef } from 'react';
import { useUploadLogoMutation } from '../features/admin/settings/store/storeFrontApi';
import useNotify from './useNotify';
export default function useStorefrontLogoUpload({
	setLogoFile,
	setLogoPreview,
	savedLogoPreview,
}) {
	const notify = useNotify();
	const fileInputRef = useRef(null);
	const [uploadLogo, { isLoading: isUploadingLogo }] = useUploadLogoMutation();

	const triggerFileUpload = () => {
		fileInputRef.current?.click();
	};

	const handleLogoUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onloadend = () => setLogoPreview(reader.result);
		reader.readAsDataURL(file);
		const formData = new FormData();
		formData.append('logo', file);

		try {
			const res = await uploadLogo(formData).unwrap();
			notify('success', 'Logo uploaded', res?.message || 'Your logo has been saved.');
			if (res?.data?.logo) setLogoPreview(res.data.logo);
			setLogoFile(file);
		} catch (err) {
			notify('error', 'Upload failed', err?.data?.message || 'Could not upload logo.');
			setLogoPreview(savedLogoPreview);
		}
	};

	return {
		fileInputRef,
		triggerFileUpload,
		handleLogoUpload,
		isUploadingLogo,
	};
}