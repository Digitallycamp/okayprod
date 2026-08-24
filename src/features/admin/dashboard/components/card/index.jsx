import React from 'react';
import {
	Card,
	Box,
	CardHeader,
	CardBody,
	CardFooter,
	HStack,
	Text,
	Stack,
	Progress,
	Icon,
} from '@chakra-ui/react';
import { currencyformatter } from '../../../../../utils/currencyFormatter';

function OverViewCard({ data }) {
	return (
		<Card shadow={0.01}>
			<CardHeader>
				<HStack>
					<Text color='#564238'>{data.title}</Text>
					<Box>
						<Icon as={data.icon} />
					</Box>
				</HStack>
			</CardHeader>

			<CardBody>
				<Box>
					<Text fontSize={32} fontWeight={'bold'}>
						{data.amount && currencyformatter(data.amount)}
					</Text>
					{data.review && (
						<Progress
							size='sm'
							value={data.review}
							width='100%'
							rounded={8}
							colorScheme='pink'
						/>
					)}
					<Text color='#564238'>{data.period}</Text>
				</Box>
			</CardBody>
		</Card>
	);
}

export default OverViewCard;
