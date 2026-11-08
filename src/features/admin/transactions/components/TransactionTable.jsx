import { useEffect, useMemo, useState } from 'react';
import { Box, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Image, Popover, PopoverTrigger, PopoverContent, Select, Checkbox } from '@chakra-ui/react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Columns3 } from 'lucide-react';
import { useDebounceValue } from 'usehooks-ts';
import { useGetTransactionsQuery } from '../store/transactionApi';
import { currencyformatter } from '../../../../utils/currencyFormatter';

const TransactionTable = ({
  startDate, endDate, search, onSearchChange, status, onStatusChange,
  onTransactionsChange, columnVisibility, onColumnVisibilityChange,
}) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [tempStatus, setTempStatus] = useState(status);

  const [debouncedSearch] = useDebounceValue(search, 500);

  const { data: transactionsResponse, isLoading, isError } = useGetTransactionsQuery({
    search: debouncedSearch, status, startDate, endDate, page, limit,
  });

  const transactions = useMemo(
    () => transactionsResponse?.data ?? [],
    [transactionsResponse]
  );

  useEffect(() => {
    if (onTransactionsChange) {
      onTransactionsChange(transactions);
    }
  }, [transactions, onTransactionsChange]);

  const pagination = transactionsResponse?.pagination;
  const totalTransactions = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  const getStatusStyles = (status) => {
    switch (status) {
      case 'COMPLETED': return { background: '#E5FFF4', color: '#00A86B' };
      case 'PENDING': return { background: '#FFF4EC', color: '#8A3F00' };
      case 'REFUNDED': return { background: '#FFF0F0', color: '#C1121F' };
      default: return { background: '#F1F3F4', color: '#555' };
    }
  };

  const handleSearchChange = (e) => { onSearchChange(e.target.value); setPage(1); };
  const handlePreviousPage = () => { setPage((prevPage) => Math.max(prevPage - 1, 1)); };
  const handleNextPage = () => { setPage((prevPage) => Math.min(prevPage + 1, totalPages)); };
  const handlePageChange = (pageNumber) => { setPage(pageNumber); };

  const firstTransaction = totalTransactions === 0 ? 0 : (page - 1) * limit + 1;
  const lastTransaction = Math.min(page * limit, totalTransactions);
  const visibleColumnCount = Object.values(columnVisibility).filter(Boolean).length;

  return (
    <Box background="#FFFFFF" borderRadius="14px" border="1px solid #EDF0F2" overflow="hidden">
      <Flex padding={{ base: '16px', md: '24px' }} direction={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ base: 'stretch', md: 'center' }} borderBottom="1px solid #E5E9EC" gap={{ base: '12px', md: 0 }}>
        <Flex width={{ base: '100%', md: '385px' }} height="44px" background="#F0F2F5" borderRadius="9px" alignItems="center" padding="0 14px" gap="10px">
          <Search size={20} color="#604F45" />
          <Input type="text" placeholder="Search by Order ID, Customer, or Product..." value={search} onChange={handleSearchChange} border="none" outline="none" background="transparent" width="100%" fontSize="14px" color="#092326" padding={0} _focus={{ border: 'none', boxShadow: 'none' }} />
        </Flex>

        <Flex gap="10px" justifyContent={{ base: 'flex-end', md: 'flex-start' }}>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button type="button" height="44px" padding="0 16px" border="none" borderRadius="9px" background="#F0F2F5" color="#604F45" display="flex" alignItems="center" gap="8px" cursor="pointer" fontSize="14px" fontWeight={500} _hover={{ background: '#F0F2F5' }}>
                <SlidersHorizontal size={17} />
                Filter
              </Button>
            </PopoverTrigger>

            <PopoverContent width={{ base: 'calc(100vw - 32px)', sm: '240px' }} borderRadius="12px" border="1px solid #E5E9EC" p="16px">
              <Text fontSize="14px" fontWeight={600} mb="10px">Filter by Status</Text>
              <Select value={tempStatus} onChange={(e) => setTempStatus(e.target.value)} mb="14px">
                <option value="">All Status</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
                <option value="REFUNDED">Refunded</option>
              </Select>
              <Flex gap="8px">
                <Button flex={1} variant="outline" onClick={() => { setTempStatus(''); onStatusChange(''); setPage(1); }}>Reset</Button>
                <Button flex={1} background="#A94F00" color="white" _hover={{ bg: '#8F4300' }} onClick={() => { onStatusChange(tempStatus); setPage(1); }}>Apply</Button>
              </Flex>
            </PopoverContent>
          </Popover>

          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button type="button" width="44px" height="44px" border="none" borderRadius="9px" background="#F0F2F5" color="#604F45" display="flex" alignItems="center" justifyContent="center" cursor="pointer" padding={0} _hover={{ background: '#F0F2F5' }}>
                <Columns3 size={18} />
              </Button>
            </PopoverTrigger>

            <PopoverContent width={{ base: 'calc(100vw - 32px)', sm: '220px' }} borderRadius="12px" border="1px solid #E5E9EC" p="16px">
              <Text fontSize="14px" fontWeight={600} color="#092326" mb="12px">Show Columns</Text>
              {[
                { key: 'customer', label: 'Customer' },
                { key: 'product', label: 'Product' },
                { key: 'date', label: 'Date' },
                { key: 'amount', label: 'Amount' },
                { key: 'status', label: 'Status' },
              ].map((column) => (
                <Checkbox key={column.key} isChecked={columnVisibility[column.key]} onChange={(e) => onColumnVisibilityChange(column.key, e.target.checked)} mb="10px" colorScheme="orange">
                  <Text fontSize="13px" color="#604F45">{column.label}</Text>
                </Checkbox>
              ))}
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>

      <Box overflowX="auto">
        <Table width="100%" minWidth="720px" sx={{ borderCollapse: 'collapse' }} variant="unstyled">
          <Thead>
            <Tr borderBottom="1px solid #E5E9EC">
              {columnVisibility.orderId && (
                <Th textAlign="left" padding={{ base: '12px 16px', md: '16px 24px' }} fontSize="12px" fontWeight={600} color="#604F45" letterSpacing="0.5px" whiteSpace="nowrap" textTransform="none">ORDER ID</Th>
              )}
              {columnVisibility.customer && (
                <Th textAlign="left" padding={{ base: '12px 16px', md: '16px 24px' }} fontSize="12px" fontWeight={600} color="#604F45" letterSpacing="0.5px" whiteSpace="nowrap" textTransform="none">CUSTOMER</Th>
              )}
              {columnVisibility.product && (
                <Th textAlign="left" padding={{ base: '12px 16px', md: '16px 24px' }} fontSize="12px" fontWeight={600} color="#604F45" letterSpacing="0.5px" whiteSpace="nowrap" textTransform="none">PRODUCT</Th>
              )}
              {columnVisibility.date && (
                <Th textAlign="left" padding={{ base: '12px 16px', md: '16px 24px' }} fontSize="12px" fontWeight={600} color="#604F45" letterSpacing="0.5px" whiteSpace="nowrap" textTransform="none">DATE & TIME</Th>
              )}
              {columnVisibility.amount && (
                <Th textAlign="left" padding={{ base: '12px 16px', md: '16px 24px' }} fontSize="12px" fontWeight={600} color="#604F45" letterSpacing="0.5px" whiteSpace="nowrap" textTransform="none">AMOUNT</Th>
              )}
              {columnVisibility.status && (
                <Th textAlign="left" padding={{ base: '12px 16px', md: '16px 24px' }} fontSize="12px" fontWeight={600} color="#604F45" letterSpacing="0.5px" whiteSpace="nowrap" textTransform="none">STATUS</Th>
              )}
            </Tr>
          </Thead>

          <Tbody>
            {isLoading && (
              <Tr>
                <Td colSpan={visibleColumnCount} textAlign="center" padding="50px" color="#806F66" fontSize="14px">Loading transactions...</Td>
              </Tr>
            )}

            {isError && !isLoading && (
              <Tr>
                <Td colSpan={visibleColumnCount} textAlign="center" padding="50px" color="#C1121F" fontSize="14px">Failed to load transactions.</Td>
              </Tr>
            )}

            {!isLoading && !isError && transactions.map((transaction) => {
              const statusStyle = getStatusStyles(transaction.status);
              const isRefunded = transaction.status === 'REFUNDED';

              return (
                <Tr key={transaction.id} borderBottom="1px solid #E5E9EC" bg={isRefunded ? '#F1F4F84D' : 'transparent'} opacity={isRefunded ? 0.7 : 1}>
                  {columnVisibility.orderId && (
                    <Td padding={{ base: '14px 16px', md: '18px 24px' }} fontSize="14px" fontWeight={600} color={isRefunded ? '#564238' : '#A94F00'} whiteSpace="nowrap">
                      {transaction.id}
                    </Td>
                  )}

                  {columnVisibility.customer && (
                    <Td padding={{ base: '14px 16px', md: '18px 24px' }} minWidth={{ base: '180px', md: '220px' }}>
                      <Flex alignItems="center" gap={{ base: '8px', md: '12px' }}>
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
                  )}

                  {columnVisibility.product && (
                    <Td padding={{ base: '14px 16px', md: '18px 24px' }} minWidth={{ base: '200px', md: '240px' }}>
                      <Text margin={0} fontSize="15px" color={isRefunded ? '#806F66' : '#092326'}>
                        {transaction.product}
                      </Text>
                      <Text margin="4px 0 0" fontSize="12px" color={isRefunded ? '#9C8F87' : '#806F66'}>
                        {transaction.type}
                      </Text>
                    </Td>
                  )}

                  {columnVisibility.date && (
                    <Td padding={{ base: '14px 16px', md: '18px 24px' }} minWidth={{ base: '140px', md: '160px' }}>
                      <Text margin={0} fontSize="14px" color={isRefunded ? '#806F66' : '#092326'}>
                        {transaction.date}
                      </Text>
                      <Text margin="4px 0 0" fontSize="12px" color={isRefunded ? '#9C8F87' : '#806F66'}>
                        {transaction.time}
                      </Text>
                    </Td>
                  )}

                  {columnVisibility.amount && (
                    <Td padding={{ base: '14px 16px', md: '18px 24px' }} fontSize="15px" fontWeight={700} color={isRefunded ? '#806F66' : transaction.amount < 0 ? '#8C817B' : '#092326'} whiteSpace="nowrap">
                      {transaction.amount < 0 ? '-' : ''}
                      {currencyformatter(Math.abs(transaction.amount))}
                    </Td>
                  )}

                  {columnVisibility.status && (
                    <Td padding={{ base: '14px 16px', md: '18px 24px' }}>
                      <Flex as="span" display="inline-flex" alignItems="center" gap="7px" padding="5px 11px" borderRadius="20px" background={statusStyle.background} color={statusStyle.color} fontSize="11px" fontWeight={700} letterSpacing="0.3px" whiteSpace="nowrap">
                        <Box as="span" width="6px" height="6px" borderRadius="50%" background="currentColor" />
                        {transaction.status}
                      </Flex>
                    </Td>
                  )}
                </Tr>
              );
            })}

            {!isLoading && !isError && transactions.length === 0 && (
              <Tr>
                <Td colSpan={visibleColumnCount} textAlign="center" padding="50px" color="#806F66" fontSize="14px">No transactions found.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <Flex padding={{ base: '14px 16px', md: '16px 24px' }} direction={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" gap={{ base: '12px', md: 0 }}>
        <Text margin={0} fontSize="14px" color="#604F45" textAlign={{ base: 'center', md: 'left' }}>
          Showing {firstTransaction} to {lastTransaction} of {totalTransactions} transactions
        </Text>

        <Flex alignItems="center" gap="8px" flexWrap="wrap" justifyContent="center">
          <Button type="button" border="none" background="transparent" cursor="pointer" color="#806F66" display="flex" alignItems="center" padding={0} minWidth="auto" _hover={{ background: 'transparent' }} onClick={handlePreviousPage} isDisabled={page === 1}>
            <ChevronLeft size={20} />
          </Button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Button key={pageNumber} type="button" width="32px" height="32px" border="none" borderRadius="8px" background={page === pageNumber ? '#A94F00' : 'transparent'} color={page === pageNumber ? '#FFFFFF' : '#604F45'} cursor="pointer" fontWeight={page === pageNumber ? 600 : 400} padding={0} minWidth="auto" _hover={{ background: page === pageNumber ? '#A94F00' : 'transparent' }} onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </Button>
          ))}

          <Button type="button" border="none" background="transparent" cursor="pointer" color="#604F45" display="flex" alignItems="center" padding={0} minWidth="auto" _hover={{ background: 'transparent' }} onClick={handleNextPage} isDisabled={page === totalPages}>
            <ChevronRight size={20} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TransactionTable;