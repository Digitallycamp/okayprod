import { Navigate, Outlet, useLocation } from 'react-router';
import { useGetMeQuery } from '../../features/auth/signin/store/signInApi';
import { Spinner, Box } from '@chakra-ui/react';
function ProtectedRoutesGuard() {
	const { data: isAuth, isLoading, isError } = useGetMeQuery();
	const location = useLocation();
	console.log(isAuth);
	if (isLoading) {
		return (
			<Box height='100vh'>
				<Spinner />
			</Box>
		);
	}
	if (isError || !isAuth) {
		return <Navigate to='/signin' replace state={{ from: location }} />;
	}
	return <Outlet />;
}

export default ProtectedRoutesGuard;
