import { NavLink } from "react-router-dom"
import './css/Header.css'
import { useState } from "react";
import { useLogin } from "../context/LoginContext";
import logo from '../assets/logo (1).png'

const Header = () => {
  const { user, logout } = useLogin();
  const [menuSpanClass, setMenuSpanClass] = useState('nav-menu-span');
  const [navDivClass, setNavDivClass] = useState('nav-hidden');

  const toggleNav = () => {
    if (menuSpanClass == "nav-menu-span") {
      setMenuSpanClass('nav-menu-span open');
      setNavDivClass('');
    } else {
      setMenuSpanClass('nav-menu-span');
      setNavDivClass('nav-hidden');
    }

  }


  return (
    <header>
      <nav>
        <div className="logo-nav-div">
              <NavLink to="/" className="logo"> <img src={logo} alt="Tillbaks till startsida" /> </NavLink>
          <div id="nav-div" className={navDivClass}>
            <ul className="nav-ul">
              <li><NavLink to="/" className="nav-link">Startsida</NavLink></li>
              <li><NavLink to="/books" className="nav-link">Böcker</NavLink></li>
              {
                !user ? <li><NavLink to="/login" className="nav-link">Logga in</NavLink></li> : <li onClick={logout} ><span className="nav-link">Logga ut</span></li>
              }
            </ul>
          </div>
        </div>
        <button type="button" onClick={toggleNav} id="nav-toggle-btn" aria-label="Toggle navigation">
          <span className={menuSpanClass}></span>
          <span className={menuSpanClass}></span>
          <span className={menuSpanClass}></span>
        </button>

      </nav>
    </header >
  )
}

export default Header