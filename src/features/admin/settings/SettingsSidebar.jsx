import { Box, VStack, Text, Flex, Button } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';
import { settingsNavItems } from '../../../utils/settingNav';
import {LogOut,} from 'lucide-react';


export default function SettingsSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box p={6} borderColor="gray.100" h={{ base: 'auto', md: '100%' }} minH={{ base: 'auto', md: '400px' }} display="flex" flexDirection="column">
      <Text  fontSize="xl"  fontWeight="bold"  color="gray.800"  mb={6}  letterSpacing="-0.5px">
        Settings
      </Text>

      <VStack spacing={1.5} align="stretch" flex={1}>
        {settingsNavItems.map((item) => {
          const isActive = currentPath === item.path || 
            (item.path === '/dashboard/settings/profile' && 
             currentPath === '/dashboard/settings');
          
          const Icon = item.icon;

          return (
            <NavLink  key={item.path}  to={item.path}  style={{ textDecoration: 'none' }}>
              {({ isActive: navLinkActive }) => {
                const active = navLinkActive || isActive;
                return (
                  <Flex align="center" gap={3} px={4} py={2.5} borderRadius="lg" bg={active ? '#F1E8E2' : 'transparent'} color={active ? '#A94F00' : 'gray.600'} fontWeight={active ? '600' : '400'} transition="all 0.15s ease" _hover={{   bg: active ? '#F1E8E2' : 'gray.50',   color: active ? '#A94F00' : 'gray.800', }}
                  >
                    <Icon  size={20}  strokeWidth={active ? 2.5 : 2}  color={active ? '#A94F00' : 'currentColor'}/>
                    <Text fontSize="sm">{item.label}</Text>
                  </Flex>
                );
              }}
            </NavLink>
          );
        })}
      </VStack>

      <Box borderTop="1px solid" borderColor="gray.100" mt={6} pt={6}>
        <Button  variant="ghost"  leftIcon={<LogOut size={18} />}  w="full"  justifyContent="flex-start"  color="gray.600"  fontWeight="400"  _hover={{    bg: 'red.50',    color: 'red.600',  }}  _active={{    bg: 'red.100',  }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}