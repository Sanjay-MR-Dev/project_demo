import React from "react";
import { useContext, createContext, useState } from "react";

type LoadingProps = {
    loading: boolean;
    setLoading: (value: boolean) => void;
};

const LoadingContext = createContext<LoadingProps>({
    loading: false,
    setLoading: () => { },
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> =
    ({ children }) => {
        const [loading, setLoading] = useState(false);


        return (
            <LoadingContext.Provider value={{ loading, setLoading }}>
                {children}
            </LoadingContext.Provider>
        )
    }