import { useState, useEffect } from 'react';
import {Box,VStack,HStack,Text,Heading,Button,Input,InputGroup,InputRightElement,Switch,Flex,Icon,Divider,} from '@chakra-ui/react';
import { Key, ShieldLock, Monitor, Smartphone, Laptop, Eye, EyeOff, } from 'lucide-react';
import useNotify from '../../../hooks/useNotify';
import PageHeader from '../dashboard/components/pageHeader';
import { useGet2FAQuery, useUpdate2FAMutation, 
useChangePasswordMutation, useGetSessionsQuery,} from './store/securityApi';

const formatRelativeTime = (dateString) => {
	const then = new Date(dateString).getTime();
	const diffMs = Date.now() - then;
	const diffSec = Math.floor(diffMs / 1000);
	const diffMin = Math.floor(diffSec / 60);
	const diffHr = Math.floor(diffMin / 60);
	const diffDay = Math.floor(diffHr / 24);

	if (diffSec < 60) return 'Active now';
	if (diffMin < 60) return `${diffMin} min ago`;
	if (diffHr < 24) return `${diffHr} ${diffHr === 1 ? 'hour' : 'hours'} ago`;
	return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
};
const getSessionIcon = (deviceType) => {
	if (deviceType === 'mobile' || deviceType === 'tablet') return Smartphone;
	return Laptop;
};

export default function SecurityAccess() {
	const notify = useNotify();
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const { data: twoFAData } = useGet2FAQuery();
	const [update2FA, { isLoading: isUpdating2FA }] = useUpdate2FAMutation();
	const [is2FAEnabled, setIs2FAEnabled] = useState(false);

	useEffect(() => {
		if (twoFAData?.data?.twoFactorEnabled !== undefined) {
			setIs2FAEnabled(twoFAData.data.twoFactorEnabled);
		}
	}, [twoFAData]);
	const [changePassword, { isLoading: isChangingPassword }] =
		useChangePasswordMutation();
	const { data: sessionsData } = useGetSessionsQuery();
	const sessions = sessionsData?.data || [];

	const getPasswordStrength = (password) => {
		if (!password) return { strength: 0, label: '', color: 'gray.300' };

		let score = 0;
		if (password.length >= 8) score++;
		if (password.length >= 12) score++;
		if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
		if (/\d/.test(password)) score++;
		if (/[^a-zA-Z0-9]/.test(password)) score++;

		const strength = Math.min(score, 4);
		const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
		const colors = ['gray.300', 'red.500', 'green.400', 'green.400', 'green.500'];

		return {
			strength,
			label: labels[strength],
			color: colors[strength],
			segments: 4,
		};
	};

	const passwordStrength = getPasswordStrength(newPassword);

	const handleUpdatePassword = async () => {
		if (!currentPassword) {
			notify.error('Error', 'Please enter your current password.');
			return;
		}

		if (newPassword.length < 8) {
			notify.error('Error', 'New password must be at least 8 characters.');
			return;
		}

		if (newPassword !== confirmPassword) {
			notify.error('Error', 'Passwords do not match.');
			return;
		}

		if (newPassword === currentPassword) {
			notify.error(
				'Error',
				'New password must be different from current password.'
			);
			return;
		}

		try {
			const res = await changePassword({
				currentPassword,
				newPassword,
				confirmPassword,
			}).unwrap();

			notify.success(
				'Success',
				res.message || 'Your password has been updated successfully.'
			);

			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
		} catch (err) {
			notify.error(
				'Error',
				err?.data?.message || 'Failed to update password.'
			);
		}
	};

	const handle2FAToggle = async () => {
		const nextValue = !is2FAEnabled;
		setIs2FAEnabled(nextValue);

		try {
			const res = await update2FA(nextValue).unwrap();
			notify.info(
				nextValue ? '2FA Enabled' : '2FA Disabled',
				res.message ||
					(nextValue
						? 'Two-factor authentication has been enabled.'
						: 'Two-factor authentication has been disabled.')
			);
		} catch (err) {
			setIs2FAEnabled(!nextValue);
			notify.error(
				'Error',
				err?.data?.message || 'Failed to update 2FA setting.'
			);
		}
	};

	const handleRevokeSession = () => {
		notify.info(
			'Not Yet Available',
			'Session revocation will be available in a future update.'
		);
	};

	return (
		<Box w="full">
			<PageHeader 	title="Security & Access"
			description="Manage your password, secure your account with 2FA, and monitor active sessions."
			mb={8} />
			<Box mb={8}>
				<HStack spacing={3} mb={4}>
					<Icon as={Key} size={20} color="#9A4600" />
					<Heading as="h2" size="md" fontWeight="600" color="#061A1C">
						Change Password
					</Heading>
				</HStack>
				<Divider borderColor="#E5EBF2" mb={4} />

				<Box bg="white"	borderRadius="xl" p={6}	maxW="520px" border="1px solid"	borderColor="#E5EBF2" boxShadow="sm">
					<VStack spacing={4} align="stretch">
						<Box>
							<Text fontSize="sm" fontWeight="500" color="#061A1C" mb={2}>
								Current Password
							</Text>
							<InputGroup>
								<Input	type={showCurrentPassword ? 'text' : 'password'}	value={currentPassword}	onChange={(e) => setCurrentPassword(e.target.value)}	placeholder="Enter current password"
									bg="#F7FAFE" border="1px solid" borderColor="#E5EBF2" borderRadius="lg" h="44px"
									_focus={{	borderColor: '#9A4600',	boxShadow: '0 0 0 1px #9A4600',	bg: 'white',}}
								/>
								<InputRightElement h="44px">
									<Button	variant="ghost"	size="sm"	onClick={() => 
										setShowCurrentPassword(!showCurrentPassword)}	_hover={{ bg: 'transparent' }}>
										<Icon	as={showCurrentPassword ? EyeOff : Eye}	size={18}	color="#564238"/>
									</Button>
								</InputRightElement>
							</InputGroup>
						</Box>
						<Box>
							<Text fontSize="sm" fontWeight="500" color="#061A1C" mb={2}>
								New Password
							</Text>
							<InputGroup>
								<Input	type={showNewPassword ? 'text' : 'password'}	value={newPassword}	
								onChange={(e) => setNewPassword(e.target.value)}	placeholder="Enter new password"	
								bg="#F7FAFE"	border="1px solid"	borderColor="#E5EBF2"	borderRadius="lg"	h="44px"	
								_focus={{ borderColor: '#9A4600', boxShadow: '0 0 0 1px #9A4600', bg: 'white',}}
								/>
								<InputRightElement h="44px">
									<Button	variant="ghost"	size="sm"	onClick={() => setShowNewPassword(!showNewPassword)}	_hover={{ bg: 'transparent' }}>
										<Icon	as={showNewPassword ? EyeOff : Eye}	size={18}	color="#564238"/>
									</Button>
								</InputRightElement>
							</InputGroup>
							{newPassword && (
								<Box mt={3}>
									<HStack spacing={1} mb={1}>
										{[...Array(passwordStrength.segments)].map((_, index) => (
											<Box key={index} flex={1} h="4px"borderRadius="full"
												bg={ index < passwordStrength.strength ? passwordStrength.color : '#E5EBF2'}
												transition="all 0.2s"
											/>
										))}
									</HStack>
									<HStack justify="space-between">
										<Text fontSize="xs" color="#564238">
											Password strength:
										</Text>
										<Text fontSize="xs" fontWeight="600" color={passwordStrength.color}
										>
											{passwordStrength.label}
										</Text>
									</HStack>
								</Box>
							)}
						</Box>
						<Box>
							<Text fontSize="sm" fontWeight="500" color="#061A1C" mb={2}>
								Confirm New Password
							</Text>
							<InputGroup>
								<Input
									type={showConfirmPassword ? 'text' : 'password'}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="Confirm new password"
									bg="#F7FAFE" border="1px solid" borderColor="#E5EBF2" borderRadius="lg" h="44px"
									_focus={{	borderColor: '#9A4600',	boxShadow: '0 0 0 1px #9A4600',	bg: 'white',}}
									isInvalid={confirmPassword && newPassword !== confirmPassword}
								/>
								<InputRightElement h="44px">
									<Button	variant="ghost"	size="sm"	onClick={() => setShowConfirmPassword(!showConfirmPassword)}	_hover={{ bg: 'transparent' }}>
										<Icon
											as={showConfirmPassword ? EyeOff : Eye}
											size={18}
											color="#564238"
										/>
									</Button>
								</InputRightElement>
							</InputGroup>
							{confirmPassword && newPassword !== confirmPassword && (
								<Text fontSize="xs" color="red.500" mt={1}>
									Passwords do not match
								</Text>
							)}
						</Box>
						<Button	bg="#9A4600"	color="white"	px={8}	py={6}	borderRadius="lg"	fontWeight="500"
							_hover={{ bg: '#7A3600' }} _active={{ bg: '#6A2E00' }} onClick={handleUpdatePassword} alignSelf="flex-start" isLoading={isChangingPassword}
							isDisabled={!currentPassword ||	!newPassword ||	!confirmPassword ||	newPassword !== confirmPassword}
						>
							Update Password
						</Button>
					</VStack>
				</Box>
			</Box>
			<Box mb={8}>
				<HStack spacing={3} mb={4}>
					<Icon as={ShieldLock} size={20} color="#9A4600" />
					<Heading as="h2" size="md" fontWeight="600" color="#061A1C">
						Two-Factor Authentication (2FA)
					</Heading>
				</HStack>
				<Divider borderColor="#E5EBF2" mb={4} />

				<Box
					bg="white"
					borderRadius="xl"
					p={6}
					border="1px solid"
					borderColor="#E5EBF2"
					boxShadow="sm"
				>
					<Flex justify="space-between" align="center">
						<Box>
							<Text fontWeight="500" color="#061A1C" mb={1}>
								Authenticator App
							</Text>
							<Text fontSize="sm" color="#564238" maxW="lg">
								Add an extra layer of security to your account by requiring a
								code from your authenticator app when you sign in.
							</Text>
						</Box>
						<Switch
							size="lg"
							isChecked={is2FAEnabled}
							onChange={handle2FAToggle}
							isDisabled={isUpdating2FA}
							colorScheme="orange"
							flexShrink={0}
							ml={4}
							sx={{
								'& .chakra-switch__track': {
									bg: is2FAEnabled ? '#9A4600' : '#E5EBF2',
								},
								'& .chakra-switch__thumb': {
									bg: 'white',
								},
							}}
						/>
					</Flex>
				</Box>
			</Box>
			<Box mb={4}>
				<HStack spacing={3} mb={4}>
					<Icon as={Monitor} size={20} color="#9A4600" />
					<Heading as="h2" size="md" fontWeight="600" color="#061A1C">
						Active Sessions
					</Heading>
				</HStack>
				<Divider borderColor="#E5EBF2" mb={4} />

				<VStack spacing={4} align="stretch">
					{sessions.map((session) => {
						const SessionIcon = getSessionIcon(session.deviceType);

						return (
							<Box
								key={session.id}
								bg="white"
								borderRadius="xl"
								p={4}
								border="1px solid"
								borderColor="#E5EBF2"
								boxShadow="sm"
							>
								<Flex align="center" justify="space-between">
									<HStack spacing={4} flex={1}>
										<Box
											w="48px"
											h="48px"
											borderRadius="full"
											bg="#F7FAFE"
											display="flex"
											alignItems="center"
											justifyContent="center"
											flexShrink={0}
										>
											<Icon as={SessionIcon} size={20} color="#564238" />
										</Box>
										<Box flex={1}>
											<Text fontWeight="500" color="#061A1C" mb={0.5}>
												{session.device}
											</Text>
											<Text fontSize="sm" color="#564238">
												{session.location}
											</Text>
										</Box>
									</HStack>
									<Box flexShrink={0} ml={4}>
										{session.isActive ? (
											<HStack spacing={2}>
												<Box
													w="8px"
													h="8px"
													borderRadius="full"
													bg="green.500"
												/>
												<Text
													fontSize="sm"
													fontWeight="500"
													color="green.500"
												>
													Active now
												</Text>
											</HStack>
										) : (
											<HStack spacing={3}>
												<Text fontSize="sm" color="#564238">
													Last active: {formatRelativeTime(session.lastSeenAt)}
												</Text>
												<Button
													variant="ghost"
													size="sm"
													color="red.500"
													fontWeight="500"
													_hover={{
														bg: 'red.50',
														color: 'red.600',
													}}
													_active={{
														bg: 'red.100',
													}}
													onClick={handleRevokeSession}
												>
													Revoke
												</Button>
											</HStack>
										)}
									</Box>
								</Flex>
							</Box>
						);
					})}

					{sessions.length === 0 && (
						<Box
							bg="white"
							borderRadius="xl"
							p={8}
							textAlign="center"
							border="1px solid"
							borderColor="#E5EBF2"
						>
							<Text color="#564238">No active sessions found.</Text>
						</Box>
					)}
				</VStack>
			</Box>
		</Box>
	);
}