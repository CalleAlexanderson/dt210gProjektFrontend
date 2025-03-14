import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import './css/loginPage.css'
import { LoginCredentials } from "../types/login.types";

const LoginPage = () => {

    const [error, setError] = useState('');
    const {login, user} = useLogin();
    const navigate = useNavigate();

    // kollar om man är inloggad (user finns)
    useEffect(() =>{
        if (user) {
            navigate("/admin");
        }
    }, [user])

    const [loginForm, setLoginForm] = useState<LoginCredentials>({
            username: "",
            password: "",
        });
    
        const [errors, setErrors] = useState<LoginCredentials>({});
    
        // validerar formuläret
        const validateForm = (data: LoginCredentials) => {
            const validationErrors: LoginCredentials = {};
    
            if (!data.username) {
                validationErrors.username = "Fyll i användarnamn"
            } 
    
            if (!data.password) {
                validationErrors.password = "Fyll i lösenord"
            } 
    
            return validationErrors;
        }

    // anropar login från LoginContext
    const loginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(loginForm);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            accessBackend();
        }
        setError('');
    }

    // Uppdaterar todos i databasen genom api
    const accessBackend = async () => {
        try {
            const credentials: LoginCredentials = {
                username: loginForm.username,
                password: loginForm.password
            }
            await login(credentials);
            navigate("/admin")
        } catch (error) {
            setLoginForm({
                username: "",
                password: "",
            });
            setError("Inloggning misslyckades. Kontrollera Användarnamn och Lösenord")
        }
    };

    return (
        <div>
            <h1>Logga in</h1>
            <form onSubmit={loginFormSubmit}>
                

                <div>
                    <label htmlFor="username">Användarnamn</label>
                    <input type="text" id="username" autoComplete="off" value={loginForm.username} onChange={(event) => { setLoginForm({ ...loginForm, username: event.target.value }); }} />
                    {errors.username && <span className="form-error">{errors.username}</span>}
                </div>

                <div>
                    <label htmlFor="password">Lösenord</label>
                    <input type="password" id="password" value={loginForm.password} onChange={(event) => { setLoginForm({ ...loginForm, password: event.target.value }); }} />
                    {errors.password && <span className="form-error">{errors.password}</span>}
                </div>

                <input type="submit" value="Logga in" />
                {
                    error && (
                        <div className="error-div">
                            <p>{error}</p>
                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default LoginPage