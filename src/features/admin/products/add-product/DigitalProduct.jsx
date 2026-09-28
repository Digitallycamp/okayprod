import { ArrowLeft } from 'lucide-react';
import {
    Box,
    Button,
    Heading,
    Text,
} from '@chakra-ui/react';

import ProductType from './components/ProductType';
import BasicInformation from './components/BasicInformation';
import MediaAssets from './components/MediaAssets';
import SettingsVisibility from './components/SettingsVisibility';
import ProductFormActions from './components/ProductFormActions';

import useProductForm from '../../../../hooks/useProductForm';

const DigitalProduct = () => {
    const {
        formData,
        isSubmitting,

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
    } = useProductForm();

    const handleCancel = () => {
        resetForm();
    };

    return (
        <Box
            minH="100vh"
            bg="#F6F9FC"
            color="#20252B"
        >
            
            <Box
                maxW="1200px"
                mx="auto"
                px={{
                    base: 4,
                    sm: 5,
                    md: 6,
                    lg: 8,
                }}
                pt={{
                    base: 6,
                    md: 8,
                    lg: 10,
                }}
                pb={{
                    base: 24,
                    md: 28,
                }}
            >
                
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
                        _hover={{
                            color: "#FF7A2F",
                        }}
                    >
                        <ArrowLeft
                            size={15}
                            strokeWidth={1.8}
                        />

                        <Text>
                            Back to Inventory
                        </Text>
                    </Button>

                    <Heading
                        mt={{
                            base: 3,
                            md: 4,
                        }}
                        fontSize={{
                            base: '28px',
                            sm: '32px',
                            md: '38px',
                            lg: '40px',
                        }}
                        lineHeight="1.1"
                        letterSpacing="-0.8px"
                        fontWeight="700"
                        color="#171C21"
                    >
                        Add New Product
                    </Heading>

                    <Text
                        mt="8px"
                        fontSize={{
                            base: '13px',
                            md: '14px',
                        }}
                        lineHeight="1.5"
                        color="#756B66"
                    >
                        Create a new offering for your
                        storefront.
                    </Text>
                </Box>

                <ProductType
                    productType={formData.productType}
                    onProductTypeChange={
                        handleProductTypeChange
                    }
                />

                
                <Box mt={{ base: 5, md: 6 }}>
                    <BasicInformation
                        values={formData}
                        onChange={handleChange}
                    />
                </Box>

                <Box mt={{ base: 5, md: 6 }}>
                    <MediaAssets
                        values={formData}
                        onCoverImageChange={
                            handleCoverImageChange
                        }
                        onDigitalAssetChange={
                            handleDigitalAssetChange
                        }
                        onRemoveCoverImage={
                            handleRemoveCoverImage
                        }
                        onRemoveDigitalAsset={
                            handleRemoveDigitalAsset
                        }
                    />
                </Box>

                <Box mt={{ base: 5, md: 6 }}>
                    <SettingsVisibility
                        values={formData}
                        onToggleChange={
                            handleToggleChange
                        }
                    />
                </Box>
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

export default DigitalProduct;