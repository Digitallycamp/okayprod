import { useState, useEffect, useRef } from 'react';
import {
	Box,
	Flex,
	Stack,
	HStack,
	Text,
	Heading,
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	Textarea,
	Avatar,
	Icon,
	Spinner,
	Center,
} from '@chakra-ui/react';
import { Mail, ArrowRight } from 'lucide-react';
import useNotify from '../../../hooks/useNotify';
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useUploadAvatarMutation,
} from './store/profileApi';

// Fallback shown only until the API resolves (or if it 404s).
const FALLBACK_VALUES = {
	firstName: '',
	lastName: '',
	email: '',
	website: '',
	bio: '',
};

// Default placeholder avatar (frontend-only preview until Cloudinary task)
const DEFAULT_AVATAR =
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces';

export default function ProfileDetails() {
	const notify = useNotify();
	const fileInputRef = useRef(null);

	// Server data + mutation
	const { data: profileRes, isLoading } = useGetProfileQuery();
	const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
	const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();

	// Local editable state
	const [values, setValues] = useState(FALLBACK_VALUES);
	const [savedValues, setSavedValues] = useState(FALLBACK_VALUES);
	const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);

	const bioLimit = 160;
	const bioCount = values.bio.length;

	// Sync server → local once it arrives
	useEffect(() => {
		const data = profileRes?.data;
		if (!data) return;

		const serverState = {
			firstName: data.firstName ?? '',
			lastName: data.lastName ?? '',
			email: data.email ?? '',
			website: data.website ?? '',
			bio: data.bio ?? '',
			avatar: data.avatar ?? null,
		};

		setValues(serverState);
		setSavedValues(serverState);

		// If DB already has a logo/avatar URL, use it
		if (data.avatar) setAvatarPreview(data.avatar);
	}, [profileRes]);

	const handleChange = (field) => (e) => {
		setValues((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const triggerFileUpload = () => {
		fileInputRef.current?.click();
	};

	// Frontend-only preview. Cloudinary upload will be a future task.
	const handleAvatarUpload = async (e) => {
	const file = e.target.files?.[0];
	if (!file) return;

	// Instant local preview
	const reader = new FileReader();
	reader.onloadend = () => setAvatarPreview(reader.result);
	reader.readAsDataURL(file);

	// Upload to backend
	const formData = new FormData();
	formData.append('avatar', file);

	try {
		const res = await uploadAvatar(formData).unwrap();
		notify.success(
			'Avatar uploaded',
			res?.message || 'Your avatar has been saved.'
		);
		if (res?.data?.avatar) {
			setAvatarPreview(res.data.avatar);
		}
	} catch (err) {
		notify.error(
			'Upload failed',
			err?.data?.message || 'Could not upload avatar.'
		);
		// Revert preview to last saved value
		setAvatarPreview(savedValues.avatar || DEFAULT_AVATAR);
	}
};

	const handleRemove = () => {
		setAvatarPreview(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await updateProfile({
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				website: values.website,
				bio: values.bio,
			}).unwrap();

			notify.success(
				'Profile saved',
				res?.message || 'Your profile has been updated.'
			);
		} catch (err) {
			notify.error(
				'Error',
				err?.data?.message || 'Failed to save profile.'
			);
		}
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
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
				onChange={handleAvatarUpload}
			/>

			{/* ---------- CARD 1: Avatar & Identity ---------- */}
			<Box
				bg="white"
				borderRadius="16px"
				border="1px solid"
				borderColor="#E5EBF2"
				boxShadow="sm"
				p={{ base: 5, md: 6 }}
				mb={6}
			>
				<Flex
					direction={{ base: 'column', sm: 'row' }}
					gap={{ base: 5, md: 6 }}
					align={{ base: 'flex-start', sm: 'center' }}
				>
					<Avatar
						size="2xl"
						name={`${values.firstName} ${values.lastName}`}
						src={avatarPreview || undefined}
						w="96px"
						h="96px"
						bg="#E5EBF2"
						flexShrink={0}
					/>

					<Box flex={1}>
						<Heading
							as="h2"
							fontSize="24px"
							fontWeight="700"
							color="#092225"
							mb={2}
						>
							Avatar &amp; Identity
						</Heading>
						<Text
							fontSize="16px"
							color="#67564E"
							lineHeight="1.5"
							maxW="560px"
							mb={4}
						>
							Upload a high-resolution image to represent your storefront.
							Recommended size: 800×800px.
						</Text>

						<HStack spacing={5} flexWrap="wrap">
							<Button
								type="button"
								onClick={triggerFileUpload}
								bg="#A94F00"
								color="white"
								h="38px"
								minW="126px"
								px={5}
								fontSize="14px"
								fontWeight="500"
								borderRadius="10px"
								_hover={{ bg: '#8F3F00' }}
								_active={{ bg: '#7A3500' }}
							>
								Upload Image
							</Button>
							<Button
								type="button"
								variant="ghost"
								onClick={handleRemove}
								color="#092225"
								fontSize="14px"
								fontWeight="500"
								h="38px"
								px={3}
								_hover={{ bg: 'transparent', textDecoration: 'underline' }}
								_active={{ bg: 'transparent' }}
							>
								Remove
							</Button>
						</HStack>
					</Box>
				</Flex>
			</Box>

			{/* ---------- CARD 2: Profile Form ---------- */}
			<Box
				bg="white"
				borderRadius="16px"
				border="1px solid"
				borderColor="#E5EBF2"
				boxShadow="sm"
				p={{ base: 5, md: 6 }}
			>
				<form onSubmit={handleSubmit}>
					<Stack spacing={6}>
						<Stack
							direction={{ base: 'column', md: 'row' }}
							spacing={{ base: 5, md: 6 }}
						>
							<FormField label="FIRST NAME">
								<Input
									value={values.firstName}
									onChange={handleChange('firstName')}
									placeholder="First name"
									h="48px"
									bg="white"
									border="1px solid"
									borderColor="#D9E3ED"
									borderRadius="12px"
									fontSize="16px"
									color="#092225"
									px={4}
									_focus={{
										borderColor: '#A94F00',
										boxShadow: '0 0 0 1px #A94F00',
									}}
								/>
							</FormField>

							<FormField label="LAST NAME">
								<Input
									value={values.lastName}
									onChange={handleChange('lastName')}
									placeholder="Last name"
									h="48px"
									bg="white"
									border="1px solid"
									borderColor="#D9E3ED"
									borderRadius="12px"
									fontSize="16px"
									color="#092225"
									px={4}
									_focus={{
										borderColor: '#A94F00',
										boxShadow: '0 0 0 1px #A94F00',
									}}
								/>
							</FormField>
						</Stack>

						<FormField label="CONTACT EMAIL">
							<InputGroup>
								<InputLeftElement h="48px" pointerEvents="none" pl={4}>
									<Icon as={Mail} boxSize={5} color="#67564E" />
								</InputLeftElement>
								<Input
									type="email"
									value={values.email}
									onChange={handleChange('email')}
									placeholder="you@example.com"
									h="48px"
									bg="white"
									border="1px solid"
									borderColor="#D9E3ED"
									borderRadius="12px"
									fontSize="16px"
									color="#092225"
									pl="44px"
									pr={4}
									_focus={{
										borderColor: '#A94F00',
										boxShadow: '0 0 0 1px #A94F00',
									}}
								/>
							</InputGroup>
						</FormField>

						<FormField label="PERSONAL WEBSITE / LINK">
							<Flex
								border="1px solid"
								borderColor="#D9E3ED"
								borderRadius="12px"
								h="48px"
								overflow="hidden"
								bg="white"
								_focusWithin={{
									borderColor: '#A94F00',
									boxShadow: '0 0 0 1px #A94F00',
								}}
							>
								<Flex
									align="center"
									justify="center"
									px={4}
									bg="#F1F4F8"
									color="#67564E"
									fontSize="16px"
									borderRight="1px solid"
									borderColor="#D9E3ED"
									flexShrink={0}
								>
									https://
								</Flex>
								<Input
									value={values.website}
									onChange={handleChange('website')}
									placeholder="yourdomain.com"
									h="100%"
									border="none"
									borderRadius="0"
									fontSize="16px"
									color="#092225"
									px={4}
									_focus={{ boxShadow: 'none' }}
								/>
							</Flex>
						</FormField>

						<Box>
							<Flex justify="space-between" align="center" mb={2}>
								<Text
									fontSize="12px"
									fontWeight="600"
									color="#67564E"
									letterSpacing="0.04em"
								>
									SHORT BIO
								</Text>
								<Text fontSize="12px" fontWeight="600" color="#67564E">
									{bioCount} / {bioLimit}
								</Text>
							</Flex>
							<Textarea
								value={values.bio}
								onChange={handleChange('bio')}
								maxLength={bioLimit}
								minH="120px"
								bg="white"
								border="1px solid"
								borderColor="#D9E3ED"
								borderRadius="12px"
								fontSize="16px"
								color="#092225"
								p={4}
								resize="none"
								_focus={{
									borderColor: '#A94F00',
									boxShadow: '0 0 0 1px #A94F00',
								}}
							/>
							<Text
								fontSize="12px"
								fontWeight="600"
								color="#67564E"
								mt={2}
							>
								This will appear on your public storefront and digital
								receipts.
							</Text>
						</Box>

						<Flex justify="flex-end" pt={2}>
							<Button
								type="submit"
								rightIcon={<Icon as={ArrowRight} boxSize={4} />}
								bg="#A94F00"
								color="white"
								h="44px"
								minW="181px"
								px={6}
								fontSize="15px"
								fontWeight="600"
								borderRadius="12px"
								_hover={{ bg: '#8F3F00' }}
								_active={{ bg: '#7A3500' }}
								isLoading={isSaving}
								isDisabled={isSaving}
							>
								Save Changes
							</Button>
						</Flex>
					</Stack>
				</form>
			</Box>
		</Box>
	);
}

function FormField({ label, children }) {
	return (
		<Box flex={1}>
			<Text
				fontSize="12px"
				fontWeight="600"
				color="#67564E"
				letterSpacing="0.04em"
				mb={2}
			>
				{label}
			</Text>
			{children}
		</Box>
	);
}