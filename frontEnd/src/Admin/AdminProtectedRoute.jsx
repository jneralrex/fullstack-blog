import React, { useContext } from 'react';
import { AdminGlobalDataContext } from './AdminGlobalDataProvider';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const { loggedAdmin } = useContext(AdminGlobalDataContext);
    return loggedAdmin._id ? children : <Navigate to='/' />;
};

export default AdminProtectedRoute;
