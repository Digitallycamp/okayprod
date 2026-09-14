import { useState, useMemo } from 'react';
import {Box,Flex,HStack,Button,Input,InputGroup,InputLeftElement,Grid,useBreakpointValue,Text,} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { Download, Plus, Search, SlidersHorizontal } from 'lucide-react';
import PageHeader from './components/pageHeader';
import ProductCard from './components/product-card/productCard';
import { inventoryProducts,getTypeCounts } from '../../../utils/inventoryData';

const Inventory = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [activeType, setActiveType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);
  const counts = useMemo(() => getTypeCounts(inventoryProducts), []);
  const filteredProducts = useMemo(() => {
    return inventoryProducts.filter((product) => {
      const matchesType = activeType === 'all' || product.type === activeType;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      
      return matchesType && matchesSearch;
    });
  }, [activeType, searchTerm]);
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredProducts.length));
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Price', 'Type', 'Status', 'Description'];
    const rows = filteredProducts.map(p => [
      p.id,
      `"${p.title}"`,
      p.price,
      p.type,
      p.status,
      `"${p.description}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddProduct = () => {
    navigate('/dashboard/new-order');
  };
  const tabs = [
    { id: 'all', label: 'All Products', count: counts.all },
    { id: 'digital', label: 'Digital', count: counts.digital },
    { id: 'physical', label: 'Physical', count: counts.physical },
    { id: 'service', label: 'Services', count: counts.service },
  ];

  return (
    <Box bg="#F7FAFE" minH="calc(100vh - 80px)" p={{ base: 4, md: 6, lg: 8 }}>
      <PageHeader
        title="Inventory"
        description="Manage your digital assets, physical goods, and consultancies. Keep track of stock and performance."
        secondaryButtonText="Export CSV"
        secondaryButtonIcon={<Download size={18} />}
        onSecondaryClick={handleExportCSV}
        primaryButtonText="Add Product"
        primaryButtonIcon={<Plus size={18} />}
        onPrimaryClick={handleAddProduct} 
        mb="8"
      />
      <Box  bg="white"  borderRadius="xl"  p={{ base: 4, md: 5 }}  mb={8}  border="1px solid"  borderColor="#E5EBF2"  boxShadow="sm">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={4}
          align={{ base: 'stretch', lg: 'center' }}
          justify="space-between"
        >
          <HStack spacing={2} overflowX={{ base: 'auto', lg: 'visible' }} pb={{ base: 2, lg: 0 }}
            css={{
              '&::-webkit-scrollbar': {
                height: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#D1D9E6',
                borderRadius: 'full',
              },
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeType === tab.id;
              return (
                <Button  key={tab.id}  size="sm"  px={4}  py={2.5}  h="auto"  borderRadius="full"  bg={isActive ? '#FFDBC9' : '#EBEEF2'}  color={isActive ? '#9A4600' : '#564238'}  fontWeight={isActive ? '600' : '500'}  _hover={{    bg: isActive ? '#FFDBC9' : '#D1D9E6',  }}  _active={{    bg: '#FFDBC9',  }}  onClick={() => {    setActiveType(tab.id);    setVisibleCount(4);  }}  whiteSpace="nowrap">
                  {tab.label}
                  <Box  as="span"  ml={2}  bg={isActive ? '#9A4600' : '#D1D9E6'}  color={isActive ? 'white' : '#564238'}  px={2}  py={0.5}  borderRadius="full"  fontSize="xs"  fontWeight="600">
                    {tab.count}
                  </Box>
                </Button>
              );
            })}
          </HStack>
          <HStack spacing={3} flexShrink={0}>
            <InputGroup maxW={{ base: 'full', lg: '280px' }} minW="180px">
              <InputLeftElement pointerEvents="none">
                <Search size={18} color="#564238" />
              </InputLeftElement>
              <Input  placeholder="Search inventory..."  value={searchTerm}  
               onChange={(e) => { 
                setSearchTerm(e.target.value);    
                setVisibleCount(4);  
                }}  
               bg="#F7FAFE"  border="1px solid"  
               borderColor="#E5EBF2"  borderRadius="lg"  h="44px"  pl={10}  fontSize="sm"  
               _focus={{ 
                borderColor: '#9A4600',    
                boxShadow: '0 0 0 1px #9A4600',   
                 bg: 'white',  }}/>
            </InputGroup>
            <Button  variant="outline"  borderColor="#E5EBF2"  bg="white"  h="44px"  w="44px"  minW="44px"  borderRadius="lg"
              _hover={{
                bg: '#F7FAFE',
                borderColor: '#D1D9E6',
              }}
            >
              <SlidersHorizontal size={18} color="#564238" />
            </Button>
          </HStack>
        </Flex>
      </Box>
      <Grid
        templateColumns={{  base: '1fr',  sm: 'repeat(2, 1fr)',  lg: 'repeat(3, 1fr)',  xl: 'repeat(4, 1fr)',}}
        gap={6} mb={8} >
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      {filteredProducts.length === 0 && (
        <Box textAlign="center" py={12}>
          <Text color="#564238" fontSize="lg">
            No products found matching your criteria.
          </Text>
        </Box>
      )}
      {filteredProducts.length > 0 && (
        <Flex justify="center" mt={4}>
          {hasMore ? (
            <Button  variant="outline"  borderColor="#D1D9E6"  color="#564238"  bg="white"  px={8}  py={6}  borderRadius="full"  fontWeight="500"
              _hover={{
                bg: '#F7FAFE',
                borderColor: '#9A4600',
                color: '#9A4600',
              }}
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          ) : (
            <Text fontSize="sm" color="#564238">
              Showing all {filteredProducts.length} products
            </Text>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Inventory;