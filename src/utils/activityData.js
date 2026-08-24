import { ShoppingBag, Star } from 'lucide-react';
import { Text } from 'recharts';

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
