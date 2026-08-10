import { useGetMeQuery } from '../../auth/signin/store/signInApi';

function DashboardOverview() {
	const { data: user, isLoading } = useGetMeQuery();
	console.log(user);
	return (
		<>
			Hello! user {user?.email}
			{user?.id} {user?.username}
		</>
	);
}

export default DashboardOverview;
