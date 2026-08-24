import React, { useState } from 'react';
import { Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';
import { earningsData } from '../../../../../../utils/earningsData';
function EarningsChart() {
	const [range, setRange] = useState('6M');
	return (
		<Box
			bg='whie '
			borderRadius='xl'
			border='1px solid'
			borderColor='gray.100'
			p={6}
			flex='2'
		>
			<Flex justify='space-between' align='start' mb={1}>
				<Box>
					<Heading fontSize='lg' fontWeight='bold'>
						Earning Over Time
					</Heading>
					<Text fontSize='xs' mb={1} color='gray.500'>
						Last 6 Months
					</Text>
				</Box>
				<HStack
					bg='gray.50'
					border='1px solid'
					borderColor='gray.100'
					borderRadius='md'
					p='2px'
					spacing={0}
				>
					{['6M', '30M', '7D'].map((r) => (
						<Button
							onClick={() => setRange(r)}
							bg={range === r ? 'white' : 'transparent'}
							boxShadow={range === r ? 'sm' : 'none'}
							color={range === r ? 'gray.800' : 'gray.500'}
							key={r}
							size='xs'
							fontWeight='semibold'
							_hover={{ bg: 'white' }}
						>
							{r}
						</Button>
					))}
				</HStack>
			</Flex>
			<Box h='230px' mt={4}>
				<ResponsiveContainer width='100%' height='100%'>
					<AreaChart
						data={earningsData}
						margin={{ top: 20, right: 10, bottom: 0, left: -25 }}
					>
						<defs>
							<linearGradient id='fillArea' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='0%' stopColor='#D9DADD' stopOpacity={0.9} />

								<stop offset='100%' stopColor='#D9DADD' stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} stroke='#EEF0F2' />
						<XAxis
							dataKey='month'
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#9AA0A6', fontSize: 12 }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#9AA0A6', fontSize: 12 }}
							tickFormatter={(value) => `$${value / 1000}k`}
							domain={[0, 10000]}
						/>
						<Area
							type='monotone'
							dataKey='value'
							stroke='#B9BCC1'
							fill='url(#fillArea)'
							dot={{ r: 5, fill: '#111214', strokeWidth: 0 }}
							activeDot={{ r: 6 }}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</Box>
		</Box>
	);
}

export default EarningsChart;
