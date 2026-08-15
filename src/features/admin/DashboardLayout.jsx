import React from 'react';

import { NavLink, Outlet } from 'react-router';
import { LogOut } from 'lucide-react';
import {
	useGetMeQuery,
	useLogoutMutation,
} from '../auth/signin/store/signInApi';
import { Spinner, Box, Icon, IconButton } from '@chakra-ui/react';
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
		<div>
			<nav>
				<div>
					<NavLink to='/new-product'>New Product</NavLink>
					<NavLink to='/transactions'>Transactions</NavLink>
					<NavLink to='/customer'>Customers</NavLink>
				</div>
				<div>
					<NavLink to='/sellers'>New Product</NavLink>
				</div>
				<IconButton icon={<Icon as={LogOut} />} onClick={() => logout()} />
			</nav>
			<Outlet />
		</div>
	);
}

export default DashboardLayout;
