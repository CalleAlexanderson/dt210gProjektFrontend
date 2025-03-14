// användaren
export interface User {
    _id: string,
    username: string,
    role: string
}

// det som skickas med i login
export interface LoginCredentials {
    username?: string,
    password?: string
}

// respons från backend på login
export interface LoginResponse {
    user: User,
    token: string,
    loggedIn: boolean
}

// används för att skapa LoginContext
export interface LoginContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    checkJwt: () => Promise<void>;
}