import { useCallback, useState } from 'react';

import { useCreateProductMutation } from '../features/admin/products/add-product/store/addProductApi';

const initialProductForm = {
    productType: 'digital',
    name: '',
    description: '',
    price: '',
    coverImage: null,
    digitalAsset: null,
    liveStorefrontPreview: false,
    publishStatus: true,
};

const useProductForm = () => {
    const [formData, setFormData] = useState(
        initialProductForm
    );

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [
        createProduct,
        { isLoading },
    ] = useCreateProductMutation();

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }, []);

    const handleProductTypeChange = useCallback(
        (productType) => {
            setFormData((previous) => ({
                ...previous,
                productType,
            }));
        },
        []
    );

    const handleToggleChange = useCallback((event) => {
        const { name, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: checked,
        }));
    }, []);

    const handleCoverImageChange = useCallback(
        (file) => {
            setFormData((previous) => ({
                ...previous,
                coverImage: file,
            }));
        },
        []
    );

    const handleDigitalAssetChange = useCallback(
        (file) => {
            setFormData((previous) => ({
                ...previous,
                digitalAsset: file,
            }));
        },
        []
    );

    const handleRemoveCoverImage = useCallback(() => {
        setFormData((previous) => ({
            ...previous,
            coverImage: null,
        }));
    }, []);

    const handleRemoveDigitalAsset = useCallback(() => {
        setFormData((previous) => ({
            ...previous,
            digitalAsset: null,
        }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialProductForm);
    }, []);

    
    const buildFormData = useCallback(
        (isPublished) => {
            const data = new FormData();

            data.append(
                'product_type',
                formData.productType
            );

            data.append(
                'product_name',
                formData.name.trim()
            );

            data.append(
                'product_description',
                formData.description.trim()
            );

            data.append(
                'product_price',
                formData.price
            );

            data.append(
                'currency',
                'NGN'
            );

            data.append(
                'is_store_preview',
                String(
                    formData.liveStorefrontPreview
                )
            );

            data.append(
                'is_published',
                String(isPublished)
            );

            if (formData.coverImage) {
                data.append(
                    'cover_image',
                    formData.coverImage
                );
            }

            if (formData.digitalAsset) {
                data.append(
                    'digital_asset_file',
                    formData.digitalAsset
                );
            }

            return data;
        },
        [formData]
    );

    const handleSaveDraft = useCallback(async () => {
        setIsSubmitting('draft');

        const data = buildFormData(false);

        try {
            const response =
                await createProduct(data).unwrap();

            console.log(
                'Product saved as draft:',
                response
            );

            return response;
        } catch (error) {
            console.error(
                'Failed to save product as draft:',
                error
            );

            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }, [
        buildFormData,
        createProduct,
    ]);

    const handlePublish = useCallback(async () => {
        setIsSubmitting('publish');

        const data = buildFormData(true);

        try {
            const response =
                await createProduct(data).unwrap();

            console.log(
                'Product published:',
                response
            );

            return response;
        } catch (error) {
            console.error(
                'Failed to publish product:',
                error
            );

            throw error;
        } finally {
            setIsSubmitting(false);
        }
    }, [
        buildFormData,
        createProduct,
    ]);

    return {
        formData,
        setFormData,

        isSubmitting,
        isLoading,

        handleChange,
        handleProductTypeChange,
        handleToggleChange,

        handleCoverImageChange,
        handleDigitalAssetChange,

        handleRemoveCoverImage,
        handleRemoveDigitalAsset,

        handleSaveDraft,
        handlePublish,

        resetForm,
        buildFormData,
    };
};

export default useProductForm;