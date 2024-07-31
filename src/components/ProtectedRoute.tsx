import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/store';

interface ProtectedRouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { token } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!token) {
        return <Navigate to='/login' state={{ from: location }} />;
    }

    return element;
};

export default ProtectedRoute;
