import React, { useContext, useEffect, useState } from 'react'
import NavItem from './subComponents/NavItem'
import { NavLink } from 'react-router-dom'
import logo from "../images/logo2.png"
import contactMail from "../images/contact-mail.png"
import dashboard from "../images/dashboard.png"
import register from "../images/register.png"
import details from "../images/details.png"
import homeIcon from "../images/home-icon.png"
import logout from "../images/logout.png"
import login from "../images/login.png"
import "../css/navbar.css"
import { UserContext } from "../App"

const Navbar = () => {

    const { state, dispatch } = useContext(UserContext);

    const [ham, setHam] = useState(true);

    const RenderMenu = () => {
        if (state === "user") {
            return (
                <>
                    <NavItem to="/" name="Home" src={homeIcon} />
                    <NavItem to="/about" name="About" src={details} />
                    <NavItem to="/dashboard" name="Dashboard" src={dashboard} />
                    <NavItem to="/Complaint" name="Complaint" src={contactMail} />
                    <NavItem to="/logout" name="Logout" src={logout} />

                </>
            )
            } else if (state === "staff") {
                return (
                    <>
                        <NavItem to="/about" name="About" src={details} />
                        <NavItem to="/staff/dashboard" name="Dashbboard" src={dashboard} />
                        <NavItem to="/staffComplaints" name="Complaints" src={contactMail} />
                        <NavItem to="/logout" name="Logout" src={logout} />

                    </>
                )
        }
        else {
            return (
                <>
                    <NavItem to="/" name="Home" src={homeIcon} />
                    <NavItem to="/login" name="Login" src={login} />
                    <NavItem to="/register" name="Register" src={register} />
                </>
            )
        }
    }

    const handleClick = () => {
        const menu = document.getElementsByClassName("sidemenu");
        if (ham) {
            setHam(false)
            menu[0].style.display = "flex";
            // complaintForm[0].style.display = "none"; // Add this line
        } else {
            setHam(true)
            menu[0].style.display = "none";
            // complaintForm[0].style.display = "flex"; // Add this line
        }
    }

    return (
        <>
            <div className='navbar-container'  >

                <div className="nav-items">
                    <RenderMenu />
                </div>

            </div>
            <div className="hamburger-button" id="hamburger" onClick={handleClick}>
                <div className="sidemenu" style={{ display: "none" }}>

                    <div className="menu">

                        <RenderMenu />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
