import { lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { Spinner, Center } from '@chakra-ui/react';
import DashboardLayout from '../features/admin/DashboardLayout';
import AuthLayout from '../features/auth/AuthLayout';
import ProtectedRoutesGuard from './guard/ProtectedRoutesGuard';
import RoleProtectedGuard from './guard/RoleProtectedGuard';
const ForgotPassword = lazy(() => import('../features/auth/forgot-password'));
const Register = lazy(() => import('../features/auth/register'));
const ResetPasword = lazy(() => import('../features/auth/reset-password'));
const Signin = lazy(() => import('../features/auth/signin'));
const DashboardOverview = lazy(() => import('../features/admin/dashboard'));
const AddNewProduct = lazy(() => import('../features/admin/new-order'));
const ProfileDetails = lazy(() => import('../features/admin/settings/ProfileDetails'));
const StorefrontSettings = lazy(() => import('../features/admin/settings/StorefrontSettings'));
const SettingsLayout = lazy(() => import('../features/admin/settings/SettingsLayout'));
const Inventory = lazy(() => import('../features/admin/dashboard/inventory'));
const Transactions = lazy(() => import('../features/admin/transactions'));
const SecurityAccess = lazy(() => import('../features/admin/settings/securityAccess'));
const paymentBilling = lazy(() => import('../features/admin/settings/paymentBilling'));
const suspenseFallback = (
	<Center minH="200px">
		<Spinner color="#A94F00" size="lg" />
	</Center>
);
const withSuspense = (element) => <Suspense fallback={suspenseFallback}>{element}</Suspense>;

const routeObjects = [
	{
		element: <AuthLayout />,
		children: [
			{ path: 'register', element: withSuspense(<Register />) },
			{ path: 'signin', element: withSuspense(<Signin />) },
			{ path: 'forgot-password', element: withSuspense(<ForgotPassword />) },
			{ path: 'reset-password/:token', element: withSuspense(<ResetPasword />) },
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
				element: withSuspense(<DashboardLayout />),
				children: [
					{ index: true, element: withSuspense(<DashboardOverview />) },
					{ path: 'new-order', element: withSuspense(<AddNewProduct />) },
					{ path: 'orders', element: <p>Orders</p> },
					{ path: 'inventory', element: withSuspense(<Inventory />) },
					{
						path: 'settings',
						element: withSuspense(<SettingsLayout />),
						children: [
							{ index: true, element: withSuspense(<ProfileDetails />) },
							{ path: 'storefront', element: withSuspense(<StorefrontSettings />) },
							{ path: 'payments', element: withSuspense(<paymentBilling />) },
							{ path: 'security', element: withSuspense(<SecurityAccess />) },
						],
					},
					{ path: 'report', element: <p>Report</p> },
					{ path: 'transactions', element: withSuspense(<Transactions />) },
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