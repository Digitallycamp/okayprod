import { Button, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

function Verification() {
	const navigate = useNavigate();
	return (
		<VStack>
			{/* SDuccess nauim,ation */}
			<Text>Email verified successfully</Text>
			<Button onClick={() => navigate('/signin', { replace: true })}>
				Continue to Login
			</Button>
		</VStack>
	);
}

export default Verification;
