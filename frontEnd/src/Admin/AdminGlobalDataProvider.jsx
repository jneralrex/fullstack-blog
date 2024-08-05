import React, { createContext, useState, useEffect } from 'react';

export const AdminGlobalDataContext = createContext();

export const AdminGlobalDataProvider = ({ children }) => {
    const [reloadPage, setReloadPage] = useState(false);
    const [loggedAdmin, setLoggedAdmin] = useState(() => {
        let adminLocalStorageData = localStorage.getItem('Blog_Admin');
        return adminLocalStorageData ? JSON.parse(adminLocalStorageData) : {};
    });

    useEffect(() => {
        localStorage.setItem('Blog_Admin', JSON.stringify(loggedAdmin));
    }, [loggedAdmin]);

    return (
        <AdminGlobalDataContext.Provider value={{ reloadPage, setReloadPage, loggedAdmin, setLoggedAdmin }}>
            {children}
        </AdminGlobalDataContext.Provider>
    );
};

export default AdminGlobalDataProvider;
