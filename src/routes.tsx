import { RouteObject, createBrowserRouter } from 'react-router-dom';

import Main from './pages/Main';
import NotFound from './pages/NotFound';

const routes: RouteObject[] = [
  { path: '/', element: <Main /> },
  { path: '*', element: <NotFound /> }
];

const router = createBrowserRouter(routes);

export default router;