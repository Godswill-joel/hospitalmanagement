import React, { useState, useRef } from 'react';
import { navbarStyles } from "../assets/dummyStyles";
import { User, Key, X, Menu } from "lucide-react";
import { SignedIn, SignedOut, SignIn, useClerk, UserButton } from "@clerk/clerk-react";
import { Link, useNavigate, useLocation, href } from 'react-router-dom';
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
    // const navRef = useRef(null);
    const clerk = useClerk();
    // const navigate = useNavigate();

    const navItem = [
        { label: "Home", href: "/" },
        { label: "Doctors", href: "/doctors" },
        { label: "Services", href: "/services" },
        { label: "Appointments", href: "/appointments" },
        { label: "Contact", href: "/contact" },
    ]

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
                            <div className={navbarStyles.logoTextContainer}>
                                <h1 className={navbarStyles.logoTitle}>
                                    MediCare
                                </h1>
                                <p className={navbarStyles.logoSubtitle}>
                                    Healthcare Solutions
                                </p>
                            </div>
                        </Link>

                        <div className={navbarStyles.desktopNav}>
                            <div className={navbarStyles.navItemsContainer}>
                                {navItem.map((items) => {
                                    const isActive = location.pathname === items.href;
                                    return (
                                        <Link key={items.href} to={items.href}
                                            className={`${navbarStyles.navItem} ${isActive ?
                                                navbarStyles.navItemActive :
                                                navbarStyles.navItemInactive
                                                }`}>
                                            {items.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        <div className={navbarStyles.rightContainer}>
                            <SignedOut>
                                <Link to='/doctor-admin/login' className={navbarStyles.doctorAdminButton}>
                                    <User className={navbarStyles.doctorAdminIcon} />
                                    <span className={navbarStyles.doctorAdminText}>
                                        Doctor admin
                                    </span>
                                </Link>
                                <button onClick={() => clerk.openSignIn()}
                                    className={navbarStyles.loginButton}>
                                    <Key className={navbarStyles.loginIcon} />
                                    Login
                                </button>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <button onClick={() => setIsOpen(!isOpen)} className={navbarStyles.mobileToggle}>
                                {isOpen ? (
                                    <X className={navbarStyles.toggleIcon} />
                                ) : (
                                    <Menu className={navbarStyles.toggleIcon} />
                                )}
                            </button>
                        </div>
                    </div>

                    {isOpen && (
                        <div className={navbarStyles.mobileMenu}>
                            {navItem.map((items, index) => {
                                const isActive = location.pathname === items.href;
                                return (
                                    <Link key={index} to={items.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`${navbarStyles.mobileMenuItem} ${isActive ?
                                            navbarStyles.mobileMenuItemActive :
                                            navbarStyles.mobileMenuItemInactive
                                            }`}>
                                        {items.label}
                                    </Link>
                                )
                            })}

                            <SignedOut >
                                <Link to='/doctor-admin/login' className={navbarStyles.mobileDoctorAdminButton}
                                    onClick={() => setIsOpen(false)}>
                                    Doctor Admin
                                </Link>
                                <div className={navbarStyles.mobileLoginContainer}>
                                    <button onClick={() => {
                                        setIsOpen(false);
                                        clerk.openSignIn()
                                    }} className={navbarStyles.mobileLoginButton}>
                                        Login
                                    </button>
                                </div>
                            </SignedOut>
                        </div>
                    )}
                </div>

                <style>{navbarStyles.animationStyles}</style>
            </nav>
        </>
    )
}