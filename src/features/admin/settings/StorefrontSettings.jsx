import { useState, useRef, useEffect } from 'react';
import { Box, VStack, HStack, Text, Heading, Button, Switch, Textarea, Flex, Stack, Icon, Input, Spinner, Center,} from '@chakra-ui/react';
import { Upload } from 'lucide-react';
import PageHeader from '../dashboard/components/pageHeader';
import useNotify from '../../../hooks/useNotify';
import { useGetStorefrontQuery, useUpdateStorefrontMutation, useUploadLogoMutation, } from './store/storeFrontApi';
import HueSlider from './HueSlider';
import { initialState } from '../../../utils/storeFrontInitial';
const formatHex = (hex) => { if (!hex) return '#F48031'; return hex.toUpperCase();};
export default function StorefrontSettings() {
  const notify = useNotify();
  const fileInputRef = useRef(null);
  const { data: storefrontRes, isLoading } = useGetStorefrontQuery();
  const [updateStorefront, { isLoading: isSaving }] = useUpdateStorefrontMutation();
	useUpdateStorefrontMutation();
  const [uploadLogo, { isLoading: isUploadingLogo }] = useUploadLogoMutation();
  const [brandColor, setBrandColor] = useState(initialState.brandColor);
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(initialState.isAnnouncementActive);
  const [announcementText, setAnnouncementText] = useState(initialState.announcementText);
  const [logoFile, setLogoFile] = useState(initialState.logoFile);
  const [logoPreview, setLogoPreview] = useState(initialState.logoPreview);
  const [savedState, setSavedState] = useState({ ...initialState });
  const maxLength = 150;
  const charCount = announcementText.length;
  const isOverLimit = charCount > maxLength;
  useEffect(() => {
    const data = storefrontRes?.data;
    if (!data) return;
    const serverState = {
      brandColor: data.primaryBrandColor ?? initialState.brandColor,
      isAnnouncementActive: data.announcementBar ?? initialState.isAnnouncementActive,
      announcementText: data.messageContent ?? initialState.announcementText,
      logoFile: null,
      logoPreview: data.logo ?? null,
    };

    setBrandColor(serverState.brandColor);
    setIsAnnouncementActive(serverState.isAnnouncementActive);
    setAnnouncementText(serverState.announcementText);
    setLogoFile(serverState.logoFile);
    setLogoPreview(serverState.logoPreview);
    setSavedState(serverState);
  }, [storefrontRes]);

  const handleLogoUpload = async (e) => {
	const file = e.target.files?.[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onloadend = () => setLogoPreview(reader.result);
	reader.readAsDataURL(file);
	const formData = new FormData();
	formData.append('logo', file);

	try {
		const res = await uploadLogo(formData).unwrap();
		notify.success(
			'Logo uploaded',
			res?.message || 'Your logo has been saved.'
		);
		if (res?.data?.logo) {
			setLogoPreview(res.data.logo);
		}
		setLogoFile(file);
	} catch (err) {
		notify.error(
			'Upload failed',
			err?.data?.message || 'Could not upload logo.'
		);
		setLogoPreview(savedState.logoPreview);
	}
};
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  const handleDiscard = () => {
    setBrandColor(savedState.brandColor);
    setIsAnnouncementActive(savedState.isAnnouncementActive);
    setAnnouncementText(savedState.announcementText);
    setLogoFile(savedState.logoFile);
    setLogoPreview(savedState.logoPreview);

    notify.info('Changes discarded', 'All changes have been reverted.');
  };

  const handleSave = async () => {
    if (charCount > maxLength) {
      notify.error(
        'Character limit exceeded',
        `Announcement text must be ${maxLength} characters or less.`
      );
      return;
    }

    try {
      const res = await updateStorefront({
        primaryBrandColor: brandColor,
        announcementBar: isAnnouncementActive,
        messageContent: announcementText,
      }).unwrap();

      notify.success(
        'Changes saved',
        res?.message || 'Your storefront settings have been updated.'
      );
    } catch (err) {
      notify.error(
        'Error',
        err?.data?.message || 'Failed to save storefront settings.'
      );
    }
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
  if (isLoading) {
    return (
      <Center minH="300px">
        <Spinner color="#A94F00" size="lg" />
      </Center>
    );
  }

  return (
    <Box w="full">
      <VStack align="stretch" spacing={1} mb={8}>
        <PageHeader
          title="Storefront Settings"
          description="Manage your store's appearance, domain, and search engine presence."
          mb="0"
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

          <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 6, md: 8 }}>
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="500" color="gray.700" mb={3}>
                Store Logo
              </Text>
              <Box border="2px dashed" borderColor="#D4A373" borderRadius="lg" bg="white" p={8} textAlign="center" cursor="pointer" onClick={triggerFileUpload} transition="all 0.2s" _hover={{ bg: 'gray.50', borderColor: '#A94F00' }}>
                <Input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg" onChange={handleLogoUpload} display="none" />

                {logoPreview ? (
                  <Box>
                    <img src={logoPreview} alt="Store logo preview" style={{ maxWidth: '120px', maxHeight: '120px', margin: '0 auto', borderRadius: '8px' }} />
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      Click to change
                    </Text>
                  </Box>
                ) : (
                  <>
                    <Box w={16} h={16} mx="auto" mb={3} borderRadius="full" bg="#FFF5F0" display="flex" alignItems="center" justifyContent="center">
                      <Icon as={Upload} color="#A94F00" boxSize={6} />
                    </Box>
                    <Text fontSize="sm" fontWeight="500" color="#A94F00" mb={1}>
                      Click to upload
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      JPEG, PNG, JPG (max 2MB)
                    </Text>
                  </>
                )}
              </Box>
            </Box>

            <Box flex={1}>
              <Text fontSize="sm" fontWeight="500" color="gray.700" mb={3}>
                Primary Brand Color
              </Text>
              <Box bg="#F7F9FC" borderRadius="lg" p={4} border="1px solid" borderColor="gray.100">
                <Flex align="center" gap={3}>
                  <Box w={10} h={10} borderRadius="md" bg={brandColor} border="2px solid" borderColor="white" boxShadow="sm" flexShrink={0} />
                  <Text fontSize="sm" fontWeight="500" color="gray.700">
                    {formatHex(brandColor)}
                  </Text>
                </Flex>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Used for buttons and accents
                </Text>
              </Box>

              <Box mt={4}>
                <HueSlider value={brandColor} onChange={setBrandColor} />
              </Box>
            </Box>
          </Stack>
        </VStack>
      </Box>

      <Box bg="white" borderRadius="xl" p={6} mb={8} boxShadow="sm" border="1px solid" borderColor="gray.100">
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
            <Switch  size="lg"  isChecked={isAnnouncementActive}  onChange={(e) => setIsAnnouncementActive(e.target.checked)}
              colorScheme="orange"
              sx={{
                '& .chakra-switch__track': {
                  bg: isAnnouncementActive ? '#A94F00' : 'gray.300',
                },
                '& .chakra-switch__thumb': { bg: 'white' },
              }} />
          </Flex>

          <Box>
            <Text fontSize="sm" fontWeight="500" color="gray.700" mb={2}>
              Message Content
            </Text>
            <Textarea  value={announcementText}  onChange={(e) => setAnnouncementText(e.target.value)}  placeholder="Write your announcement message..." 
             bg="#F7F9FC"  border="1px solid"  borderColor="gray.200"  borderRadius="lg"  minH="100px"  maxLength={maxLength}
             fontSize="sm" color="gray.700" isInvalid={isOverLimit}
             _focus={{ borderColor: '#A94F00', boxShadow: '0 0 0 1px #A94F00', bg: 'white',}}  />
          </Box>

          <Flex justify="space-between" align="center">
            <Text fontSize="xs" color="gray.500">
              Supports basic emojis.
            </Text>
            <Text  fontSize="xs"  fontWeight="500"  color={isOverLimit ? 'red.500' : 'gray.500'} >
              {charCount} / {maxLength}
            </Text>
          </Flex>

          <Box mt={2}>
            <Text fontSize="xs" fontWeight="500" color="gray.500" mb={2}>
              Live Preview
            </Text>
            <Box borderRadius="lg" overflow="hidden" border="1px solid" borderColor="gray.100">
              {isAnnouncementActive && announcementText.trim() && (
                <Box bg={brandColor} color="white" px={4} py={3} textAlign="center">
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
        <Button  variant="ghost"  color="gray.500"  fontWeight="500"  _hover={{ bg: 'gray.50', color: 'gray.700' }}  onClick={handleDiscard}  isDisabled={!hasChanges() || isSaving}>
          Discard Changes
        </Button>
        <Button  bg="#A94F00"  color="white"  px={8}  fontWeight="500"  _hover={{ bg: '#8F3F00' }}  _active={{ bg: '#7A3500' }}  onClick={handleSave}  isLoading={isSaving}  isDisabled={!hasChanges() || isOverLimit}>
          Save Changes
        </Button>
      </Flex>
    </Box>
  );
}