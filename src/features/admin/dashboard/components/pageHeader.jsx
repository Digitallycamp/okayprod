import { Box, Flex, Heading, Text, Button, HStack } from '@chakra-ui/react';
const PageHeader = ({
title, description, 
secondaryButtonText, secondaryButtonIcon,
onSecondaryClick, primaryButtonText, 
primaryButtonIcon, onPrimaryClick, mb }) => {
  return (
    <Flex  justifyContent="space-between"  alignItems={{ base: 'flex-start', md: 'center' }}  direction={{ base: 'column', md: 'row' }}  gap={4}  mb={mb}>
      <Box>
        <Heading  as="h1"  fontSize={{ base: '3xl', md: '5xl' }}  fontWeight="bold"  color="#061A1C"  letterSpacing="-1px">
          {title}
        </Heading>
        {description && (
          <Text  fontSize={{ base: 'sm', md: 'md' }}  color="#564238"  mt={1}  maxW="2xl"  lineHeight="1.6">
            {description}
          </Text>
        )}
      </Box>
      {secondaryButtonText &&(
      <HStack spacing={3} flexShrink={0} w={{ base: 'full', md: 'auto' }}>
        {secondaryButtonText && (
          <Button  variant="outline"  leftIcon={secondaryButtonIcon}  onClick={onSecondaryClick}  borderColor="#E5EBF2"  color="#564238"
            _hover={{
              bg: '#F7FAFE',
              borderColor: '#D1D9E6'
            }}  
            h="44px"  px={6}  borderRadius="lg"  fontWeight="500"  w={{ base: 'full', sm: 'auto' }}
          >
            {secondaryButtonText}
          </Button>
        )}
        {primaryButtonText && (
          <Button  leftIcon={primaryButtonIcon}  onClick={onPrimaryClick}  bg="#9A4600"  color="white"
            _hover={{
              bg: '#7A3600'
            }}
            _active={{
              bg: '#6A2E00'
            }}  h="44px"  px={6}  borderRadius="lg"  fontWeight="500"  w={{ base: 'full', sm: 'auto' }}
          >
            {primaryButtonText}
          </Button>
        )}
      </HStack>
      )}
    </Flex>
  );
};

export default PageHeader;