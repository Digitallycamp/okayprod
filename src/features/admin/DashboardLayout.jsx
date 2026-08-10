import React from 'react';
import { Outlet } from 'react-router';
import { useGetMeQuery } from '../auth/signin/store/signInApi';

function DashboardLayout() {
	const { data: user, isLoading } = useGetMeQuery();

	return (
		<div>
			<Outlet />
		</div>
	);
}

export default DashboardLayout;
