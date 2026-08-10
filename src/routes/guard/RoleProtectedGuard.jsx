import { Navigate, Outlet } from 'react-router';

function RoleProtectedGuard({ allowedRole }) {
	console.log(allowedRole);
	const role = 'admin';

	if (!role || !allowedRole.includes(role)) {
		return <Navigate to='/' replace />;
	}
	return <Outlet />;
}

export default RoleProtectedGuard;
