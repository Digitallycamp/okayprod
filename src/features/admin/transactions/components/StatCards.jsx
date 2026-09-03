import {
  Box,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';
import {
  Banknote,
  ShoppingBag,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

import { transactionSummary } from '../../../../utils/transactionsData';
import { currencyformatter } from '../../../../utils/currencyFormatter';

const StatCards = () => {
  const {
    totalVolume,
    totalOrders,
    refundRate,
    volumeGrowth,
    orderGrowth,
    refundGrowth,
  } = transactionSummary;

  const cards = [
    {
      title: 'TOTAL VOLUME',
      value: currencyformatter(totalVolume),
      growth: volumeGrowth,
      comparison: 'vs last month',
      icon: Banknote,
      iconBg: '#FFF1E6',
      iconColor: '#A94F00',
    },
    {
      title: 'TOTAL ORDERS',
      value: totalOrders.toLocaleString(),
      growth: orderGrowth,
      comparison: 'vs last month',
      icon: ShoppingBag,
      iconBg: '#D9F7EB',
      iconColor: '#087443',
    },
    {
      title: 'TOTAL REFUNDS',
      value: `${refundRate}%`,
      growth: refundGrowth,
      comparison: 'vs last month',
      icon: RotateCcw,
      iconBg: '#FFF0F0',
      iconColor: '#C1121F',
    },
  ];

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gap="24px"
      marginBottom="40px"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = card.growth > 0;
        const isNeutral = card.growth === 0;

        return (
          <Box
            key={card.title}
            background="#FFFFFF"
            borderRadius="14px"
            padding="24px"
            minHeight="150px"
            border="1px solid #EDF0F2"
            position="relative"
          >
            
            <Box
              position="absolute"
              top="24px"
              right="24px"
              width="40px"
              height="40px"
              borderRadius="50%"
              background={card.iconBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon size={20} color={card.iconColor} strokeWidth={2} />
            </Box>

            <Text
              margin={0}
              fontSize="12px"
              fontWeight={600}
              color="#604F45"
              letterSpacing="0.5px"
            >
              {card.title}
            </Text>


            <Heading
              as="h2"
              margin="8px 0 20px"
              fontSize="32px"
              lineHeight={1.2}
              fontWeight={700}
              color="#092326"
            >
              {card.value}
            </Heading>

           
            <Flex
              alignItems="center"
              gap="8px"
            >
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                gap="2px"
                padding="3px 7px"
                borderRadius="8px"
                background={isNeutral
                  ? '#EEF0F2'
                  : isPositive
                    ? '#E2FFF3'
                    : '#FFE9E9'}
                color={isNeutral
                  ? '#5F6368'
                  : isPositive
                    ? '#00A86B'
                    : '#C1121F'}
                fontSize="12px"
                fontWeight={600}
              >
                {!isNeutral &&
                  (isPositive ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  ))}

                {isPositive ? '+' : ''}
                {card.growth}%
              </Box>

              <Text
                as="span"
                fontSize="13px"
                color="#604F45"
              >
                {card.comparison}
              </Text>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};

export default StatCards;