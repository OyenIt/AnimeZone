import React from 'react';

import './Footer.scss';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer_bg1.png';
import logo from '../../assets/logosnj_1.png';
import { AiOutlineMail,AiOutlineFacebook,AiOutlineInstagram,AiOutlineYoutube} from "react-icons/ai";
import {FaTwitterSquare} from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/">ENJENIME</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Home</Link>
                        <Link to="/contactus">Contact us</Link>
                        <Link to="/privacypolicy">Privacy Policy</Link>
                        <Link to="/aboutus">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/Movie">Movie</Link>
                        <Link to="/Anime">Anime</Link>
                        {/* <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link> */}
                    </div>
                    <div className="footer__content__menu">
                    
                    <a href="https://web.facebook.com/enje.nime/"><AiOutlineFacebook /> Enje Nime</a>
                        
                    <a href="https://www.instagram.com/enje.nime/"><AiOutlineInstagram /> enje.nime</a>
                    <a href="https://twitter.com/Enjenime"><FaTwitterSquare/> @enjenime</a>
                    <a href="#"><AiOutlineYoutube /> enjenime</a>
                        
                    
                        {/* <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link> */}
                    </div>
                </div>
                
            </div>
            <div className='saran'>
            <h4>Kritik Saran : </h4>
            <a href="mailto:enjenime@gmail.com"><h4><AiOutlineMail /> enjenime@gmail.com </h4></a>
            <br></br>
            <br></br>
            </div>
            {/* <a href="mailto:feedback@geeksforgeeks.org"><AiOutlineMail /> feedback@geeksforgeeks.org</a> */}
            
        </div>
    );
}

export default Footer;
