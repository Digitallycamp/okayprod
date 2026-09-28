import {
    Box,
    Button,
    Flex,
} from '@chakra-ui/react';

const ProductFormActions = ({
    onCancel,
    onSaveDraft,
    onPublish,
    isSubmitting = false,
}) => {
    return (
        <Box
            position="sticky"
            bottom="0"
            zIndex={10}
            bg="white"
            borderTop="1px solid"
            borderColor="#E6EBF0"
            boxShadow="0 -2px 8px rgba(16, 24, 40, 0.04)"
            px={{ base: 4, md: 6, lg: 8 }}
            py={{ base: 3, md: 4 }}
        >
            <Flex
                maxW="1200px"
                mx="auto"
                align={{ base: 'stretch', md: 'center' }}
                justify="space-between"
                gap={3}
                direction={{
                    base: 'column-reverse',
                    md: 'row',
                }}
            >
                
                <Button
                    variant="ghost"
                    h="38px"
                    px={3}
                    fontSize="11px"
                    fontWeight="500"
                    color="#4A4542"
                    onClick={onCancel}
                    isDisabled={isSubmitting}
                    _hover={{
                        bg: '#F7F8F9',
                    }}
                >
                    Cancel
                </Button>

                
                <Flex
                    gap={3}
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                    w={{
                        base: '100%',
                        md: 'auto',
                    }}
                >
                    <Button
                        h="38px"
                        px={{ base: 4, md: 5 }}
                        bg="white"
                        border="1px solid"
                        borderColor="#DCE4ED"
                        borderRadius="7px"
                        color="#343A40"
                        fontSize="11px"
                        fontWeight="500"
                        isLoading={
                            isSubmitting === 'draft'
                        }
                        isDisabled={
                            isSubmitting &&
                            isSubmitting !== 'draft'
                        }
                        onClick={onSaveDraft}
                        _hover={{
                            bg: '#F8FAFC',
                            borderColor: '#CBD5E1',
                        }}
                    >
                        Save as Draft
                    </Button>

                    <Button
                        h="38px"
                        px={{ base: 5, md: 6 }}
                        bg="#FF7A2F"
                        borderRadius="7px"
                        color="white"
                        fontSize="11px"
                        fontWeight="600"
                        isLoading={
                            isSubmitting === 'publish'
                        }
                        isDisabled={
                            isSubmitting &&
                            isSubmitting !== 'publish'
                        }
                        onClick={onPublish}
                        _hover={{
                            bg: '#EA6821',
                        }}
                        _active={{
                            bg: '#D95E1C',
                        }}
                    >
                        Publish Product
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ProductFormActions;