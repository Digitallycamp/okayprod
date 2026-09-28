import { Box, Text, Heading, Flex } from '@chakra-ui/react';
import {
  Banknote, Handbag, ClipboardMinus, TrendingUp, TrendingDown,
} from 'lucide-react';

import { useGetTransactionStatsQuery } from '../store/transactionApi';
import { currencyformatter } from '../../../../utils/currencyFormatter';

const StatCards = ({ startDate, endDate }) => {
  const {
    data: statsResponse,
    isLoading,
    isError,
  } = useGetTransactionStatsQuery({
    startDate,
    endDate,
  });

  const stats = statsResponse?.data;

  const totalVolume = stats?.totalVolume ?? 0;
  const totalOrders = stats?.totalOrders ?? 0;
  const refundRate = stats?.refundRate ?? 0;

  const volumeGrowth = stats?.volumeGrowth ?? 0;
  const orderGrowth = stats?.orderGrowth ?? 0;
  const refundGrowth = stats?.refundGrowth ?? 0;

  const cards = [
    {
      title: 'TOTAL VOLUME',
      value: isLoading
        ? '...'
        : currencyformatter(totalVolume),
      growth: volumeGrowth,
      icon: Banknote,
      iconBg: '#FFF1E6',
      iconColor: '#A94F00',
    },
    {
      title: 'TOTAL ORDERS',
      value: isLoading
        ? '...'
        : totalOrders.toLocaleString(),
      growth: orderGrowth,
      icon: Handbag,
      iconBg: '#D9F7EB',
      iconColor: '#087443',
    },
    {
      title: 'REFUND RATE',
      value: isLoading
        ? '...'
        : `${refundRate}%`,
      growth: refundGrowth,
      icon: ClipboardMinus,
      iconBg: '#FFF0F0',
      iconColor: '#C1121F',
    },
  ];

  const getGrowthStyles = (growth) => {
    if (growth > 0) {
      return {
        bg: '#EAF8F0',
        color: '#087443',
        icon: TrendingUp,
      };
    }

    if (growth < 0) {
      return {
        bg: '#FFF0F0',
        color: '#C1121F',
        icon: TrendingDown,
      };
    }

    return {
      bg: '#F5F5F5',
      color: '#604F45',
      icon: null,
    };
  };

  return (
    <Flex
      gap="16px"
      width="100%"
      marginBottom="40px"
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
    >
      {cards.map((card) => {
        const Icon = card.icon;
        const growthStyles = getGrowthStyles(card.growth);
        const GrowthIcon = growthStyles.icon;

        return (
          <Box
            key={card.title} flex="1" minW={{ base: '100%', md: '0' }} border="1px solid" borderColor="#EDF0F2" borderRadius="12px" padding="20px" background="#FFFFFF"
          >
            <Flex
              justify="space-between"
              align="flex-start"
            >
              <Box>
                <Text
                  fontSize="12px" fontWeight="600" color="#604F45" letterSpacing="0.5px" mb="8px"
                >
                  {card.title}
                </Text>

                <Heading
                  fontSize="24px" fontWeight="700" color="#092326"
                >
                  {card.value}
                </Heading>
              </Box>

              <Flex
                align="center" justify="center" width="40px" height="40px" borderRadius="10px" background={card.iconBg}
              >
                <Icon
                  size={20}
                  color={card.iconColor}
                />
              </Flex>
            </Flex>

            <Flex
              align="center"
              gap="6px"
              marginTop="16px"
            >
              <Flex
                align="center"
                gap="3px"
                padding="4px 8px"
                borderRadius="20px"
                background={growthStyles.bg}
                color={growthStyles.color}
              >
                {GrowthIcon && (
                  <GrowthIcon size={13} strokeWidth={2.5} />
                )}

                <Text
                  fontSize="12px"
                  fontWeight="600"
                >
                  {Math.abs(card.growth)}%
                </Text>
              </Flex>

              <Text
                fontSize="12px"
                color="#604F45"
              >
                from previous period
              </Text>
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};

export default StatCards;