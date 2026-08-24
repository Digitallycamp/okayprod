import React from 'react';

import { NavLink, Outlet } from 'react-router';
import { Bell, DollarSign, LogOut, Search } from 'lucide-react';
import {
	useGetMeQuery,
	useLogoutMutation,
} from '../auth/signin/store/signInApi';
import {
	Spinner,
	Box,
	Icon,
	IconButton,
	Avatar,
	HStack,
	Stack,
	Flex,
} from '@chakra-ui/react';

function DashboardLayout() {
	const { isLoading } = useGetMeQuery();
	const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

	if (isLoading || logoutLoading) {
		return (
			<Box
				width={'100%'}
				height={'100vh'}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			</Box>
		);
	}
	return (
		<Stack bg='#F8FBFF' h='100%'>
			<header>
				<Box
					as='nav'
					fontSize='14px'
					className='bg-white h-[52px] px-[40px]  flex items-center justify-between'
				>
					<Box>
						<strong>Mystore</strong>
					</Box>
					<Flex gap={16}>
						<NavLink
							end
							to='/dashboard'
							className={({ isActive }) =>
								isActive ? 'nav-active' : 'nav-base'
							}
						>
							Overview
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'nav-active' : 'nav-base'
							}
							to='/dashboard/inventory'
						>
							Inventory
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'nav-active' : 'nav-base'
							}
							to='/dashboard/transactions'
						>
							Transactions
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'nav-active' : 'nav-base'
							}
							to='/dashboard/settings'
						>
							Settings
						</NavLink>
					</Flex>
					<HStack
						gap={4}
						className='nav-actions'
						display='flex'
						justifyContent='end'
					>
						<IconButton icon={<Icon as={Search} />} size={24} />
						<IconButton icon={<Icon as={Bell} />} size={24} />
						<Avatar
							size='xs'
							name='Kent Dodds'
							src='https://bit.ly/kent-c-dodds'
						/>
						{/* <IconButton
							icon={<Icon as={LogOut} />}
							size={24}
							onClick={() => logout()}
						/> */}
					</HStack>
				</Box>
			</header>
			<Outlet />
		</Stack>
	);
}

export default DashboardLayout;
