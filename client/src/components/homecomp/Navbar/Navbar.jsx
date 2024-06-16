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
                        <Link to="/" className="navLink" > Home</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/demande" className="navLink">collab</Link>
                        </li>
                        <li className="navItem">
                            <h1 className="navLink" >About us</h1>
                        </li>
                        <li className="navItem">
                            <h1 className="navLink" onClick={scrollToFooter}>Contact us</h1>
                        </li>
                        <li className="navItem">
                        <Link to="/sign-in">
                        <button className='btns'>
                             <div class="sign"><svg viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path></svg></div>
  
  <div class="text">Login</div>
                        </button>
                        </Link>
                        </li>
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
