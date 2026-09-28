import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import SettingsSidebar from './SettingsSidebar';
export default function SettingsLayout() {
  return (
    <Box   minH="calc(100vh - 72px)"   bg="#F7F9FC"  position="relative">
      <Flex  maxW="1400px"  mx="auto"  px={{ base: 4, md: 6, lg: 8 }}  py={6}  gap={8}  align="flex-start"  minH="calc(100vh - 72px)">
        <Box flexShrink={0} top={6} alignSelf="flex-start" 
        w={{ base: 'full', md: '240px', lg: '280px' }} 
        position={{ base: 'relative', md: 'sticky' }}
        h={{ base: 'full', md: '100vh', lg: '100vh' }} >
          <SettingsSidebar />
        </Box>
        <Box  flex={1}  minW={0}  w="full"
          h={{ base: 'full', md: '100vh', lg: '100vh' }}
          overflowY={{ base: 'visible', md: 'auto' }}
          sx={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#D1D5DB',
              borderRadius: 'full',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#9CA3AF',
            },
          }}
        >
          <Box pb={6}>
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}