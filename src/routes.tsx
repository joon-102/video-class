import React from 'react-router-dom';

import Main from './pages/Main';
import NotFound from './pages/NotFound';

const routes: React.RouteObject[] = [
  { path: '/', element: <Main /> },
  { path: '*', element: <NotFound /> }
];

const router = React.createBrowserRouter(routes);

export default router;