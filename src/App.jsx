import { BrowserRouter, RouterProvider } from 'react-router';
import Routes from './routes';
import routes from './routes';

function App() {
	return (
		// <BrowserRouter>
		// 	<Routes />
		// </BrowserRouter>
		<RouterProvider router={routes} />
	);
}

export default App;
