import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = ({isAuthenticated, allowedRoles, userRole}) => {
    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;