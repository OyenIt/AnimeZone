import React from 'react';
import { AiOutlineMail,AiOutlineFacebook,AiOutlineInstagram,AiOutlineYoutube} from "react-icons/ai";
import {FaTwitterSquare} from "react-icons/fa";
import bg from '../assets/footer-bg.jpg';
export const Contact_Us = () => {
  return (
    <>
        <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
            <div className="mb-3 movie-content container">
                <div className="movie-content__info">
                      <h3>Contact Us</h3>
                      <p>
                        
                        <AiOutlineFacebook/> <a href='https://web.facebook.com/enje.nime/'>Facebook  : Enje Nime</a> <br/>
                        <AiOutlineInstagram/> <a href='https://www.instagram.com/enje.nime/'>Instagram : enje.nime</a> <br/>
                        <FaTwitterSquare/> <a href='https://twitter.com/Enjenime'>Twitter   : @enjenime</a> <br/>
                        <AiOutlineYoutube/> <a href=''>Youtube   : enjenime</a> <br/>
                        <AiOutlineMail/> <a href="mailto:enjenime@gmail.com">Email     : enjenime@gmail.com</a> <br/>
                        Jika teman-teman ada kritik dan saran, bisa menghubungi kami via sosmed di atas.<br/>
                        untuk pemasangan iklan bisa menghubngi kami via email yang terdapat diatas.
                      </p>
                </div>
            </div>
    </>
  )
}
export default Contact_Us