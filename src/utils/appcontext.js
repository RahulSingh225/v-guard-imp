import React, { createContext, useContext, useState } from 'react';
export const AppContext = React.createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        fullData: {},
        BankDetailsAndNominee: {},
        // Add more objects as needed
    });

    return (
        <AppContext.Provider value={{ data, setData }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook to use the context
export const useDataContext = () => {
    return useContext(AppContext);
};