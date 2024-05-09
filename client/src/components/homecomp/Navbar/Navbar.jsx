import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { TbPlayFootball } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
    const [active, setActive] = useState(false);

    const showNav = () => {
        setActive(true);
    };

    const removeNavbar = () => {
        setActive(false);
    };

    const scrollToFooter = () => {
        const footer = document.getElementById('footer');
        footer.scrollIntoView({ behavior: 'smooth' });
        setActive(false); // Close the navbar after scrolling
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
        setActive(false); // Close the navbar after scrolling
    };

    return (
        <section className='navBarSection'>
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <h1><TbPlayFootball className="icon" />kawer </h1>
                    </Link>
                </div>
                <div className={`navBar ${active ? 'activeNavbar' : ''}`}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <h1 className="navLink" onClick={scrollToTop}> Home</h1>
                        </li>
                        <li className="navItem">
                            <Link to="/Fields" className="navLink">Fields</Link>
                        </li>
                        <li className="navItem">
                            <h1 className="navLink" onClick={scrollToFooter}>About us</h1>
                        </li>
                        <li className="navItem">
                            <h1 className="navLink" onClick={scrollToFooter}>Contact us</h1>
                        </li>
                        <button className='btn'>
                            <Link to="/Login"><FaUser className='ico'/>&nbsp;&nbsp;Login</Link>
                        </button>
                    </ul>
                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>
                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className='icon' />
                </div>
            </header>
        </section>
    );
};

export default Navbar;
