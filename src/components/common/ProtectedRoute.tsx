import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';
import * as routes from '../../constants/routes';

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to={routes.SIGNIN} />;
  }

  // Check if token has expired
  const decodedToken = jwtDecode(token) as { exp: number };
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedToken.exp < currentTime) {
    localStorage.removeItem('token');
    return <Navigate to={routes.SIGNIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
