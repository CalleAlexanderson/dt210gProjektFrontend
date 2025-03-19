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

// respons från backend på account
export interface AccountResponse {
    user: User,
    accountCreated: boolean
}

// används för att skapa LoginContext
export interface LoginContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    registerAccount: (credentials: LoginCredentials) => Promise<void>;
    checkJwt: () => Promise<boolean>;
}