
import React, { useContext } from 'react';
import { GlobalDataContext } from './GlobalData';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { loggedUser } = useContext(GlobalDataContext);
    if (loggedUser._id) {
        return children;
    } else {
        return <Navigate to='/' />;
    }
};

export default ProtectedRoute;
