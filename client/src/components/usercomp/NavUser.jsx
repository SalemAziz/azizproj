import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbPlayFootball } from "react-icons/tb";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { useSelector , useDispatch} from 'react-redux';
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
                        <li className="navItem">
                            <Link to="/Fields" className="navLink"></Link>
                        </li>
                        <li className="navItem">
                            <Link to="/postpage" className="navLink">Posts</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/matchpage" className="navLink">Matchs</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/matchpage" className="navLink">Addfields</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/Fields" className="navLink">Fields</Link>
                        </li>
                        <Link className="profilepic" to='/profile'>
                            {currentUser && (
                                <img className='r' src={currentUser.profilePicture} alt='profile' />
                            )}
                        </Link>
                        <li className="navItem">
                            <span onClick={handleSignOut}  className="navLink"><PiSignOutBold className='logoutico'/></span>
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
