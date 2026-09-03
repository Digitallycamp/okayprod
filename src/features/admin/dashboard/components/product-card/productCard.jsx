import { Box, Flex, Text, Badge, HStack, Avatar, Icon, Progress } from '@chakra-ui/react';
import { 
  Package, 
  Download, 
  CloudDownload, 
  Calendar, 
  Users, 
  TrendingUp, 
  ShoppingCart,
  Circle
} from 'lucide-react';

const ProductCard = ({ product }) => {
  const { 
    title, 
    price, 
    type, 
    status, 
    statusColor, 
    description, 
    image, 
    footer 
  } = product;

  // Map type to icon
  const getTypeIcon = () => {
    switch (type) {
      case 'digital':
        return CloudDownload;
      case 'physical':
        return Package;
      case 'service':
        return Calendar;
      default:
        return Package;
    }
  };

  // Map footer icon
  const getFooterIcon = (iconName) => {
    const iconMap = {
      Package,
      Download,
      CloudDownload,
      Calendar,
      Users,
      TrendingUp,
      ShoppingCart
    };
    return iconMap[iconName] || Package;
  };

  const TypeIcon = getTypeIcon();
  const statusDot = statusColor === 'green' ? 'green.500' : statusColor === 'red' ? 'red.500' : 'gray.400';
  const isDraft = status === 'Draft';

  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="#E5EBF2"
      transition="all 0.2s"
      _hover={{
        shadow: 'md',
        transform: 'translateY(-2px)'
      }}
      display="flex"
      flexDirection="column"
      h="100%"
    >
      {/* Image Area */}
      <Box position="relative" h="192px" bg="#F7FAFE" overflow="hidden">
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Status Badge - Top Left */}
        <Badge
          position="absolute"
          top={3}
          left={3}
          bg="white"
          color="#061A1C"
          px={3}
          py={1.5}
          borderRadius="full"
          fontWeight="500"
          fontSize="xs"
          display="flex"
          alignItems="center"
          gap={1.5}
          boxShadow="sm"
        >
          <Box
            as="span"
            w="6px"
            h="6px"
            borderRadius="full"
            bg={statusDot}
            display="inline-block"
          />
          {status}
        </Badge>

        {/* Type Badge - Top Right */}
        <Badge
          position="absolute"
          top={3}
          right={3}
          bg="white"
          color="#061A1C"
          px={3}
          py={1.5}
          borderRadius="full"
          fontWeight="500"
          fontSize="xs"
          display="flex"
          alignItems="center"
          gap={1.5}
          boxShadow="sm"
          textTransform="uppercase"
        >
          <TypeIcon size={12} />
          {type}
        </Badge>
      </Box>

      {/* Content Area */}
      <Box p={4} flex="1" display="flex" flexDirection="column">
        {/* Title & Price */}
        <Flex justify="space-between" align="flex-start" gap={2} mb={2}>
          <Text
            fontWeight="600"
            fontSize="md"
            color="#061A1C"
            lineHeight="1.3"
            noOfLines={2}
          >
            {title}
          </Text>
          <Text
            fontWeight="600"
            fontSize="md"
            color="#061A1C"
            whiteSpace="nowrap"
          >
            {price}
          </Text>
        </Flex>

        {/* Description */}
        <Text
          fontSize="sm"
          color="#564238"
          noOfLines={2}
          flex="1"
          mb={3}
          lineHeight="1.5"
        >
          {description}
        </Text>

        {/* Divider */}
        <Box borderTop="1px solid" borderColor="#E5EBF2" my={3} />

        {/* Footer */}
        <Box>
          {footer.progress !== undefined ? (
            // Progress bar for draft products
            <Flex align="center" gap={3}>
              <Box flex="1">
                <Progress
                  value={footer.progress}
                  size="sm"
                  borderRadius="full"
                  bg="#EBEEF2"
                  sx={{
                    '& > div': {
                      bg: '#9A4600',
                      borderRadius: 'full',
                    }
                  }}
                />
              </Box>
              <Text
                fontSize="xs"
                fontWeight="500"
                color="#9A4600"
                whiteSpace="nowrap"
              >
                {footer.progress}% {footer.label}
              </Text>
            </Flex>
          ) : footer.avatars ? (
            // Avatars for service products
            <Flex justify="space-between" align="center">
              <HStack spacing={1}>
                <Icon as={Calendar} size={14} color="#564238" />
                <Text fontSize="sm" color="#564238">
                  {footer.label}
                </Text>
              </HStack>
              <HStack spacing={-1}>
                {footer.avatars.map((color, index) => (
                  <Avatar
                    key={index}
                    size="xs"
                    bg={color}
                    border="2px solid white"
                    boxSize="24px"
                  />
                ))}
              </HStack>
            </Flex>
          ) : (
            // Physical/Digital products with metrics
            <Flex justify="space-between" align="center">
              <HStack spacing={1}>
                <Icon as={getFooterIcon(footer.icon)} size={14} color="#564238" />
                <Text fontSize="sm" color="#564238">
                  {footer.label}
                </Text>
              </HStack>
              <Text
                fontSize="sm"
                fontWeight="500"
                color={footer.trend === 'RESTOCK' ? '#9A4600' : '#061A1C'}
              >
                {footer.trend}
              </Text>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;