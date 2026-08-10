import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './core/store/index.js';

const colors = {
	brand: {
		900: '#2f258a',
		800: '#3524af',
		700: '#4129d9',
		600: '#4f39f6',
	},
};

const theme = extendTheme({ colors });
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ChakraProvider>
	</StrictMode>
);
