import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	VStack,
	AbsoluteCenter,
	Divider,
	Box,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useSignInMutation } from './store/signInApi';
import { useToast } from '@chakra-ui/react';
function Signin() {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [signIn, { isLoading }] = useSignInMutation();
	const navigate = useNavigate();
	const handleSingin = async (values) => {
		try {
			const res = await signIn(values).unwrap();

			toast({
				status: 'success',
				variant: 'solid',
				isClosable: true,
				description: res.message,
			});
			navigate('/dashboard');
		} catch (err) {
			toast({
				status: 'error',
				variant: 'solid',
				isClosable: true,
				description: err?.data?.message,
			});
		}
	};

	return (
		<div className='px-8 py-16 h-screen overflow-auto'>
			<strong className='text-base text-bold'>Salesaza</strong>
			<Stack mt={8}>
				<Stack>
					<Heading fontSize={24}>Sign in</Heading>
					<Text>Manage your product and customer with ease</Text>
				</Stack>
				<form onSubmit={handleSubmit(handleSingin)}>
					<FormControl isInvalid={errors.email}>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<Input
							id='email'
							{...register('email', { required: 'Feild can not be empty' })}
							placeholder='Enter email'
						/>
						<FormErrorMessage>
							{errors.email && errors.email.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.password}>
						<FormLabel htmlFor='pass'>Password</FormLabel>
						<Input
							type='password'
							id='pass'
							{...register('password', { required: 'Feild can not be empty' })}
							placeholder='Password'
						/>
						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</FormControl>
					<Flex justifyContent={'end'} my={4} color='blue'>
						<Link to='/forgot-password'>Forgot password</Link>
					</Flex>
					<div>
						<Button
							isLoading={isLoading}
							// disable={isLoading}
							type='submit'
							width={'100%'}
							className='w-full'
							bgColor='#2f258a'
							color='#ffffff'
							_hover={{ bg: '#2f258a' }}
						>
							Sign in
						</Button>
					</div>
				</form>
			</Stack>
			<div className='mt-4'>
				<Box position='relative' padding='10'>
					<Divider />
					<AbsoluteCenter bg='white' px='4'>
						Or
					</AbsoluteCenter>
				</Box>
				<Button
					type='button'
					width={'100%'}
					className='w-full'
					bgColor='#080808'
					color='#ffffff'
					_hover={{ bg: '#080808' }}
				>
					Continue with Google
				</Button>
			</div>

			<VStack className='mt-8'>
				<Text>
					Dont have an account?<Link to='/register'> Register </Link>
				</Text>
			</VStack>
		</div>
	);
}

export default Signin;
