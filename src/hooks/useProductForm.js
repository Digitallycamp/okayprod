import { useCallback, useState } from 'react';
import { useCreateProductMutation } from '../features/admin/products/add-product/store/addProductApi';

const initialProductForm = {
    productType: 'digital',
    name: '',
    description: '',
    price: '',
    compareAtPrice: '',
    galleryImages: [],
    digitalAsset: null,
    liveStorefrontPreview: false,
    publishStatus: true,
    category: '',
    sku: '',
    barcode: '',
    weight: '',
    weightUnit: 'kg',
    length: '',
    width: '',
    height: '',
    shippingRateType: 'calculated',
};

const useProductForm = () => {
    const [formData, setFormData] = useState(initialProductForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createProduct] = useCreateProductMutation();

    const handleChange = useCallback((event) => {
        const { name, value, type, checked } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    const handleProductTypeChange = useCallback((productType) => {
        setFormData((previous) => ({ ...previous, productType }));
    }, []);

    const handleToggleChange = useCallback((event) => {
        const { name, checked } = event.target;
        setFormData((previous) => ({ ...previous, [name]: checked }));
    }, []);

    const handleGalleryImagesChange = useCallback((files) => {
        setFormData((previous) => ({
            ...previous,
            galleryImages: [...previous.galleryImages, ...files].slice(0, 5),
        }));
    }, []);

    const handleRemoveGalleryImage = useCallback((indexToRemove) => {
        setFormData((previous) => ({
            ...previous,
            galleryImages: previous.galleryImages.filter((_, index) => index !== indexToRemove),
        }));
    }, []);

    const handleDigitalAssetChange = useCallback((file) => {
        setFormData((previous) => ({ ...previous, digitalAsset: file }));
    }, []);

    const handleRemoveDigitalAsset = useCallback(() => {
        setFormData((previous) => ({ ...previous, digitalAsset: null }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialProductForm);
    }, []);

    const buildFormData = useCallback((isPublished) => {
        const data = new FormData();

        data.append('product_type', formData.productType);
        data.append('product_name', formData.name.trim());
        data.append('product_description', formData.description.trim());
        data.append('product_price', formData.price);
        data.append('currency', 'NGN');
        data.append('is_store_preview', String(formData.liveStorefrontPreview));
        data.append('is_published', String(isPublished));

        if (formData.compareAtPrice) {
            data.append('compare_at_price', formData.compareAtPrice);
        }
        if (formData.category) {
            data.append('category', formData.category);
        }

        formData.galleryImages.forEach((file) => {
            data.append('cover_image', file);
        });

        if (formData.digitalAsset) {
            data.append('digital_asset_file', formData.digitalAsset);
        }

        if (formData.productType === 'physical') {
            data.append('sku', formData.sku);
            data.append('barcode', formData.barcode || '');
            data.append('weight', formData.weight);
            data.append('weight_unit', formData.weightUnit);
            data.append('dimensions_length', formData.length);
            data.append('dimensions_width', formData.width);
            data.append('dimensions_height', formData.height);
            data.append('shipping_rate_type', formData.shippingRateType);
        }

        return data;
    }, [formData]);

    const handleSaveDraft = useCallback(async () => {
        setIsSubmitting('draft');
        const data = buildFormData(false);
        try {
            const response = await createProduct(data).unwrap();
            console.log('Product saved as draft:', response);
            return response;
        } catch (error) {
            console.error('Failed to save product as draft:', error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }, [buildFormData, createProduct]);

    const handlePublish = useCallback(async () => {
        setIsSubmitting('publish');
        const data = buildFormData(true);
        try {
            const response = await createProduct(data).unwrap();
            console.log('Product published:', response);
            return response;
        } catch (error) {
            console.error('Failed to publish product:', error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }, [buildFormData, createProduct]);

    return {
        formData,
        setFormData,
        isSubmitting,
        handleChange,
        handleProductTypeChange,
        handleToggleChange,
        handleGalleryImagesChange,
        handleRemoveGalleryImage,
        handleDigitalAssetChange,
        handleRemoveDigitalAsset,
        handleSaveDraft,
        handlePublish,
        resetForm,
        buildFormData,
    };
};

export default useProductForm;