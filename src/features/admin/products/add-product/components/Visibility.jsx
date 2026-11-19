import { Box, Flex, Switch, Text, Select, FormControl, FormLabel } from '@chakra-ui/react';
import { Eye } from 'lucide-react';

const Visibility = ({ values, onToggleChange, onChange }) => {
    return (
        <Box bg="white" border="1px solid" borderColor="#E2E8F0" borderRadius="14px" px={{ base: 5, md: 6 }} py={{ base: 5, md: 6 }} boxShadow="0 1px 2px rgba(16, 24, 40, 0.03)">
            <Flex align="center" gap="10px" mb="5">
                <Flex align="center" justify="center" w="24px" h="24px" color="#252A2F">
                    <Eye size={18} strokeWidth={2} />
                </Flex>
                <Text fontSize="12px" fontWeight="600" color="#59636E" letterSpacing="0.5px">
                    VISIBILITY
                </Text>
            </Flex>

            <Flex align="center" justify="space-between" gap={4} mt={6}>
                <Box>
                    <Text fontSize="12px" fontWeight="500" color="#252A2F">
                        Storefront Status
                    </Text>
                    <Text mt="2px" fontSize="11px" lineHeight="1.5" color="#756B66">
                        Make product visible to customers.
                    </Text>
                </Box>
                <Switch
                    name="publishStatus"
                    isChecked={values.publishStatus}
                    onChange={onToggleChange}
                    flexShrink={0}
                    size="md"
                    sx={{
                        'span.chakra-switch__track': { bg: '#E1E5EA' },
                        'span.chakra-switch__track[data-checked]': { bg: '#34D399' },
                    }}
                />
            </Flex>

            <FormControl mt={6}>
                <FormLabel mb="7px" fontSize="12px" fontWeight="500" color="#252A2F">
                    Product Category
                </FormLabel>
                <Select
                    name="category"
                    value={values.category || ''}
                    onChange={onChange}
                    h="44px"
                    borderRadius="8px"
                    borderColor="#DCE4ED"
                    bg="#F8FAFC"
                    fontSize="13px"
                    color="#252A2F"
                    _focus={{ borderColor: "#FF7A2F", boxShadow: "0 0 0 1px #FF7A2F" }}
                >
                    <option value="" disabled>Select a category</option>
                    <option value="home-living">Home & Living</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="beauty">Beauty</option>
                    <option value="technology">Technology</option>
                </Select>
            </FormControl>
        </Box>
    );
};

export default Visibility;