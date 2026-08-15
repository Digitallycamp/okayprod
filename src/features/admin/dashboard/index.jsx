import { useGetMeQuery } from '../../auth/signin/store/signInApi';

function DashboardOverview() {
	const { data: user, isLoading } = useGetMeQuery();
	console.log(user);
	// TODO
	/**************
	 * 1. THEIS OVERVIEW CAN ONLY BEEN ACCESS BY ADMIN
	 * WHTA IS IT?
	 * Metic card, obe for total selles, one for total customer
	 * and a full with chart of sales that can be filtered by months
	 */
	return (
		<>
			Hello! user {user?.email}
			{user?.id} {user?.username}
		</>
	);
}

export default DashboardOverview;
