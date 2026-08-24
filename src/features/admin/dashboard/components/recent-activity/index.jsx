import {
	Heading,
	Box,
	VStack,
	HStack,
	Icon,
	Flex,
	Text,
} from '@chakra-ui/react';
import { ShoppingBag, Star } from 'lucide-react';
import React from 'react';

export const activity = [
	{
		icon: ShoppingBag,
		iconBg: '#FCE7DB',
		iconColor: '#B4530A',
		title: (
			<>
				Sarah J. purchased{' '}
				<Text as='span' fontWeight='semibold'>
					"Advanced Photography Course"
				</Text>
			</>
		),
		time: '2 mins ago',
	},
	{
		icon: Star,
		iconBg: '#D6F5E3',
		iconColor: '#1E9E5A',
		title: <Text fontWeight='semibold'>Michael T. left a 5-star review</Text>,
		quote: '"Absolutely loved the lighting module, very helpful..."',
		time: '1 hr ago',
	},
];
function RecentActivity() {
	return (
		<Box
			bg='white'
			borderRadius='xl'
			border='1px solid'
			borderColor='gray.100'
			p={6}
			flex='1'
		>
			<Heading fontSize='lg' fontWeight='bold' mb={5}>
				React Activity
			</Heading>
			<VStack position='relative' spacing={5} align='strech'>
				<Box
					position='absolute'
					left='17px'
					top='8px'
					bottom='40px'
					w='1px'
					bg='gray.100'
				/>
				{activity.map((a, i) => (
					<HStack key={i} align='start' spacing={4}>
						<Flex
							w='36px'
							h='36px'
							bg={a.iconBg}
							align='center'
							justify='center'
							flexShrink={0}
							zIndex={1}
							borderRadius='full'
						>
							<Icon as={a.icon} color={a.iconColor} />
						</Flex>
						<Box>
							{a.title}
							{a.quote && (
								<Text fontSize='sm' color='gray.500' fontStyle='italic' mt={1}>
									{a.quote}
								</Text>
							)}
							<Text fontSize='xs' color='gray.400'>
								{a.time}
							</Text>
						</Box>
					</HStack>
				))}
			</VStack>
		</Box>
	);
}

export default RecentActivity;
