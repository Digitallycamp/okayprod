import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Select,
} from '@chakra-ui/react';
import { Package } from 'lucide-react';

const InventoryShipping = ({ values, onChange }) => {
    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="#E2E8F0"
            borderRadius="14px"
            px={{ base: 5, md: 6 }}
            py={{ base: 5, md: 6 }}
            boxShadow="0 1px 2px rgba(16, 24, 40, 0.03)"
            h="100%"
        >
            <Flex align="center" gap="10px" mb="6px">
                <Flex align="center" justify="center" w="24px" h="24px" borderRadius="50%" bg="#E6F4EA" color="#2F855A">
                    <Package size={14} strokeWidth={2} />
                </Flex>
                <Text fontSize={{ base: '18px', md: '20px' }} fontWeight="700" lineHeight="1.3" color="#20252B">
                    Inventory & Shipping
                </Text>
            </Flex>

            <Box mt="6">
                <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
                    <FormControl flex="1">
                        <FormLabel mb="7px" fontSize="12px" fontWeight="500" color="#252A2F">
                            SKU (Stock Keeping Unit)
                        </FormLabel>
                        <Input
                            name="sku"
                            value={values.sku}
                            onChange={onChange}
                            placeholder="e.g. CER-VASE-01"
                            h="44px"
                            borderRadius="8px"
                            borderColor="#DCE4ED"
                            bg="#F8FAFC"
                            fontSize="13px"
                            _placeholder={{ color: "#A6AEB8" }}
                            _focus={{ borderColor: "#FF7A2F", boxShadow: "0 0 0 1px #FF7A2F" }}
                        />
                    </FormControl>
                    <FormControl flex="1">
                        <FormLabel mb="7px" fontSize="12px" fontWeight="500" color="#252A2F">
                            Barcode / ISBN
                        </FormLabel>
                        <Input
                            name="barcode"
                            value={values.barcode}
                            onChange={onChange}
                            placeholder="UPC, EAN, or ISBN"
                            h="44px"
                            borderRadius="8px"
                            borderColor="#DCE4ED"
                            bg="#F8FAFC"
                            fontSize="13px"
                            _placeholder={{ color: "#A6AEB8" }}
                            _focus={{ borderColor: "#FF7A2F", boxShadow: "0 0 0 1px #FF7A2F" }}
                        />
                    </FormControl>
                </Flex>

                <Box mt="6">
                    <Text fontSize="12px" fontWeight="600" color="#252A2F" mb="3">
                        Physical Attributes
                    </Text>
                    <Flex gap={4} direction={{ base: 'column', sm: 'row' }} align="flex-end">
                        <FormControl>
                            <FormLabel mb="7px" fontSize="10px" fontWeight="500" color="#756B66">
                                Weight
                            </FormLabel>
                            <Flex>
                                <Input
                                    name="weight"
                                    type="number"
                                    min="0"
                                    value={values.weight}
                                    onChange={onChange}
                                    placeholder="0"
                                    h="40px"
                                    borderRightRadius="0"
                                    borderColor="#DCE4ED"
                                    bg="#F8FAFC"
                                    fontSize="13px"
                                />
                                <Select
                                    name="weightUnit"
                                    value={values.weightUnit}
                                    onChange={onChange}
                                    w="70px"
                                    h="40px"
                                    borderLeftRadius="0"
                                    borderColor="#DCE4ED"
                                    bg="#EDF2F7"
                                    fontSize="12px"
                                    fontWeight="500"
                                >
                                    <option value="kg">kg</option>
                                    <option value="g">g</option>
                                    <option value="lb">lb</option>
                                    <option value="oz">oz</option>
                                </Select>
                            </Flex>
                        </FormControl>

                        <FormControl>
                            <FormLabel mb="7px" fontSize="10px" fontWeight="500" color="#756B66">
                                Length (cm)
                            </FormLabel>
                            <Input
                                name="length"
                                type="number"
                                min="0"
                                value={values.length}
                                onChange={onChange}
                                placeholder="0"
                                h="40px"
                                borderRadius="8px"
                                borderColor="#DCE4ED"
                                bg="#F8FAFC"
                                fontSize="13px"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel mb="7px" fontSize="10px" fontWeight="500" color="#756B66">
                                Width (cm)
                            </FormLabel>
                            <Input
                                name="width"
                                type="number"
                                min="0"
                                value={values.width}
                                onChange={onChange}
                                placeholder="0"
                                h="40px"
                                borderRadius="8px"
                                borderColor="#DCE4ED"
                                bg="#F8FAFC"
                                fontSize="13px"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel mb="7px" fontSize="10px" fontWeight="500" color="#756B66">
                                Height (cm)
                            </FormLabel>
                            <Input
                                name="height"
                                type="number"
                                min="0"
                                value={values.height}
                                onChange={onChange}
                                placeholder="0"
                                h="40px"
                                borderRadius="8px"
                                borderColor="#DCE4ED"
                                bg="#F8FAFC"
                                fontSize="13px"
                            />
                        </FormControl>
                    </Flex>
                </Box>

                <Box mt="6">
                    <Text fontSize="12px" fontWeight="600" color="#252A2F" mb="3">
                        Shipping Rates
                    </Text>
                    <RadioGroup name="shippingRateType" value={values.shippingRateType} onChange={(val) => onChange({ target: { name: 'shippingRateType', value: val } })}>
                        <Stack spacing={3}>
                            <Box
                                border="1px solid"
                                borderColor={values.shippingRateType === 'calculated' ? '#FF7A2F' : '#E2E8F0'}
                                borderRadius="8px"
                                p={4}
                                bg={values.shippingRateType === 'calculated' ? '#FFF9F5' : 'white'}
                                cursor="pointer"
                                onClick={() => onChange({ target: { name: 'shippingRateType', value: 'calculated' } })}
                            >
                                <Radio value="calculated" colorScheme="orange" size="sm">
                                    <Text fontWeight="600" fontSize="12px" color="#252A2F">Calculated at Checkout</Text>
                                    <Text fontSize="11px" color="#756B66" mt="1">Rates are automatically calculated based on the customer's location and product dimensions.</Text>
                                </Radio>
                            </Box>
                            <Box
                                border="1px solid"
                                borderColor={values.shippingRateType === 'flat' ? '#FF7A2F' : '#E2E8F0'}
                                borderRadius="8px"
                                p={4}
                                bg={values.shippingRateType === 'flat' ? '#FFF9F5' : 'white'}
                                cursor="pointer"
                                onClick={() => onChange({ target: { name: 'shippingRateType', value: 'flat' } })}
                            >
                                <Radio value="flat" colorScheme="orange" size="sm">
                                    <Text fontWeight="600" fontSize="12px" color="#252A2F">Flat Rate</Text>
                                    <Text fontSize="11px" color="#756B66" mt="1">Charge a single fixed rate for all orders.</Text>
                                </Radio>
                            </Box>
                        </Stack>
                    </RadioGroup>
                </Box>
            </Box>
        </Box>
    );
};

export default InventoryShipping;