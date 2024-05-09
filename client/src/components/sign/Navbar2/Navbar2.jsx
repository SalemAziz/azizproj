import React from 'react';
import { Link } from 'react-router-dom';
import { TbPlayFootball } from "react-icons/tb";
import './navbar2.css';
import { MdOutlineLogin } from "react-icons/md";





const Navbar2 = () => {
  return (
    <section className='navBarSection'>
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <h1><TbPlayFootball className="icon" />kawer </h1>
          </Link>
        </div>
        <div className="am" >
        <Link to="/" className="logo flex">
          <h1 className='yt'> leave <MdOutlineLogin className='ic' /></h1></Link> </div>
          
      </header>
    </section>
  );
};

export default Navbar2;
