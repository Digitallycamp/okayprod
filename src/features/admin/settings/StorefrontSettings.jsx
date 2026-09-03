import { useState, useRef } from 'react';
import { Box, VStack, HStack, Text, Heading, Button, Switch, Textarea, Flex, Stack, Icon, useToast, Input,} from '@chakra-ui/react';
import { Upload, ChevronRight } from 'lucide-react';
import PageHeader from '../dashboard/components/pageHeader';

const INITIAL_STATE = {
  brandColor: '#F48031', isAnnouncementActive: true,
  announcementText: '🎉 Huge Summer Sale! Get 20% off all digital courses using code SUMMER20 at checkout.', 
  logoFile: null, logoPreview: null,
};
const formatHex = (hex) => {
  if (!hex) return '#F48031';
  return hex.toUpperCase();
};

export default function StorefrontSettings() {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [brandColor, setBrandColor] = useState(INITIAL_STATE.brandColor);
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(INITIAL_STATE.isAnnouncementActive);
  const [announcementText, setAnnouncementText] = useState(INITIAL_STATE.announcementText);
  const [logoFile, setLogoFile] = useState(INITIAL_STATE.logoFile);
  const [logoPreview, setLogoPreview] = useState(INITIAL_STATE.logoPreview);
  const [savedState, setSavedState] = useState({ ...INITIAL_STATE });
  const maxLength = 150;
  const charCount = announcementText.length;
  const isOverLimit = charCount > maxLength;
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload SVG, PNG, or JPG images only.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ 
        title: 'File too large', description: 'Maximum file size is 2MB.', 
        status: 'error', duration: 3000, isClosable: true,
      });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
      setLogoFile(file);
    };
    reader.readAsDataURL(file);
  };
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  const handleColorChange = (e) => {
    let value = e.target.value;
    if (value.startsWith('#')) {
      setBrandColor(value);
    }
  };
  const handleDiscard = () => {
    setBrandColor(savedState.brandColor);
    setIsAnnouncementActive(savedState.isAnnouncementActive);
    setAnnouncementText(savedState.announcementText);
    setLogoFile(savedState.logoFile);
    setLogoPreview(savedState.logoPreview);
    toast({
      title: 'Changes discarded',description: 'All changes have been reverted.', 
      status: 'info', duration: 2000, isClosable: true,
    });
  };

  const handleSave = () => {
    if (charCount > maxLength) {
      toast({ 
        title: 'Character limit exceeded', description: `Announcement text must be ${maxLength} characters or less.`,
         status: 'error', duration: 3000, isClosable: true,
      });
      return;
    }
    setSavedState({ brandColor, isAnnouncementActive, announcementText, logoFile, logoPreview,});

    toast({ 
      title: 'Changes saved', description: 'Your storefront settings have been updated.', 
      status: 'success', duration: 3000, isClosable: true,
    });
  };
  const hasChanges = () => {
    return (
      brandColor !== savedState.brandColor ||
      isAnnouncementActive !== savedState.isAnnouncementActive ||
      announcementText !== savedState.announcementText ||
      logoFile !== savedState.logoFile ||
      logoPreview !== savedState.logoPreview
    );
  };

  return (
    <Box w="full">
      <VStack align="stretch" spacing={1} mb={8}>
        <PageHeader
                title="Storefront Settings"
                description="Manage your store's appearance, domain, and search engine presence." mb="0"
              />
      </VStack>
      <Box bg="white" borderRadius="xl" px={6} py={4} mb={6} boxShadow="sm" border="1px solid" borderColor="gray.100">
        <Text fontWeight="bold" fontSize="md" color="gray.700">
          General Information
        </Text>
      </Box>
      <Box bg="white" borderRadius="xl" p={6} mb={6} boxShadow="sm" border="1px solid" borderColor="gray.100">
        <VStack align="stretch" spacing={6}>
          <Box>
            <Text fontWeight="bold" fontSize="md" color="gray.800">
              Branding
            </Text>
            <Text fontSize="sm" color="gray.500">
              Customize the visual identity of your storefront.
            </Text>
          </Box>

          <Stack  direction={{ base: 'column', md: 'row' }}  spacing={{ base: 6, md: 8 }}>
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="500" color="gray.700" mb={3}>
                Store Logo
              </Text>
              <Box  border="2px dashed"  borderColor="#D4A373"  borderRadius="lg"  bg="white"  p={8}  textAlign="center"  cursor="pointer"  onClick={triggerFileUpload}  transition="all 0.2s"  _hover={{    bg: 'gray.50',    borderColor: '#A94F00',  }}>
                <Input  ref={fileInputRef}  type="file"  accept=".svg,.png,.jpg,.jpeg"  onChange={handleLogoUpload}  display="none"/>

                {logoPreview ? (
                  <Box>
                    <img  src={logoPreview}  alt="Store logo preview"  style={{    maxWidth: '120px',    maxHeight: '120px',    margin: '0 auto',    borderRadius: '8px',  }}/>
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      Click to change
                    </Text>
                  </Box>
                ) : (
                  <>
                    <Box  w={16}  h={16}  mx="auto"  mb={3}  borderRadius="full"  bg="#FFF5F0"  display="flex"  alignItems="center"  justifyContent="center">
                      <Icon as={Upload} color="#A94F00" boxSize={6} />
                    </Box>
                    <Text  fontSize="sm"  fontWeight="500"  color="#A94F00"  mb={1}>
                      Click to upload
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      SVG, PNG, JPG (max 2MB)
                    </Text>
                  </>
                )}
              </Box>
            </Box>
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="500" color="gray.700" mb={3}>
                Primary Brand Color
              </Text>
              <Box  bg="#F7F9FC"  borderRadius="lg"  p={4}  border="1px solid"  borderColor="gray.100">
                <Flex align="center" gap={3}>
                  <Box  w={10}  h={10}  borderRadius="md"  bg={brandColor}  border="2px solid"  borderColor="white"  boxShadow="sm"  flexShrink={0}/>
                  <Text fontSize="sm" fontWeight="500" color="gray.700">
                    {formatHex(brandColor)}
                  </Text>
                </Flex>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Used for buttons and accents
                </Text>
              </Box>
              <Box mt={4}>
                <Input  type="color"  value={brandColor}  onChange={handleColorChange}  width="full"  height="40px"  padding="0"  border="none"  borderRadius="lg"  cursor="pointer"  _hover={{ transform: 'scale(1.02)' }}  transition="transform 0.15s ease"  sx={{    '&::-webkit-color-swatch-wrapper': {      padding: 0,    },    '&::-webkit-color-swatch': {      border: '2px solid',      borderColor: 'gray.200',      borderRadius: 'lg',    },  }}/>
                <Flex justify="space-between" mt={2}>
                  <Text fontSize="xs" color="gray.400">
                    #000000
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    #FFFFFF
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Stack>
        </VStack>
      </Box>
      <Box  bg="white"  borderRadius="xl"  p={6}  mb={8}  boxShadow="sm"  border="1px solid"  borderColor="gray.100">
        <VStack align="stretch" spacing={6}>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="bold" fontSize="md" color="gray.800">
                Announcement Bar
              </Text>
              <Text fontSize="sm" color="gray.500">
                Display a global message at the top of your store.
              </Text>
            </Box>
            <Switch  size="lg"  isChecked={isAnnouncementActive}  onChange={(e) => setIsAnnouncementActive(e.target.checked)}  colorScheme="orange"  sx={{    '& .chakra-switch__track': {      bg: isAnnouncementActive ? '#A94F00' : 'gray.300',    },    '& .chakra-switch__thumb': {      bg: 'white',    },  }}/>
          </Flex>
          <Box>
            <Text fontSize="sm" fontWeight="500" color="gray.700" mb={2}>
              Message Content
            </Text>
            <Textarea  value={announcementText}  onChange={(e) => setAnnouncementText(e.target.value)}  placeholder="Write your announcement message..."  bg="#F7F9FC"  border="1px solid"  borderColor="gray.200"  borderRadius="lg"  minH="100px"  maxLength={maxLength}  fontSize="sm"  color="gray.700"  _focus={{    borderColor: '#A94F00',    boxShadow: '0 0 0 1px #A94F00',    bg: 'white',  }}  isInvalid={isOverLimit}/>
          </Box>
          <Flex justify="space-between" align="center">
            <Text fontSize="xs" color="gray.500">
              Supports basic emojis.
            </Text>
            <Text  fontSize="xs"  fontWeight="500"  color={isOverLimit ? 'red.500' : 'gray.500'}>
              {charCount} / {maxLength}
            </Text>
          </Flex>
          <Box mt={2}>
            <Text fontSize="xs" fontWeight="500" color="gray.500" mb={2}>
              Live Preview
            </Text>
            <Box  borderRadius="lg"  overflow="hidden"  border="1px solid"  borderColor="gray.100">
              {isAnnouncementActive && announcementText.trim() && (
                <Box  bg={brandColor}  color="white"  px={4}  py={3}  textAlign="center">
                  <Text fontSize="sm" fontWeight="500">
                    {announcementText}
                  </Text>
                </Box>
              )}
              <Box bg="#F7F9FC" p={4} minH="60px">
                <Text fontSize="xs" color="gray.400" textAlign="center">
                  {!isAnnouncementActive || !announcementText.trim()
                    ? 'No announcement active'
                    : 'Storefront content preview'}
                </Text>
              </Box>
            </Box>
          </Box>
        </VStack>
      </Box>
      <Flex justify="flex-end" gap={3} mt={6}>
        <Button  variant="ghost"  color="gray.500"  fontWeight="500" 
         _hover={{ bg: 'gray.50', color: 'gray.700' }}  
         onClick={handleDiscard}  isDisabled={!hasChanges()}>
          Discard Changes
        </Button>
        <Button  bg="#A94F00"  color="white"  px={8}  fontWeight="500"  _hover={{ bg: '#8F3F00' }}  _active={{ bg: '#7A3500' }}  onClick={handleSave}  isDisabled={!hasChanges() || isOverLimit}>
          Save Changes
        </Button>
      </Flex>
    </Box>
  );
}