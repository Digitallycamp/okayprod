import { useToast } from '@chakra-ui/react';
export const useNotify = () => {
  const toast = useToast();

  const success = (title, description, duration = 3000) => {
    toast({  title,  description,  status: 'success',  
      duration,  isClosable: true,  position: 'top-right',
    });
  };

  const error = (title, description, duration = 3000) => {
    toast({ title,  description,  status: 'error',  
    duration, isClosable: true, position: 'top-right', });
  };

  const info = (title, description, duration = 3000) => {
    toast({  title,  description,  status: 'info',  
      duration,  isClosable: true,  position: 'top-right',});
  };

  const warning = (title, description, duration = 3000) => {
    toast({  title,  description,  status: 'warning',  
      duration,  isClosable: true,  position: 'top-right',});
  };

  return { success, error, info, warning };
};

export default useNotify;