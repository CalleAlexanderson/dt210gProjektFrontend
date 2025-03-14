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
            navigate("/admin");
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
        const validationErrors = validateForm(loginForm);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            accessBackend();
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
            navigate("/admin")
        } catch (error) {
            setLoginForm({
                username: "",
                password: "",
            });
            setError("Inloggning misslyckades. Kontrollera Användarnamn och Lösenord")
        }
    };

    // anropar registerAccount från LoginContext
    const accountFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(accountForm);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            accessBackendacc();
        }
        setError('');
    }

    const accessBackendacc = async () => {
        try {
            const credentials: LoginCredentials = {
                username: accountForm.username,
                password: accountForm.password
            }
            await registerAccount(credentials);

            // ändra sidan till login mode
        } catch (error) {
            setAccountForm({
                username: "",
                password: "",
            });
            setError("Kunde inte skapa konto. Kontrollera Användarnamn och Lösenord")
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
            <div className="account-page-main-div">
                <div id="register-page-login-div" className="account-second-div">
                    <div>
                        <h2>Välkommen tillbaka!</h2>
                        <p>För att se ditt konto ​​vänligen logga in med din personliga information</p>
                        {/* <a asp-page="./login" asp-route-returnUrl="@Model.ReturnUrl"><button className="account-a-btn">logga
                            in</button></a> */}
                        <button></button>
                    </div>
                </div>
                <div id="register-page-register-div" className="account-first-div">
                    <section>
                        <form id="registerForm" onSubmit={accountFormSubmit}>
                            <h1>Skapa konto</h1>
                            {/* <div asp-validation-summary="ModelOnly" className="error-alert" role="alert"></div> */}
                            <div>
                                {/* <input asp-for="Input.Email" className="account-inputs" autocomplete="username" aria-required="true"
                                    placeholder="Email" />
                                <label asp-for="Input.Email" className="visually-hidden">Email</label>
                                <span asp-validation-for="Input.Email"></span> */}
                            </div>
                            <div>
                                {/* <input asp-for="Input.Password" className="account-inputs" autocomplete="new-password"
                                    aria-required="true" placeholder="Password" />
                                <label asp-for="Input.Password" className="visually-hidden">Password</label>
                                <span asp-validation-for="Input.Password"></span> */}
                            </div>
                            <div>
                                {/* <input asp-for="Input.ConfirmPassword" className="account-inputs" autocomplete="new-password"
                                    aria-required="true" placeholder="Confirm password" />
                                <label asp-for="Input.ConfirmPassword" className="visually-hidden">Confirm Password</label>
                                <span asp-validation-for="Input.ConfirmPassword"></span> */}
                            </div>
                            {/* <button id="registerSubmit" className="account-submit-btn" type="submit">Skapa konto</button> */}

                            <div>
                                <label htmlFor="username">Användarnamn</label>
                                <input type="text" id="username" className="account-inputs" autoComplete="off" value={accountForm.username} onChange={(event) => { setAccountForm({ ...accountForm, username: event.target.value }); }} />
                                {errors.username && <span className="form-error">{errors.username}</span>}
                            </div>

                            <div>
                                <label htmlFor="password">Lösenord</label>
                                <input type="password" id="password" className="account-inputs" value={accountForm.password} onChange={(event) => { setAccountForm({ ...accountForm, password: event.target.value }); }} />
                                {errors.password && <span className="form-error">{errors.password}</span>}
                            </div>
                            <button id="login-submit" className="account-submit-btn" type="submit">Log in</button>
                        </form>
                    </section>
                </div>
            </div>



            <div className="account-page-main-div">
                <div id="login-page-login-div" className="account-first-div">
                    <section>
                        <form id="account" onSubmit={loginFormSubmit}>
                            <h1>Logga in</h1>
                            <div>
                                <label htmlFor="username">Användarnamn</label>
                                <input type="text" id="username" className="account-inputs" autoComplete="off" value={loginForm.username} onChange={(event) => { setLoginForm({ ...loginForm, username: event.target.value }); }} />
                                {errors.username && <span className="form-error">{errors.username}</span>}
                            </div>

                            <div>
                                <label htmlFor="password">Lösenord</label>
                                <input type="password" id="password" className="account-inputs" value={loginForm.password} onChange={(event) => { setLoginForm({ ...loginForm, password: event.target.value }); }} />
                                {errors.password && <span className="form-error">{errors.password}</span>}
                            </div>
                            <button id="login-submit" className="account-submit-btn" type="submit">Log in</button>
                        </form>
                    </section>
                </div>
                <div id="login-page-register-div" className="account-second-div">
                    <div>
                        <h2>Redo att skapa din egna blogg?</h2>
                        <p>Fyll i dina uppgifter och börja din resa med oss</p>
                        {/* <a asp-page="./Register" asp-route-returnUrl="@Model.ReturnUrl"><button className="account-a-btn">Skapa
                            konto</button></a> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage