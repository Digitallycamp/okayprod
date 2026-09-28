import { Archive, CloudUpload, Headphones } from 'lucide-react';
import {
    Box,
    Flex,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';

const productTypes = [
    {
        value: 'digital',
        label: 'Digital Product',
        description: 'Files, E-books, Templates',
        icon: CloudUpload,
    },
    {
        value: 'physical',
        label: 'Physical Product',
        description: 'Shippable goods, Merch',
        icon: Archive,
    },
    {
        value: 'service',
        label: 'Service',
        description: 'Consulting, Coaching',
        icon: Headphones,
    },
];

const ProductType = ({
    productType = 'digital',
    onProductTypeChange,
}) => {
    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="#E2E8F0"
            borderRadius="14px"
            px={{ base: 5, md: 6 }}
            py={{ base: 5, md: 6 }}
            boxShadow="0 1px 2px rgba(16, 24, 40, 0.03)"
        >
            {/* Section heading */}
            <Text
                fontSize={{ base: '18px', md: '20px' }}
                fontWeight="700"
                lineHeight="1.3"
                color="#20252B"
            >
                Product Type
            </Text>

            <Text
                mt="6px"
                fontSize="14px"
                lineHeight="1.5"
                color="#756B66"
            >
                What kind of product are you adding?
            </Text>

            
            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={{ base: 3, md: 3 }}
                mt={{ base: 5, md: 6 }}
            >
                {productTypes.map((type) => {
                    const Icon = type.icon;
                    const isActive = productType === type.value;

                    return (
                        <Box
                            key={type.value}
                            as="button"
                            type="button"
                            onClick={() =>
                                onProductTypeChange?.(type.value)
                            }
                            w="100%"
                            minH={{ base: '92px', md: '98px' }}
                            px={4}
                            py={4}
                            bg={isActive ? '#FFF9F5' : 'white'}
                            border="2px solid"
                            borderColor={
                                isActive
                                    ? '#FF7A2F'
                                    : '#E2E8F0'
                            }
                            borderRadius="10px"
                            transition="all 0.2s ease"
                            textAlign="center"
                            cursor="pointer"
                            _hover={{
                                borderColor: isActive
                                    ? '#FF7A2F'
                                    : '#C9D2DD',
                                bg: isActive
                                    ? '#FFF9F5'
                                    : '#FAFBFC',
                            }}
                            _focusVisible={{
                                outline: '2px solid',
                                outlineColor: '#FF7A2F',
                                outlineOffset: '2px',
                            }}
                        >
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                h="100%"
                            >
                            
                                <Box
                                    mb="6px"
                                    color={
                                        isActive
                                            ? '#FF7A2F'
                                            : '#665C57'
                                    }
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={1.8}
                                    />
                                </Box>

                                <Text
                                    fontSize="13px"
                                    fontWeight="500"
                                    lineHeight="1.3"
                                    color="#252A2F"
                                >
                                    {type.label}
                                </Text>

                                <Text
                                    mt="3px"
                                    fontSize="10px"
                                    lineHeight="1.3"
                                    color="#756B66"
                                >
                                    {type.description}
                                </Text>
                            </Flex>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default ProductType;