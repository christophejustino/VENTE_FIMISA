import React from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { Outlet, Navigate } from 'react-router-dom';
// import { TabTitle } from './GeneralFunctions';

const PrivateRoute = () => {
    // TabTitle('Ventes des services')
    const IsAuthenticated = useIsAuthenticated()
    
    return IsAuthenticated() ? <Outlet /> : <Navigate to='/auth' />;
}

export default PrivateRoute