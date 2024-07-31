import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/store';

interface PublicRouteProps {
    element: JSX.Element;
    restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
    element,
    restricted = false,
}) => {
    const { token } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (restricted && token) {
        return <Navigate to='/' state={{ from: location }} />;
    }

    return element;
};

export default PublicRoute;
