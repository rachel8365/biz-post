import { FunctionComponent, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";

interface FooterProps {
  userInfo: any
  setUserInfo: Function
}

const Footer: FunctionComponent<FooterProps> = ({ userInfo, setUserInfo }) => {
  let navigate = useNavigate();
  let theme = useContext(SiteTheme)
  return (
    <>
      <div className={`container-fluid min-vh-100 ${theme}`}>
        <footer className="fixed-bottom text-center p-1 mt-auto footer">
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center" onClick={() => navigate("/about")}>
              <i className="fa-solid fa-eject"></i>
              <p>About</p>
            </div>
            {userInfo.role == "regular" || userInfo.role == "business" || userInfo.role == "Admin" ? (
              <div className="d-flex flex-column align-items-center mx-5" onClick={() => navigate("/favourites")} >
                <i className="fa-solid fa-heart"></i>
                <p>Fevorites</p>
              </div>
            ) : (null)}

            {userInfo.role == "business" || userInfo.role == "Admin" ? (
              <div className="d-flex flex-column align-items-center" onClick={() => navigate("/my-cards")}>
                <i className="fa-regular fa-address-card"></i>
                <p>My- Cards</p>

              </div>

            ) : (null)}
          </div >
        </footer >
      </div>

    </>
  )
}

export default Footer;