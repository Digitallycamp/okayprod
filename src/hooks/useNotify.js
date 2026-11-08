import { useToast } from '@chakra-ui/react';

export const useNotify = () => {
	const toast = useToast();

	return (type, title, description) => {
		toast({
			title,
			description,
			status: type,
			duration: 3000,
			isClosable: true,
			position: 'top-right',
		});
	};
};

export default useNotify;