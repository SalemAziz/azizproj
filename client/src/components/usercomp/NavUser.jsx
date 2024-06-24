import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbPlayFootball } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import "./navuser.css"
import { PiSignOutBold } from "react-icons/pi";
import { signOut } from '../../redux/user/userSlice';




const NavUser = () => {
    const [active, setActive] = useState(false);

    const showNav = () => {
        setActive(true);
    };

    const removeNavbar = () => {
        setActive(false);
    };

    const dispatch = useDispatch();


    const { currentUser } = useSelector((state) => state.user);
    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/signout');
            dispatch(signOut())
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <section className='navBarSection'>
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/postpage" className="logo flex">
                        <h1><TbPlayFootball className="icon" />kawer </h1>
                    </Link>
                </div>
                <div className={`navBar ${active ? 'activeNavbar' : ''}`}>
                    <ul className="navLists flex">

                    {currentUser?.role === 'admin' && (
                            <li className="navItem">
                                <Link to="/mainad?tab=Posts" className="navLink">Admin</Link>
                            </li>
                        )}
                          {currentUser?.role === 'fieldowner' && (
                            <li className="navItem">
                                <Link to="/FieldReservation" className="navLink">FieldReservation</Link>
                            </li>
                        )}

                        <li className="navItem">
                            <Link to="/matchpage" className="navLink">Matches</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/postpage" className="navLink">Community</Link>
                        </li>
                     
                          
                        <li className="navItem">
                            <Link to="/Fields" className="navLink">Fields</Link>
                        </li>
                        <li className="navItem">
                                <Link to="/account" className="navLink">Profile</Link>
                            </li>
                        
                        <li className="navItem">

                        <Link className="profilepic" to='/account'>
                            {currentUser && (
                                <img className='r' src={currentUser.profilePicture} alt='profile' />
                            )}
                        </Link>
                        </li>

                        <li className="navItem">
                            <button onClick={handleSignOut} className="logoutbtn">  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div class="text">Logout</div></button>
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

export default NavUser;
