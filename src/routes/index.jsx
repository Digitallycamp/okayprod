import { createBrowserRouter, useRoutes } from 'react-router';
import routeObjects from './routes';

// function Routes() {
// 	const routes = useRoutes(routeObjects);
// 	return routes;
// }
const routes = createBrowserRouter(routeObjects);

export default routes;
