import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { SiteTheme } from "../App";

interface AboutProps {
    userInfo: any
}

const About: FunctionComponent<AboutProps> = ({ userInfo }) => {
    let theme = useContext(SiteTheme)
    return (
        <>
            <div className={`aboutColor container bgBlur text-center p-4 mt-5 ${theme}`}  >
                <h2 className="display-3 mb-4">ABOUT</h2>
                <p className="display-6">On this site you can view a variety of businesses. By clicking on the picture in each card you can see the extended details about the business.

                    If you connect to the site, you can mark cards as favorites and save them for repeated viewing.

                    If you log in as a business owner, you can post a new card by clicking on the + on the home page, as well as edit or delete the cards you previously posted.
                    We would be happy to hear suggestions for streamlining and improving the website at the email address rv8365@gmail.com</p>
                {userInfo.email == false &&
                    <Link to="/register">Click here to register for the site</Link>
                }

            </div>
        </>
    )
}

export default About;

/* bg - white bg - opacity - 50 */