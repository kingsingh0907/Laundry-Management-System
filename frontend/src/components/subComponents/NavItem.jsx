import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = (props) => {
    return (
        <>
            <NavLink to={props.to} className="nav-item">
                <img src={props.src} alt="" />
                <li>{props.name}</li>
            </NavLink>
        </>
    )
}

export default NavItem;
