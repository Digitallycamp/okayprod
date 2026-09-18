import { useCallback, useState } from 'react';
import { Box, Text, Heading, Button, Flex, Input, Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';
import { Calendar, Download } from 'lucide-react';
import StatCards from './components/StatCards';
import TransactionTable from './components/TransactionTable';
import { useLazyExportTransactionsQuery } from './store/transactionApi';
import useGenerateCSV from '../../../hooks/useGenerateCSV';

const Transactions = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 29);
  const formatDate = (date) => date.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(formatDate(thirtyDaysAgo));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({
    orderId: true, customer: true, product: true, date: true, amount: true, status: true,
  });
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [exportTransactions, { isFetching: isExporting }] = useLazyExportTransactionsQuery();
  const generateCSV = useGenerateCSV();

  const handleColumnVisibilityChange = (column, isVisible) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: isVisible,
    }));
  };

  const handleTransactionsChange = useCallback((transactions) => {
    setFilteredTransactions(transactions);
  }, []);

  const handleApplyDate = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setIsDatePopoverOpen(false);
  };

  const handleLast30Days = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);
    setStartDate(formattedStart);
    setEndDate(formattedEnd);
    setTempStartDate(formattedStart);
    setTempEndDate(formattedEnd);
    setIsDatePopoverOpen(false);
  };

  const handleExportCSV = async () => {
    try {
      const result = await exportTransactions({
        search, status, startDate, endDate, page: 1, limit: 100,
      }).unwrap();

      const transactions = result.data ?? [];

      if (transactions.length === 0) {
        alert('There are no transactions to export.');
        return;
      }

      const headers = ['Order ID', 'Customer', 'Email', 'Product', 'Type', 'Date', 'Time', 'Amount', 'Status'];

      const rows = transactions.map((transaction) => [
        transaction.id, transaction.customer, transaction.email, transaction.product, transaction.type,
        transaction.date, transaction.time, transaction.amount, transaction.status,
      ]);

      generateCSV(rows, headers, `transactions-${startDate}-to-${endDate}.csv`);
    } catch (error) {
      console.error('CSV export failed:', error);
      alert('Failed to export transactions.');
    }
  };

  return (
    <Box padding={{ base: '24px 16px', md: '48px 40px' }}>
      {/* Header */}
      <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ base: 'flex-start', md: 'flex-end' }} marginBottom={{ base: '24px', md: '40px' }} gap={{ base: '16px', md: 0 }}>
        <Box>
          <Heading as="h1" margin={0} fontSize={{ base: '32px', md: '48px' }} lineHeight={1.1} fontWeight={700} color="#092326">Transactions</Heading>
          <Text margin="10px 0 0" fontSize={{ base: '14px', md: '16px' }} color="#604F45">
            Monitor your sales velocity, manage refunds, and export your raw commerce data.
          </Text>
        </Box>

        <Flex alignItems="center" gap={{ base: '8px', md: '16px' }} width={{ base: '100%', md: 'auto' }} flexWrap="wrap">
          <Popover isOpen={isDatePopoverOpen} onClose={() => setIsDatePopoverOpen(false)} placement="bottom-end">
            <PopoverTrigger>
              <Button type="button" height="42px" padding={{ base: '0 12px', md: '0 16px' }} border="none" borderRadius="9px" background="#E9EDF1" color="#092326" display="flex" alignItems="center" gap={{ base: '6px', md: '10px' }} cursor="pointer" fontSize={{ base: '13px', md: '14px' }} fontWeight={500} _hover={{ background: '#E9EDF1' }} onClick={() => setIsDatePopoverOpen(!isDatePopoverOpen)} flex={{ base: 1, md: 'initial' }}>
                <Calendar size={18} />
                Last 30 Days
                <Text as="span" fontSize="12px">⌄</Text>
              </Button>
            </PopoverTrigger>

            <PopoverContent width={{ base: 'calc(100vw - 32px)', sm: '280px' }} borderRadius="12px" border="1px solid #E5E9EC" p="16px">
              <Box>
                <Text fontWeight={600} fontSize="14px" mb="12px">Select Date Range</Text>

                <Box mb="12px">
                  <Text fontSize="12px" color="#604F45" mb="6px">Start Date</Text>
                  <Input type="date" value={tempStartDate} onChange={(e) => setTempStartDate(e.target.value)} />
                </Box>

                <Box mb="16px">
                  <Text fontSize="12px" color="#604F45" mb="6px">End Date</Text>
                  <Input type="date" value={tempEndDate} onChange={(e) => setTempEndDate(e.target.value)} />
                </Box>

                <Flex gap="8px">
                  <Button flex={1} variant="outline" onClick={handleLast30Days}>Last 30</Button>
                  <Button flex={1} background="#A94F00" color="white" _hover={{ bg: '#8F4300' }} onClick={handleApplyDate}>Apply</Button>
                </Flex>
              </Box>
            </PopoverContent>
          </Popover>

          <Button type="button" onClick={handleExportCSV} isLoading={isExporting} height="42px" padding={{ base: '0 12px', md: '0 18px' }} border="none" borderRadius="9px" background="#A94F00" color="#FFFFFF" display="flex" alignItems="center" gap={{ base: '6px', md: '9px' }} cursor="pointer" fontSize={{ base: '13px', md: '14px' }} fontWeight={600} _hover={{ background: '#A94F00' }} flex={{ base: 1, md: 'initial' }}>
            <Download size={17} />
            Export CSV
          </Button>
        </Flex>
      </Flex>

      <StatCards startDate={startDate} endDate={endDate} />

      <TransactionTable
        startDate={startDate}
        endDate={endDate}
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        onTransactionsChange={handleTransactionsChange}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
      />
    </Box>
  );
};

export default Transactions;