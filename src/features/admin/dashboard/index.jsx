import {
	Box,
	Stack,
	Heading,
	Text,
	HStack,
	Flex,
	VStack,
	Button,
	Grid,
} from '@chakra-ui/react';
import { Overviewstats } from '../../../utils/statsData';
import { useGetMeQuery } from '../../auth/signin/store/signInApi';
import OverViewCard from './components/card';
import { DownloadIcon, MailIcon, PlusIcon } from 'lucide-react';
import EarningsChart from './components/card/earning-chart';
import RecentActivity from './components/recent-activity';

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
		<Stack pt='68px' px='40px'>
			<Flex justifyContent='space-between' alignItems='end'>
				<Stack>
					<Heading as='h1'>Welcome back, {user.username} </Heading>
					<Text fontSize='xs'>
						Here's what's happening with your store today.
					</Text>
				</Stack>
				<HStack>
					<Button leftIcon={<DownloadIcon />}>Export Report</Button>
					<Button leftIcon={<PlusIcon />} bgColor='brand.900' color='#fff'>
						New Product
					</Button>
				</HStack>
			</Flex>
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
