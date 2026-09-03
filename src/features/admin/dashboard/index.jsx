import {Box,Stack,Heading,Text,HStack,Flex,VStack,Button,Grid,} from '@chakra-ui/react';
import { Overviewstats } from '../../../utils/statsData';
import { useGetMeQuery } from '../../auth/signin/store/signInApi';
import OverViewCard from './components/card';
import { Download, Plus, Search, SlidersHorizontal } from 'lucide-react';
import EarningsChart from './components/card/earning-chart';
import RecentActivity from './components/recent-activity';
import PageHeader from './components/pageHeader';
function DashboardOverview() {
	const { data: user, isLoading } = useGetMeQuery();
	const handleExportReport = () => {
    
   };

  const handleNewProduct = () => {
    
  };
	console.log(user);
	// TODO
	/**************
	 * 1. THEIS OVERVIEW CAN ONLY BEEN ACCESS BY ADMIN
	 * WHTA IS IT?
	 * Metic card, obe for total selles, one for total customer
	 * and a full with chart of sales that can be filtered by months
	 */
	return (
		<Stack pt='68px'  p={{ base: 4, md: 6, lg: 8 }}>
			<PageHeader
				title={`Welcome back, ${user.username}`}
				description="Here's what's happening with your store today."
				secondaryButtonText="Export Report"
				secondaryButtonIcon={<Download size={18} />}
				onSecondaryClick={handleExportReport}
				primaryButtonText="New Product"
				primaryButtonIcon={<Plus size={18} />}
				onPrimaryClick={handleNewProduct}
				mb="8"
			/>
			<Grid templateColumns='repeat(4, 1fr)' gap='6' pt={10}>
				{Overviewstats.map((data) => (
					<OverViewCard key={data.id} data={data} />
				))}
			</Grid>
			<Box>
				<Flex gap={4} mt={8} direction={{ base: 'column', xl: 'row' }}>
					<EarningsChart />
					<RecentActivity />
				</Flex>
			</Box>
		</Stack>
	);
}

export default DashboardOverview;
