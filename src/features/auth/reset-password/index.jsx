import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react';

import { useParams } from 'react-router';

function ResetPasword() {
	const { token } = useParams();
	console.log(token);
	return (
		<div className='px-8 py-16'>
			<strong className='text-base text-bold'>Salesaza</strong>
			<Stack mt={8}>
				<Stack>
					<Heading fontSize={24}>Reset password</Heading>
					<Text>Manage your product and customer with ease</Text>
				</Stack>
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<Input placeholder='Password' />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Confirm password</FormLabel>
					<Input placeholder='Confirm password' />
				</FormControl>

				<div>
					<Button
						width={'100%'}
						className='w-full'
						bgColor='#2f258a'
						color='#ffffff'
						_hover={{ bg: '#2f258a' }}
					>
						Continue
					</Button>
				</div>
			</Stack>
		</div>
	);
}

export default ResetPasword;
