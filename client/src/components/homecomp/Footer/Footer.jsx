import React from 'react';
import './footer.css';
import { FaSquareFacebook } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { PiCopyrightLight } from "react-icons/pi";

const Footer = () => {
  return (
    <section id="footer">
      <div className="main-footer">
        <div className="logoinfo" data-aos="fade-up">
          <h2>Created by</h2>
          <p><PiCopyrightLight className='mpm'/>Mouhamed Aziz salem<PiCopyrightLight className='mpm'/></p>

          <div className="contact-details">
            <h1>Contact Us</h1>
            <ul>
              <li>
                <div className="fa fa-phone"></div><a href="tel:+216 23543799">+216 23543799</a>
              </li>
              <li>
                <div className="fa fa-envelope"></div><a href="mailto:salem.mouhamedaziz@esprit.tn">salem.mouhamedaziz@esprit.tn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="com" data-aos="fade-up">
          <h1>About</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="info" data-aos="fade-up">
          <h1>Social Media</h1>
          <div className="sociallogos">
            <div className="logobox">
              <a href="https://www.facebook.com/" className="fa fa-facebook"><FaSquareFacebook /></a>
              <a href="https://www.instagram.com/" className="fa fa-instagram"><FiInstagram /></a>
              <a href="https://twitter.com/" className="fa fa-linkedin"><FaTwitter /></a>
              <a href="https://www.youtube.com/" className="fa fa-youtube-play"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
