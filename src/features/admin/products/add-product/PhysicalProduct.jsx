import { ArrowLeft } from 'lucide-react';
import {
    Box,
    Button,
    Heading,
    Text,
    SimpleGrid,
} from '@chakra-ui/react';

import ProductType from './components/ProductType';
import BasicInformation from './components/BasicInformation';
import ProductGallery from './components/ProductGallery';
import InventoryShipping from './components/InventoryShipping';
import Visibility from './components/Visibility';
import ProductFormActions from './components/ProductFormActions';

import useProductForm from '../../../../hooks/useProductForm';

const PhysicalProduct = () => {
    const {
        formData,
        isSubmitting,
        handleChange,
        handleProductTypeChange,
        handleToggleChange,
        handleGalleryImagesChange,
        handleRemoveGalleryImage,
        handleSaveDraft,
        handlePublish,
        resetForm,
    } = useProductForm();

    const handleCancel = () => {
        resetForm();
    };

    return (
        <Box minH="100vh" bg="#F6F9FC" color="#20252B">
            <Box
                maxW="1200px"
                mx="auto"
                px={{ base: 4, sm: 5, md: 6, lg: 8 }}
                pt={{ base: 6, md: 8, lg: 10 }}
                pb={{ base: 24, md: 28 }}
            >
                {/* Header */}
                <Box mb={{ base: 6, md: 8 }}>
                    <Button
                        variant="unstyled"
                        display="inline-flex"
                        alignItems="center"
                        gap="5px"
                        h="auto"
                        p="0"
                        fontSize="12px"
                        fontWeight="500"
                        color="#665C57"
                        _hover={{ color: "#FF7A2F" }}
                    >
                        <ArrowLeft size={15} strokeWidth={1.8} />
                        <Text>Back to Inventory</Text>
                    </Button>

                    <Heading
                        mt={{ base: 3, md: 4 }}
                        fontSize={{ base: '28px', sm: '32px', md: '38px', lg: '40px' }}
                        lineHeight="1.1"
                        letterSpacing="-0.8px"
                        fontWeight="700"
                        color="#171C21"
                    >
                        Add New Product
                    </Heading>

                    <Text mt="8px" fontSize={{ base: '13px', md: '14px' }} lineHeight="1.5" color="#756B66">
                        Create a new offering for your storefront.
                    </Text>
                </Box>

                <ProductType
                    productType={formData.productType}
                    onProductTypeChange={handleProductTypeChange}
                />

                <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={6} mt={6}>
                    
                    <Box gridColumn={{ lg: 'span 8' }}>
                        <Box>
                            <BasicInformation values={formData} onChange={handleChange} />
                        </Box>
                        <Box mt={6}>
                            <InventoryShipping values={formData} onChange={handleChange} />
                        </Box>
                    </Box>

                    <Box gridColumn={{ lg: 'span 4' }}>
                        <Box>
                            <ProductGallery
                                values={formData}
                                onGalleryImagesChange={handleGalleryImagesChange}
                                onRemoveGalleryImage={handleRemoveGalleryImage}
                            />
                        </Box>
                        <Box mt={6}>
                            <Visibility
                                values={formData}
                                onToggleChange={handleToggleChange}
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>
                </SimpleGrid>
            </Box>

            <ProductFormActions
                onCancel={handleCancel}
                onSaveDraft={handleSaveDraft}
                onPublish={handlePublish}
                isSubmitting={isSubmitting}
            />
        </Box>
    );
};

export default PhysicalProduct;