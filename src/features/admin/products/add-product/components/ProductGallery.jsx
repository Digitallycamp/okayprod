import { Box, Button, Flex, Input, Text, SimpleGrid } from '@chakra-ui/react';
import { ImagePlus, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProductGallery = ({ values, onGalleryImagesChange, onRemoveGalleryImage }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (!values.galleryImages || values.galleryImages.length === 0) {
            setPreviews([]);
            return;
        }
        const urls = values.galleryImages.map((file) => URL.createObjectURL(file));
        setPreviews(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [values.galleryImages]);

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = Array.from(event.dataTransfer.files);
        if (files.length > 0) onGalleryImagesChange(files);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleInputChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) onGalleryImagesChange(files);
        event.target.value = '';
    };

    return (
        <Box bg="white" border="1px solid" borderColor="#E2E8F0" borderRadius="14px" px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }} boxShadow="0 1px 2px rgba(16, 24, 40, 0.03)">
            <Text fontSize="12px" fontWeight="600" color="#59636E" letterSpacing="0.5px" mb="4">
                PRODUCT GALLERY
            </Text>

            <Input id="gallery-image-input" type="file" display="none" multiple accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif" onChange={handleInputChange} />

            <Box
                position="relative"
                minH="150px"
                border="1px dashed"
                borderColor={isDragging ? '#FF7A2F' : '#DCE4ED'}
                borderRadius="8px"
                bg={isDragging ? '#FFF9F5' : '#F8FAFC'}
                transition="all 0.2s ease"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={4}
            >
                <Flex align="center" justify="center" w="38px" h="38px" borderRadius="50%" bg="white" color="#59636E" boxShadow="0 1px 4px rgba(0,0,0,0.05)">
                    <ImagePlus size={18} strokeWidth={1.8} />
                </Flex>
                <Button mt="10px" variant="unstyled" h="auto" fontSize="12px" fontWeight="600" color="#252A2F" onClick={() => document.getElementById('gallery-image-input')?.click()} _hover={{ color: '#FF7A2F' }}>
                    Click to upload or drag & drop
                </Button>
                <Text mt="3px" fontSize="10px" color="#756B66">SVG, PNG, JPG or GIF (max. 10MB)</Text>
            </Box>

            {/* Image Previews */}
            <SimpleGrid columns={3} spacing={3} mt={4}>
                {previews.map((preview, index) => (
                    <Box key={index} position="relative" borderRadius="8px" overflow="hidden" h="80px" border="1px solid #E2E8F0">
                        <Box as="img" src={preview} alt={`Gallery ${index}`} w="100%" h="100%" objectFit="cover" />
                        <Button position="absolute" top="4px" right="4px" size="xs" minW="24px" h="24px" p="0" borderRadius="full" bg="white" color="#4A5568" boxShadow="0 1px 4px rgba(0,0,0,0.15)" onClick={() => onRemoveGalleryImage(index)} _hover={{ bg: '#FFF5F5', color: '#E53E3E' }}>
                            <X size={12} />
                        </Button>
                    </Box>
                ))}
                
                {previews.length > 0 && previews.length < 5 && (
                    <Flex
                        as="button"
                        type="button"
                        onClick={() => document.getElementById('gallery-image-input')?.click()}
                        align="center"
                        justify="center"
                        h="80px"
                        border="1px dashed #DCE4ED"
                        borderRadius="8px"
                        bg="#F8FAFC"
                        color="#A6AEB8"
                        _hover={{ bg: '#F1F5F9', borderColor: '#CBD5E1' }}
                    >
                        <Plus size={20} />
                    </Flex>
                )}
            </SimpleGrid>
        </Box>
    );
};

export default ProductGallery;