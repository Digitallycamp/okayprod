import {
	Box,
	Button,
	Divider,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	VStack,
	AbsoluteCenter,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Verification from '../component/verification';
import { useSignupMutation } from './store/signUpApi';
import { useToast } from '@chakra-ui/react';
import { useGoogleSigninMutation } from '../signin/store/signInApi';
function Register() {
	const toast = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [isVerifying, setVerifying] = useState(false);
	const [signup, { isLoading }] = useSignupMutation();
	const [googleSignin, { isLoading: googleSiginLoading }] =
		useGoogleSigninMutation();
	const navigate = useNavigate();
	const handleRegister = async (values) => {
		try {
			const res = await signup(values).unwrap();
			toast({
				status: 'success',
				variant: 'solid',
				isClosable: true,
				description: res.message,
			});
			setVerifying(true);
		} catch (err) {
			toast({
				status: 'error',
				variant: 'solid',
				isClosable: true,
				description: err?.data?.message,
			});
		}
	};

	const handleGoogleSignIn = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			await googleSignin(tokenResponse.access_token).unwrap();
			navigate('/dashboard');
		},
		onError: () => {
			toast({
				status: 'error',
				variant: 'solid',
				isClosable: true,
				description: 'Google authentication failed',
			});
		},
		ux_mode: 'popup',
	});
	// if (isVerifying) {
	// 	return <Verification />;
	// }

	return (
		<div className='px-4 lg:px-8 py-16 h-screen overflow-auto '>
			<strong className='text-base text-bold'>Salesaza</strong>
			<Stack mt={8} width='100%'>
				<Stack>
					<Heading fontSize={24}>Register</Heading>
					<Text>Register a new account</Text>
				</Stack>
				<form onSubmit={handleSubmit(handleRegister)}>
					<FormControl isInvalid={errors.email}>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<Input
							id='email'
							{...register('email', {
								required: 'Feild can not be empty',
							})}
							placeholder='Enter email'
						/>
						<FormErrorMessage>
							{errors.email && errors.email.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.password}>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input
							id='password'
							{...register('password', { required: 'Feild can not be empty' })}
							type='password'
							placeholder='Password'
						/>

						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</FormControl>

					<div className='mt-8'>
						<Button
							type='submit'
							width={'100%'}
							className='w-full'
							bgColor='#2f258a'
							color='#ffffff'
							_hover={{ bg: '#2f258a' }}
						>
							Register
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
					onClick={() => handleGoogleSignIn()}
					isLoading={googleSiginLoading}
					disabled={googleSiginLoading}
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
					Alread have an account?<Link to='/signin'> Signin </Link>
				</Text>
			</VStack>
		</div>
	);
}

export default Register;
