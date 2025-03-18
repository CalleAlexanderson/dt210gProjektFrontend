import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import './css/loginPage.css'
import { LoginCredentials } from "../types/login.types";

const LoginPage = () => {

    const [error, setError] = useState('');
    const { login, registerAccount, user } = useLogin();
    const navigate = useNavigate();

    // kollar om man är inloggad (user finns)
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user])

    const [loginForm, setLoginForm] = useState<LoginCredentials>({
        username: "",
        password: "",
    });

    const [accountForm, setAccountForm] = useState<LoginCredentials>({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState<LoginCredentials>({});
    const [formTitle, setFormTitle] = useState("Logga in")
    const [formChangeTitle, setFormChangeTitle] = useState("Redo att skapa din egna blogg?")
    const [formChangeText, setFormChangeText] = useState("Fyll i dina uppgifter och börja din resa med oss Redo att skapa din egna blogg?")
    const [formChangeButton, setFormChangeButton] = useState("Skapa konto")
    const [secondDivClass, setSecondDivClass] = useState("account-second-div")
    const [firstDivClass, setFirstDivClass] = useState("account-first-div")

    const changeForm = () => {
        if (formChangeButton == "Skapa konto") {
            setFormTitle("Skapa konto")
            setFormChangeButton("Logga in")
            setFormChangeTitle("Välkommen tillbaka!")
            setFormChangeText("För att se ditt konto ​​vänligen logga in med din personliga information")
            setFirstDivClass("account-first-div create")
            setSecondDivClass("account-second-div create")
            
        } else {
            setFormTitle("Logga in")
            setFormChangeButton("Skapa konto")
            setFormChangeTitle("Redo att skapa din egna blogg?")
            setFormChangeText("Fyll i dina uppgifter och börja din resa med oss Redo att skapa din egna blogg?")
            setFirstDivClass("account-first-div")
            setSecondDivClass("account-second-div")
        }
    }

    // validerar formuläret
    const validateForm = (data: LoginCredentials) => {
        
        const validationErrors: LoginCredentials = {};

        if (!data.username) {
            validationErrors.username = "Fyll i användarnamn"
        } else {
            if (data.username.length <= 3) {
                validationErrors.username = "Användarnman måste vara längre än 3 tecken"
            }
        }

        if (!data.password) {
            validationErrors.password = "Fyll i lösenord"
        } else {
            if (data.password.length <= 5) {
                validationErrors.username = "Lösenord måste vara längre än 5 tecken"
            }
        }


        return validationErrors;
    }

    // anropar login från LoginContext
    const loginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let validationErrors;
        console.log(loginForm);
        
        validationErrors = validateForm(loginForm);
        

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            
            if (formTitle == "Skapa konto") {
                accessBackendacc();
                
            } else {
                accessBackend()
            }
        }
        setError('');
    }

    // loggar in användaren genom backend
    const accessBackend = async () => {
        try {
            const credentials: LoginCredentials = {
                username: loginForm.username,
                password: loginForm.password
            }
            await login(credentials);
            navigate("/")
        } catch (error) {
            console.log(error);
            
            setLoginForm({
                username: "",
                password: "",
            });
            setError("Inloggning misslyckades. Kontrollera Användarnamn och Lösenord")
        }
    };

    const accessBackendacc = async () => {
        try {
            const credentials: LoginCredentials = {
                username: loginForm.username,
                password: loginForm.password
            }
            await registerAccount(credentials);

            // ändrar till login
            setLoginForm({
                username: "",
                password: "",
            });
            changeForm();
        } catch (error) {
            console.log(error);
            
            setLoginForm({
                username: "",
                password: "",
            });
            setError("Kunde inte skapa konto. Kontrollera Användarnamn och Lösenord")
        }
    };

    return (
        <div>
            <div className="account-page-main-div">
                <div id="login-page-login-div" className={firstDivClass}>
                    <section>
                        <form id="account" onSubmit={loginFormSubmit}>
                            <h1>{formTitle}</h1>
                            {error && <p className="form-error">{error}</p>}
                            <div>
                                <label htmlFor="username" className="visually-hidden">Användarnamn</label>
                                <input type="text" id="username" className="account-inputs" placeholder="Användarnamn" autoComplete="off" value={loginForm.username} onChange={(event) => { setLoginForm({ ...loginForm, username: event.target.value }); }} />
                                {errors.username && <span className="form-error">{errors.username}</span>}
                            </div>

                            <div>
                                <label htmlFor="password" className="visually-hidden">Lösenord</label>
                                <input type="password" id="password" className="account-inputs" placeholder="Lösenord" value={loginForm.password} onChange={(event) => { setLoginForm({ ...loginForm, password: event.target.value }); }} />
                                {errors.password && <span className="form-error">{errors.password}</span>}
                            </div>
                            <button id="login-submit" className="account-submit-btn" type="submit">{formTitle}</button>
                        </form>
                    </section>
                </div>
                <div id="login-page-register-div" className={secondDivClass}>
                    <div>
                        <h2>{formChangeTitle}</h2>
                        <p>{formChangeText}</p>
                        <button onClick={changeForm} className="account-a-btn">{formChangeButton}</button>
                        {/* <a asp-page="./Register" asp-route-returnUrl="@Model.ReturnUrl"><button className="account-a-btn">Skapa
                            konto</button></a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage