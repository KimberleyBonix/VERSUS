/* eslint-disable import/prefer-default-export */
import { createBrowserRouter } from 'react-router-dom';
import App from './routes/App/App';
import Error from './routes/Error/Error';
import Home from './routes/Home/Home';
import Event from './routes/Event/Event';
import Profile from './routes/Profile/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />, // TODO edit the error component. Needs Header and Navbar
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'event/:slug',
        element: <Event />,
      },
      {
        // route for the connected user to see his profile
        path: 'profile',
        element: <Profile />,
      },
      {
        // route for the connected user to see researched user's profile
        path: 'profile/:pseudo',
        element: <Profile />,
      },
    ],
  },
]);
