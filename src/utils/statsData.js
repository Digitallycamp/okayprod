import { Archive, DollarSign, ShoppingCart, Smile } from 'lucide-react';

export const Overviewstats = [
	{
		id: 1,
		title: ' Total Revenue',
		amount: 25000,
		growth: 12.5,
		icon: DollarSign,
		period: 'vs last 30 days',
	},
	{
		id: 2,
		title: ' Total sales',
		amount: 25000,
		growth: 12.3,
		period: 'units sold',
		icon: ShoppingCart,
	},
	{
		id: 3,
		title: 'Active listings',
		amount: 48,
		period: '4 need restock',
		dot: true,
		icon: Archive,
	},
	{
		id: 4,
		title: ' Statisfaction',
		review: 33,
		period: 'Based on 342 reviews',
		rating: '4.9/5/0',
		icon: Smile,
		IconBg: '#E0E3E7',
		iconColor: '#564238',
		progress: 90,
	},
];
