import { Sparkles } from 'lucide-react';
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    Textarea,
} from '@chakra-ui/react';

const BasicInformation = ({
    values,
    onChange,
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
                Basic Information
            </Text>

            <Text
                mt="6px"
                fontSize="14px"
                lineHeight="1.5"
                color="#756B66"
            >
                Provide the core details for your product.
            </Text>

            
            <FormControl mt={{ base: 5, md: 6 }}>
                <FormLabel
                    mb="7px"
                    fontSize="12px"
                    fontWeight="500"
                    color="#252A2F"
                >
                    Product Name
                </FormLabel>

                <Input
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    placeholder="e.g. Advanced Figma Masterclass"
                    h="44px"
                    px="12px"
                    borderRadius="8px"
                    borderColor="#DCE4ED"
                    bg="#F8FAFC"
                    fontSize="13px"
                    color="#252A2F"
                    _placeholder={{
                        color: "#A6AEB8",
                    }}
                    _hover={{
                        borderColor: "#CBD5E1",
                    }}
                    _focus={{
                        borderColor: "#FF7A2F",
                        boxShadow: "0 0 0 1px #FF7A2F",
                    }}
                />
            </FormControl>

            
            <FormControl mt={{ base: 5, md: 6 }}>
                <Flex
                    align={{ base: 'flex-start', sm: 'center' }}
                    justify="space-between"
                    gap={3}
                    mb="7px"
                >
                    <FormLabel
                        mb="0"
                        fontSize="12px"
                        fontWeight="500"
                        color="#252A2F"
                    >
                        Description
                    </FormLabel>

                    <Flex
                        as="button"
                        type="button"
                        align="center"
                        gap="4px"
                        flexShrink={0}
                        color="#B65A17"
                        fontSize="10px"
                        fontWeight="600"
                        cursor="pointer"
                        _hover={{
                            color: "#8F4512",
                        }}
                    >
                        <Sparkles
                            size={14}
                            strokeWidth={2}
                        />

                        <Text>
                            Generate with AI
                        </Text>
                    </Flex>
                </Flex>

                <Textarea
                    name="description"
                    value={values.description}
                    onChange={onChange}
                    placeholder="Describe what customers will get..."
                    minH="88px"
                    resize="vertical"
                    px="12px"
                    py="12px"
                    borderRadius="8px"
                    borderColor="#DCE4ED"
                    bg="#F8FAFC"
                    fontSize="13px"
                    lineHeight="1.5"
                    color="#252A2F"
                    _placeholder={{
                        color: "#A6AEB8",
                    }}
                    _hover={{
                        borderColor: "#CBD5E1",
                    }}
                    _focus={{
                        borderColor: "#FF7A2F",
                        boxShadow: "0 0 0 1px #FF7A2F",
                    }}
                />
            </FormControl>

            <FormControl
                mt={{ base: 5, md: 6 }}
                maxW={{
                    base: '100%',
                    md: '50%',
                }}
            >
                <FormLabel
                    mb="7px"
                    fontSize="12px"
                    fontWeight="500"
                    color="#252A2F"
                >
                    Price
                </FormLabel>

                <Flex
                    position="relative"
                    align="center"
                >
                    <Text
                        position="absolute"
                        left="12px"
                        zIndex={1}
                        fontSize="13px"
                        color="#756B66"
                        pointerEvents="none"
                    >
                        &#8358;
                    </Text>

                    <Input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={values.price}
                        onChange={onChange}
                        placeholder="0.00"
                        h="44px"
                        pl="28px"
                        pr="12px"
                        borderRadius="8px"
                        borderColor="#DCE4ED"
                        bg="#F8FAFC"
                        fontSize="13px"
                        color="#252A2F"
                        _placeholder={{
                            color: "#A6AEB8",
                        }}
                        _hover={{
                            borderColor: "#CBD5E1",
                        }}
                        _focus={{
                            borderColor: "#FF7A2F",
                            boxShadow: "0 0 0 1px #FF7A2F",
                        }}
                    />
                </Flex>
            </FormControl>
        </Box>
    );
};

export default BasicInformation;