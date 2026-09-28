import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const MediaAssets = ({
    values, onCoverImageChange, onDigitalAssetChange, onRemoveCoverImage, onRemoveDigitalAsset,
}) => {
    const [isCoverDragging, setIsCoverDragging] = useState(false);
    const [coverPreview, setCoverPreview] = useState('');

    useEffect(() => {
        if (!values.coverImage) {
            setCoverPreview('');
            return undefined;
        }
        const previewUrl = URL.createObjectURL(values.coverImage);
        setCoverPreview(previewUrl);
        return () => {
            URL.revokeObjectURL(previewUrl);
        };
    }, [values.coverImage]);

    const handleCoverDrop = (event) => {
        event.preventDefault();
        setIsCoverDragging(false);
        const file = event.dataTransfer.files?.[0];
        if (file) { onCoverImageChange(file); }
    };

    const handleCoverDragOver = (event) => {
        event.preventDefault();
        setIsCoverDragging(true);
    };

    const handleCoverDragLeave = (event) => {
        event.preventDefault();
        setIsCoverDragging(false);
    };

    const handleCoverInputChange = (event) => {
        const file = event.target.files?.[0];
        if (file) { onCoverImageChange(file); }
        event.target.value = '';
    };

    const handleDigitalAssetChange = (event) => {
        const file = event.target.files?.[0];
        if (file) { onDigitalAssetChange(file); }
        event.target.value = '';
    };

    return (
        <Box bg="white" border="1px solid" borderColor="#E2E8F0" borderRadius="14px" px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }} boxShadow="0 1px 2px rgba(16, 24, 40, 0.03)">

            <Text fontSize={{ base: '18px', md: '20px' }} fontWeight="700" lineHeight="1.3" color="#20252B">
                Media & Assets
            </Text>

            <Text mt="6px" fontSize="14px" lineHeight="1.5" color="#756B66">
                Upload images and files for this product.
            </Text>

            <Box mt={{ base: 5, md: 6 }}>
                <Text fontSize="12px" fontWeight="500" color="#252A2F">Cover Image</Text>

                <Text mt="5px" fontSize="11px" lineHeight="1.5" color="#756B66">
                    This will be displayed on your storefront and checkout page. Recommended 16:9 ratio.
                </Text>

                <Input id="cover-image-input" type="file" display="none" accept=".jpg,.jpeg,.png,image/jpeg,image/png,image/jpg" onChange={handleCoverInputChange} />

                <Box mt="8px" position="relative" minH={{ base: '190px', md: '230px' }} border="1px dashed" borderColor={isCoverDragging ? '#FF7A2F' : '#DCE4ED'} borderRadius="8px" bg={isCoverDragging ? '#FFF9F5' : '#F8FAFC'} transition="all 0.2s ease" onDragOver={handleCoverDragOver} onDragLeave={handleCoverDragLeave} onDrop={handleCoverDrop}>
                    {coverPreview ? (
                        <Box position="absolute" inset="0" p="10px">
                            <Box position="relative" w="100%" h="100%" overflow="hidden" borderRadius="6px">
                                <Box as="img" src={coverPreview} alt="Cover preview" w="100%" h="100%" objectFit="cover" />

                                <Button position="absolute" top="8px" right="8px" size="sm" minW="32px" h="32px" p="0" borderRadius="6px" bg="white" color="#4A5568" boxShadow="0 1px 4px rgba(0,0,0,0.15)" onClick={onRemoveCoverImage} _hover={{ bg: '#FFF5F5', color: '#E53E3E' }}>
                                    <X size={16} />
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Flex direction="column" align="center" justify="center" minH={{ base: '190px', md: '230px' }} px={5} textAlign="center">
                            <Flex align="center" justify="center" w="38px" h="38px" borderRadius="50%" bg="#EEF2F6" color="#59636E">
                                <ImagePlus size={18} strokeWidth={1.8} />
                            </Flex>

                            <Button mt="10px" variant="unstyled" h="auto" fontSize="12px" fontWeight="600" color="#252A2F" onClick={() => document.getElementById('cover-image-input')?.click()} _hover={{ color: '#FF7A2F' }}>
                                Click to upload or drag and drop
                            </Button>

                            <Text mt="3px" fontSize="10px" color="#756B66">PNG, JPG or JPEG (max. 5MB)</Text>
                        </Flex>
                    )}
                </Box>
            </Box>

            <Box mt={{ base: 6, md: 7 }}>
                <Text fontSize="12px" fontWeight="500" color="#252A2F">Digital Asset File</Text>

                <Text mt="5px" fontSize="11px" lineHeight="1.5" color="#756B66">
                    Upload the file customers will download after purchase.
                </Text>

                <Input id="digital-asset-input" type="file" display="none" accept=".pdf,application/pdf,.jpg,.jpeg,.png,image/jpeg,image/png,image/jpg" onChange={handleDigitalAssetChange} />

                <Flex mt="8px" minH="72px" align="center" justify="space-between" gap={4} px={{ base: 3, md: 4 }} py={3} border="1px dashed" borderColor="#DCE4ED" borderRadius="8px" bg="#F8FAFC" flexDirection={{ base: 'column', sm: 'row' }}>
                    <Flex align="center" gap={3} minW="0" w={{ base: '100%', sm: 'auto' }}>
                        <Flex flexShrink={0} align="center" justify="center" w="34px" h="34px" borderRadius="6px" bg="#EEF2F6" color="#59636E">
                            <FileUp size={17} strokeWidth={1.8} />
                        </Flex>

                        <Box minW="0">
                            <Text fontSize="11px" fontWeight="600" color="#252A2F" noOfLines={1}>
                                {values.digitalAsset ? values.digitalAsset.name : 'Upload main file'}
                            </Text>

                            <Text mt="2px" fontSize="9px" color="#756B66">
                                {values.digitalAsset ? `${(values.digitalAsset.size / (1024 * 1024)).toFixed(2)} MB` : 'PDF, JPG, PNG (max. 5MB)'}
                            </Text>
                        </Box>
                    </Flex>

                    {values.digitalAsset ? (
                        <Button flexShrink={0} size="sm" h="32px" px={3} bg="white" border="1px solid" borderColor="#DCE4ED" color="#4A5568" fontSize="11px" onClick={onRemoveDigitalAsset} _hover={{ bg: '#FFF5F5', color: '#E53E3E' }}>
                            Remove
                        </Button>
                    ) : (
                        <Button flexShrink={0} size="sm" h="32px" px={4} bg="white" border="1px solid" borderColor="#DCE4ED" color="#252A2F" fontSize="11px" fontWeight="500" onClick={() => document.getElementById('digital-asset-input')?.click()} _hover={{ bg: '#F8FAFC', borderColor: '#CBD5E1' }}>
                            <Upload size={14} style={{ marginRight: '6px' }} />
                            Browse
                        </Button>
                    )}
                </Flex>
            </Box>
        </Box>
    );
};

export default MediaAssets;