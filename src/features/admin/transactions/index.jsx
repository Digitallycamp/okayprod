import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
} from '@chakra-ui/react';
import { CalendarDays, Download } from 'lucide-react';

import StatCards from './components/StatCards';
import TransactionTable from './components/TransactionTable';

const Transactions = () => {
  return (
    <Box padding="48px 40px">
    
      <Flex
        justifyContent="space-between"
        alignItems="flex-end"
        marginBottom="40px"
      >
        <Box>
          <Heading
            as="h1"
            margin={0}
            fontSize="48px"
            lineHeight={1.1}
            fontWeight={700}
            color="#092326"
          >
            Transactions
          </Heading>

          <Text
            margin="10px 0 0"
            fontSize="16px"
            color="#604F45"
          >
            Monitor your sales velocity, manage refunds, and export your raw
            commerce data.
          </Text>
        </Box>

        <Flex
          alignItems="center"
          gap="16px"
        >
          <Button
            type="button"
            height="42px"
            padding="0 16px"
            border="none"
            borderRadius="9px"
            background="#E9EDF1"
            color="#092326"
            display="flex"
            alignItems="center"
            gap="10px"
            cursor="pointer"
            fontSize="14px"
            fontWeight={500}
            _hover={{
              background: '#E9EDF1',
            }}
          >
            <CalendarDays size={18} />

            Last 30 Days

            <Text as="span" fontSize="12px">⌄</Text>
          </Button>

          <Button
            type="button"
            height="42px"
            padding="0 18px"
            border="none"
            borderRadius="9px"
            background="#A94F00"
            color="#FFFFFF"
            display="flex"
            alignItems="center"
            gap="9px"
            cursor="pointer"
            fontSize="14px"
            fontWeight={600}
            _hover={{
              background: '#A94F00',
            }}
          >
            <Download size={17} />

            Export CSV
          </Button>
        </Flex>
      </Flex>

      <StatCards />

      <TransactionTable />
    </Box>
  );
};

export default Transactions;