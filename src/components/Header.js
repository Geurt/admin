import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
    const [showMenuMobile, setShowMenuMobile] = useState(false)

    const toggleMenu = () => {
        setShowMenuMobile((prevState) => !prevState)
    }

    return (
        <div className="Header">
            <Link to="/" className="Header--logo">
                <h1>Admin</h1>
            </Link>
            <nav className={showMenuMobile ? "Header--nav" : "Header--nav hidden-mobile"}>
                <NavLink className="Header--navlink" to="/" exact>dashboard</NavLink>
                <NavLink className="Header--navlink inactive" to="/bookings">bookings</NavLink>
                <NavLink className="Header--navlink inactive" to="/invoices">invoices</NavLink>
                <NavLink className="Header--navlink inactive" to="/members">members</NavLink>
                <NavLink className="Header--navlink inactive" to="/events">events</NavLink>
            </nav>
            <button onClick={toggleMenu} className="Header--menu-toggle">
                {showMenuMobile ? '\u2012' : '+'}
            </button>
        </div>
    )
}

export default Header