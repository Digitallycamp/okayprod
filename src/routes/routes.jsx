import { lazy } from 'react';

import DashboardLayout from '../features/admin/DashboardLayout';
import AuthLayout from '../features/auth/AuthLayout';
import ForgotPassword from '../features/auth/forgot-password';
import Register from '../features/auth/register';
import ResetPasword from '../features/auth/reset-password';
import Signin from '../features/auth/signin';
import ProtectedRoutesGuard from './guard/ProtectedRoutesGuard';
import RoleProtectedGuard from './guard/RoleProtectedGuard';
import DashboardOverview from '../features/admin/dashboard';
import { Link } from 'react-router';
import AddNewProduct from '../features/admin/new-order';
import SettingsProfilePage from '../features/admin/settings';
import Transactions from '../features/admin/transactions'
// const DashboardOverview = lazy(() =>
// 	import('../features/admin/DashboardLayout')
// );

const routeObjects = [
	{
		element: <AuthLayout />,
		children: [
			{
				path: 'register',
				element: <Register />,
			},
			{
				path: 'signin',
				element: <Signin />,
			},
			{
				path: 'forgot-password',
				element: <ForgotPassword />,
			},
			{
				path: 'reset-password/:token',
				element: <ResetPasword />,
			},
		],
	},

	{
		path: '/',
		element: (
			<div>
				Home <Link to='/signin'>Signin</Link>
			</div>
		),
	},

	{
		element: <ProtectedRoutesGuard />,
		children: [
			{
				path: 'dashboard',
				errorElement: <p>NOT FOUND</p>,
				element: <DashboardLayout />,
				children: [
					{ index: true, element: <DashboardOverview /> },
					{
						path: 'new-order',
						element: <AddNewProduct />,
					},
					{ path: 'orders', element: <p>Orders</p> },
					{ path: 'inventory', element: <p>Inventory</p> },
					{ path: 'settings', element: <SettingsProfilePage /> },
					{ path: 'report', element: <p>Report</p> },
					{ path: 'transactions', element: <Transactions /> },
					{
						path: 'sellers',
						element: (
							<RoleProtectedGuard allowedRole={['admin']}>
								<p>sellers</p>
							</RoleProtectedGuard>
						),
					},
					{
						path: 'sellers/:id',
						element: (
							<RoleProtectedGuard allowedRole={['admin']}>
								<p>details</p>
							</RoleProtectedGuard>
						),
					},
				],
			},
		],
	},
];

export default routeObjects;
