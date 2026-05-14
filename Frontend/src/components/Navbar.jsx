import React, { useState, useRef } from 'react';
import { navbarStyles } from "../assets/dummyStyles";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";


const STORAGE_KEY = "doctorToken_v1";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
        try {
            return Boolean(localStorage.getItem(STORAGE_KEY));
        } catch {
            return false;
        }
    });
    const location = useLocation();
    const navRef = useRef(null);
    const clerk = useClerk();
    const navigate = useNavigate();

    return (
        <>
            <div className={navbarStyles.navbarBorder} >
            </div>
            <nav className={`${navbarStyles.navbarContainer} ${showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
                }`}>
                <div className={navbarStyles.navbarContent}>
                    <div className={navbarStyles.flexContainer}>
                        {/* logo */}
                        <Link to='/' className={navbarStyles.logoLink}>
                            <div className={navbarStyles.logoContainer}>
                                <div className={navbarStyles.logoImageWrapper}>
                                    <img src={logo} alt="Logo" className={navbarStyles.logoImage} /> 
                                </div>
                            </div>

                        </Link>
                    </div>
                </div>

            </nav>
        </>
    )
}