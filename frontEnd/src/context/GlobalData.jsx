import React, { createContext, useState } from 'react';

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState("");
    const [reloadPage, setReloadPage] = useState(false);
    const [loggedUser, setLoggedUser] = useState(() => {
        let localStorageData = localStorage.getItem('Blog_User');
        if (localStorageData) {
            return JSON.parse(localStorageData);
        } else {
            return {};
        }
    });

    return (
        <GlobalDataContext.Provider value={{ isModalOpen, setIsModalOpen, reloadPage, setReloadPage, isLoginModalOpen, setIsLoginModalOpen, loggedUser, setLoggedUser }}>
            {children}
        </GlobalDataContext.Provider>
    );
};

export default GlobalDataProvider;
