import {
    Box,
    Flex,
    Switch,
    Text,
} from '@chakra-ui/react';

const SettingsVisibility = ({
    values,
    onToggleChange,
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
            
            <Text
                fontSize={{ base: '18px', md: '20px' }}
                fontWeight="700"
                lineHeight="1.3"
                color="#20252B"
            >
                Settings & Visibility
            </Text>

            <Text
                mt="6px"
                fontSize="14px"
                lineHeight="1.5"
                color="#756B66"
            >
                Configure how this product appears on your store.
            </Text>

            
            <Flex
                mt={{ base: 6, md: 7 }}
                align="center"
                justify="space-between"
                gap={4}
            >
                <Box>
                    <Text
                        fontSize="12px"
                        fontWeight="500"
                        color="#252A2F"
                    >
                        Live Storefront Preview
                    </Text>

                    <Text
                        mt="5px"
                        fontSize="11px"
                        lineHeight="1.5"
                        color="#756B66"
                    >
                        Allow customers to see a preview of
                        this product before purchasing.
                    </Text>
                </Box>

                <Switch
                    name="liveStorefrontPreview"
                    isChecked={
                        values.liveStorefrontPreview
                    }
                    onChange={onToggleChange}
                    flexShrink={0}
                    size="md"
                    sx={{
                        'span.chakra-switch__track': {
                            bg: '#E1E5EA',
                        },
                        'span.chakra-switch__track[data-checked]': {
                            bg: '#FF7A2F',
                        },
                    }}
                />
            </Flex>

            
            <Box
                mt={{ base: 5, md: 6 }}
                borderTop="1px solid"
                borderColor="#E7EBEF"
            />

            <Flex
                mt={{ base: 5, md: 6 }}
                align="center"
                justify="space-between"
                gap={4}
            >
                <Box>
                    <Text
                        fontSize="12px"
                        fontWeight="500"
                        color="#252A2F"
                    >
                        Publish Status
                    </Text>

                    <Text
                        mt="5px"
                        fontSize="11px"
                        lineHeight="1.5"
                        color="#756B66"
                    >
                        Make this product available for
                        purchase immediately.
                    </Text>
                </Box>

                <Switch
                    name="publishStatus"
                    isChecked={values.publishStatus}
                    onChange={onToggleChange}
                    flexShrink={0}
                    size="md"
                    sx={{
                        'span.chakra-switch__track': {
                            bg: '#E1E5EA',
                        },
                        'span.chakra-switch__track[data-checked]': {
                            bg: '#FF7A2F',
                        },
                    }}
                />
            </Flex>
        </Box>
    );
};

export default SettingsVisibility;