import { NavLink } from "react-router-dom"
import './css/Header.css'
import { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";

const Header = () => {
  const { user, logout } = useLogin();
  const [lockedRoute, setLockedRoute] = useState('locked');
  const [menuSpanClass, setMenuSpanClass] = useState('nav-menu-span');
  const [navDivClass, setNavDivClass] = useState('nav-hidden');

  useEffect(() => {
    if (user) {
      setLockedRoute('');
    } else {
      setLockedRoute('locked');
    }
  }, [user])

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
    // <header>
    //   <nav>
    //     <ul>
    //       <li><NavLink to="/">Startsida</NavLink></li>
    //       <li><NavLink to="/posts">Blogginlägg</NavLink></li>
    //       <li><NavLink className={lockedRoute} to="/admin">Admin</NavLink></li>
    //     </ul>
    //   </nav>
    // </header>
    <header>
      <nav>
        <div className="logo-nav-div">
          {/* <a asp-area="" asp-controller="Home" asp-action="Index" className="logo"><img src="~/logo.png"
            asp-append-version="true"></a> */}
          <div id="nav-div" className={navDivClass}>
            <ul className="nav-ul">
              <li><NavLink to="/" className="nav-link">Startsida</NavLink></li>
              <li><NavLink to="/books" className="nav-link">Böcker</NavLink></li>
              {
                !user ? <li><NavLink to="/login" className="nav-link">login</NavLink></li> : <li><button className="logout-btn" onClick={logout}>Logga ut</button></li>
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