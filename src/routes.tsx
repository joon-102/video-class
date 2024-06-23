import { RouteObject, createBrowserRouter } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard'

const routes: RouteObject[] = [
  { path: '/', element: <Main /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '*', element: <NotFound /> }
];

const router = createBrowserRouter(routes);

export default router;