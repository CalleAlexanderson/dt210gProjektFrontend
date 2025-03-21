import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { LoginContextType, LoginResponse, AccountResponse, LoginCredentials, User } from "../types/login.types";
import { data } from "react-router-dom";

const LoginContext = createContext<LoginContextType | null>(null);

interface LoginProviderProps {
    children: ReactNode
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // logga in
    const login = async (credentials: LoginCredentials) => {

        try {
            const response = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                body: JSON.stringify(credentials)
            })


            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as LoginResponse;

            // kollar om inloggningen funkade
            if (!data.loggedIn) {
                throw new Error;
            }

            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', data.user._id);
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    }

    // skapa konto
    const registerAccount = async (credentials: LoginCredentials) => {

        try {
            const response = await fetch("http://127.0.0.1:3000/account", {
                method: "POST",
                body: JSON.stringify(credentials)
            })


            if (!response.ok) {
                throw new Error;
            }

            const data = await response.json() as AccountResponse;

            // kollar om inloggningen funkade
            if (!data.accountCreated) {
                throw new Error;
            }
        } catch (error) {
            throw error;
        }
    }

    // logga ut
    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setUser(null);
    }

    // 
    const checkJwt = async () => {
        const jwt = localStorage.getItem("jwt")
        const storedUser = localStorage.getItem("user")

        if (!jwt) {
            return false;
        }

        let key: string = "Bearer " + jwt;
        try {
            const response = await fetch("http://127.0.0.1:3000/verify", {
                method: "POST",
                headers: {
                    'authorization': key
                },
                body: JSON.stringify({ id: storedUser })
            })
            // FIXA SÅ ATT OM 401 KOMMER TILLBAKA RETURN FALSE
            console.log(response);
            
            if (response.ok) {
                const data = await response.json() as any;
                setUser(data);
            }

            if (response.status == 401) {
                logout();
                return false;
            }
            
        } catch (error) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            setUser(null)
            return false;
        }
        return true;
    }

    useEffect(() => {
        checkJwt();
    }, [])

    return (
        <LoginContext.Provider value={{ user, login, logout, registerAccount, checkJwt }}>
            {
                children
            }
        </LoginContext.Provider>
    )
}



// låter andra filer använda LoginContext
export const useLogin = (): LoginContextType => {
    const context = useContext(LoginContext);

    if (!context) {
        throw new Error("useLogin måste har LoginProvider");
    }

    return context;
}