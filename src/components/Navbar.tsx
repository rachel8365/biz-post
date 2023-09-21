import { FunctionComponent, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";

interface NavbarProps {
  userInfo: any
  setUserInfo: Function
  darkMode: boolean
  setDarkMode: Function
}

const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo, darkMode, setDarkMode }) => {
  let theme = useContext(SiteTheme)
  let navigate = useNavigate()

  return (
    <>
      <nav className="navbar navbar-expand-lg" data-bs-theme={`${theme}`}
        data-db-theme={`${theme}`}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/cards" > <img src="/image/logo-1.png" alt="Logo" style={{ width: "170px", height: "70px", }} /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ${isDarkMode ? 'dark-mode' : ''}`}" id="navbarNav">
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/about">ABOUT</NavLink>

              {userInfo.role == "regular" || userInfo.role == "business" || userInfo.role == "Admin" ? (<>
                <NavLink className="nav-link" to="/cards">HOME</NavLink>
                <NavLink className="nav-link" to="/favourites">fAV-CARD</NavLink>
              </>) : (null)}

              {userInfo.role == "business" || userInfo.role == "Admin" ? (
                <NavLink className="nav-link" to="/my-cards">MY-CARD</NavLink>
              ) : (null)}

              {userInfo.role == "Admin" && (
                <NavLink className="nav-link" to="/pageNotFound">SANDBOX</NavLink>
              )}

              {userInfo.email == false && <>
                <NavLink className="nav-link" to="/register">SIGNUP</NavLink>
                <NavLink className="nav-link" to="/login">LOGIN</NavLink>
              </>}
              <div onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem("darkMode", JSON.stringify(!darkMode));
              }} >
                {darkMode ? (< i className="fa-solid fa-moon fa-xl " ></i >) : (<i className="fa-solid fa-sun fa-xl" ></i>)}
              </div>
              {userInfo.email && (
                <>
                  <div>
                    <img src="/image/user.png" alt="user" style={{ width: "50px", height: "50px" }} onClick={() => {
                      alert("Click OK if you want to logout")
                      sessionStorage.removeItem("userInfo")
                      sessionStorage.removeItem("token")
                      setUserInfo({ email: false, role: false })
                      navigate("/cards")
                    }} />
                  </div>
                </>
              )}



            </div>
          </div>
        </div >
      </nav >
    </>
  )
}

export default Navbar;