import {createContext, useContext} from 'react';
import { useState } from 'react';

interface IAppContext{
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isLoading: boolean;
    setUser: (user: IUser | null) => void;
    user: IUser | null;
}

type TProps = {
    children: React.ReactNode;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({children}: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading] = useState<boolean>(false);

    return (
        <CurrentAppContext.Provider value={{isAuthenticated, setIsAuthenticated, isLoading,  setUser, user }}>
            {children}
        </CurrentAppContext.Provider>
    )
}

export const useCurrentAppContext = () => {
    const context = useContext(CurrentAppContext);
    if (!context) {
        throw new Error('useCurrentAppContext must be used within a AppContextProvider');
    }
    return context;
}