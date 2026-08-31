import { useState } from 'react';
import { Box, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Image } from '@chakra-ui/react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Columns3 } from 'lucide-react';

import { transactions } from '../../../../utils/transactionsData';
import { currencyformatter } from '../../../../utils/currencyFormatter';

const TransactionTable = () => {
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions.filter((transaction) => {
    const searchValue = search.toLowerCase();

    return (
      transaction.id.toLowerCase().includes(searchValue) ||
      transaction.customer.toLowerCase().includes(searchValue) ||
      transaction.product.toLowerCase().includes(searchValue)
    );
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { background: '#E5FFF4', color: '#00A86B' };
      case 'PENDING':
        return { background: '#FFF4EC', color: '#8A3F00' };
      case 'REFUNDED':
        return { background: '#FFF0F0', color: '#C1121F' };
      default:
        return { background: '#F1F3F4', color: '#555' };
    }
  };

  return (
    <Box background="#FFFFFF" borderRadius="14px" border="1px solid #EDF0F2" overflow="hidden">
      
      <Flex padding="24px" justifyContent="space-between" alignItems="center" borderBottom="1px solid #E5E9EC">
       
        <Flex width="385px" height="44px" background="#F0F2F5" borderRadius="9px" alignItems="center" padding="0 14px" gap="10px">
          <Search size={20} color="#604F45" />
          <Input type="text" placeholder="Search by Order ID, Customer, or Product..." value={search} onChange={(e) => setSearch(e.target.value)} border="none" outline="none" background="transparent" width="100%" fontSize="14px" color="#092326" padding={0} _focus={{ border: 'none', boxShadow: 'none' }} />
        </Flex>

        <Flex gap="10px">
          <Button type="button" height="44px" padding="0 16px" border="none" borderRadius="9px" background="#F0F2F5" color="#604F45" display="flex" alignItems="center" gap="8px" cursor="pointer" fontSize="14px" fontWeight={500} _hover={{ background: '#F0F2F5' }}>
            <SlidersHorizontal size={17} />
            Filter
          </Button>
          <Button type="button" width="44px" height="44px" border="none" borderRadius="9px" background="#F0F2F5" color="#604F45" display="flex" alignItems="center" justifyContent="center" cursor="pointer" padding={0} _hover={{ background: '#F0F2F5' }}>
            <Columns3 size={18} />
          </Button>
        </Flex>
      </Flex>

      <Box overflowX="auto">
        <Table width="100%" borderCollapse="collapse" variant="unstyled">
          <Thead>
            <Tr borderBottom="1px solid #E5E9EC">
              {['ORDER ID', 'CUSTOMER', 'PRODUCT', 'DATE & TIME', 'AMOUNT', 'STATUS'].map((heading) => (
                <Th key={heading} textAlign="left" padding="16px 24px" fontSize="12px" fontWeight={600} color="#604F45" letterSpacing="0.5px" whiteSpace="nowrap" textTransform="none">
                  {heading}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {filteredTransactions.map((transaction) => {
              const statusStyle = getStatusStyles(transaction.status);
              const isRefunded = transaction.status === 'REFUNDED';

              return (
                <Tr key={transaction.id} borderBottom="1px solid #E5E9EC" bg={isRefunded ? '#F1F4F84D' : 'transparent'} opacity={isRefunded ? 0.7 : 1}>
                  
                  <Td padding="18px 24px" fontSize="14px" fontWeight={600} color={isRefunded ? '#564238' : '#A94F00'} whiteSpace="nowrap">
                    {transaction.id}
                  </Td>

                  <Td padding="18px 24px" minWidth="220px">
                    <Flex alignItems="center" gap="12px">
                      {transaction.image ? (
                        <Image src={transaction.image} alt={transaction.customer} width="36px" height="36px" borderRadius="50%" objectFit="cover" flexShrink={0} />
                      ) : (
                        <Flex width="36px" height="36px" borderRadius="50%" background="#DCEAEC" alignItems="center" justifyContent="center" color={isRefunded ? '#806F66' : '#4A6468'} fontSize="12px" fontWeight={600} flexShrink={0}>
                          {transaction.initials}
                        </Flex>
                      )}

                      <Box>
                        <Text margin={0} fontSize="14px" fontWeight={600} color={isRefunded ? '#806F66' : '#092326'} textDecoration={isRefunded ? 'line-through' : 'none'}>
                          {transaction.customer}
                        </Text>
                        <Text margin="3px 0 0" fontSize="12px" color={isRefunded ? '#9C8F87' : '#806F66'}>
                          {transaction.email}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>

                  <Td padding="18px 24px" minWidth="240px">
                    <Text margin={0} fontSize="15px" color={isRefunded ? '#806F66' : '#092326'}>
                      {transaction.product}
                    </Text>
                    <Text margin="4px 0 0" fontSize="12px" color={isRefunded ? '#9C8F87' : '#806F66'}>
                      {transaction.type}
                    </Text>
                  </Td>

                  <Td padding="18px 24px" minWidth="160px">
                    <Text margin={0} fontSize="14px" color={isRefunded ? '#806F66' : '#092326'}>
                      {transaction.date}
                    </Text>
                    <Text margin="4px 0 0" fontSize="12px" color={isRefunded ? '#9C8F87' : '#806F66'}>
                      {transaction.time}
                    </Text>
                  </Td>

                  <Td padding="18px 24px" fontSize="15px" fontWeight={700} color={isRefunded ? '#806F66' : transaction.amount < 0 ? '#8C817B' : '#092326'} whiteSpace="nowrap">
                    {transaction.amount < 0 ? '-' : ''}
                    {currencyformatter(Math.abs(transaction.amount))}
                  </Td>

                  <Td padding="18px 24px">
                    <Flex as="span" display="inline-flex" alignItems="center" gap="7px" padding="5px 11px" borderRadius="20px" background={statusStyle.background} color={statusStyle.color} fontSize="11px" fontWeight={700} letterSpacing="0.3px" whiteSpace="nowrap">
                      <Box as="span" width="6px" height="6px" borderRadius="50%" background="currentColor" />
                      {transaction.status}
                    </Flex>
                  </Td>
                </Tr>
              );
            })}

            {filteredTransactions.length === 0 && (
              <Tr>
                <Td colSpan="6" textAlign="center" padding="50px" color="#806F66" fontSize="14px">
                  No transactions found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <Flex padding="16px 24px" justifyContent="space-between" alignItems="center">
        <Text margin={0} fontSize="14px" color="#604F45">
          Showing 1 to {filteredTransactions.length} of 342 transactions
        </Text>

        <Flex alignItems="center" gap="8px">
          <Button type="button" border="none" background="transparent" cursor="pointer" color="#806F66" display="flex" alignItems="center" padding={0} minWidth="auto" _hover={{ background: 'transparent' }}>
            <ChevronLeft size={20} />
          </Button>
          <Button type="button" width="32px" height="32px" border="none" borderRadius="8px" background="#A94F00" color="#FFFFFF" cursor="pointer" fontWeight={600} padding={0} minWidth="auto" _hover={{ background: '#A94F00' }}>
            1
          </Button>
          <Button type="button" width="32px" height="32px" border="none" background="transparent" color="#604F45" cursor="pointer" padding={0} minWidth="auto" _hover={{ background: 'transparent' }}>
            2
          </Button>
          <Button type="button" width="32px" height="32px" border="none" background="transparent" color="#604F45" cursor="pointer" padding={0} minWidth="auto" _hover={{ background: 'transparent' }}>
            3
          </Button>
          <Text as="span" color="#604F45" padding="0 4px">
            ...
          </Text>
          <Button type="button" width="32px" height="32px" border="none" background="transparent" color="#604F45" cursor="pointer" padding={0} minWidth="auto" _hover={{ background: 'transparent' }}>
            12
          </Button>
          <Button type="button" border="none" background="transparent" cursor="pointer" color="#604F45" display="flex" alignItems="center" padding={0} minWidth="auto" _hover={{ background: 'transparent' }}>
            <ChevronRight size={20} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TransactionTable;