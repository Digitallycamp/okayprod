import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';

import { Link } from 'react-router';

function ForgotPassword() {
	return (
		<div className='px-8 py-16'>
			<strong className='text-base text-bold'>Salesaza</strong>
			<Stack mt={8}>
				<Stack>
					<Heading fontSize={24}>Forgot password</Heading>
					<Text>Manage your product and customer with ease</Text>
				</Stack>
				<FormControl isRequired>
					<FormLabel>Email</FormLabel>
					<Input placeholder='Enter registered email' />
				</FormControl>

				<div>
					<Button
						width={'100%'}
						className='w-full'
						bgColor='#2f258a'
						color='#ffffff'
						_hover={{ bg: '#2f258a' }}
					>
						Reset
					</Button>
				</div>
			</Stack>

			<VStack className='mt-8'>
				<Text>
					Back to <Link to='/signin'> Sign in </Link>
				</Text>
			</VStack>
		</div>
	);
}

export default ForgotPassword;
