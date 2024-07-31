import { createBrowserRouter } from 'react-router-dom';
import Home from 'pages/home/Home';
import SingleProduct from 'pages/home/SingleProduct';
import Login from 'pages/login/Login';
import Personal from 'pages/personal-area/Personal';
import ProtectedRoute from 'components/ProtectedRoute';
import PublicRoute from 'components/PublicRoute';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <PublicRoute element={<Login />} restricted={false} />,
    },
    {
        path: '/',
        element: <ProtectedRoute element={<Home />} />,
    },
    {
        path: '/product',
        element: <ProtectedRoute element={<SingleProduct />} />,
    },
    {
        path: '/personal-area',
        element: <ProtectedRoute element={<Personal />} />,
    },
]);
