import React from "react";
import "./popMessage.scss";
import logo from '../../assets/logosnj_1.png';
import {FaWindowClose} from 'react-icons/fa'
import {AiTwotoneLike} from 'react-icons/ai'
export const PopMessage = ({ text, closePopup }) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
        <div className="lines">
        </div>
        <div className="imgbx">
            <img src={logo} alt="" />
        </div>
        <div className="content-message">
        <div className="content-message-details">
            <h2>Message From : Tim Enjenime</h2>
            <p>Mohon Maaf pada kawan-kawan semua, Kami memasukan beberapa iklan untuk keberlangsungan website ini,
        jika teman-teman tidak masalah dengan itu, silahkan lanjutkan pencarian kawan-kawan</p>
        <p>klik icon mantap di bawah</p>
        <a><AiTwotoneLike size="50px"  onClick={closePopup}/></a>
        </div>
        </div>
     {/* <div className="logo-pop" style={{width:"100%", textAlign:"center"}}>
        <img src={logo} alt="" />
    </div>
     <h2 className="message">Message From : Tim Enjenime
      </h2>
      <br/>
      <h3 className="message">Mohon Maaf pada kawan-kawan semua, Kami memasukan beberapa iklan untuk keberlangsungan website ini,
        jika teman-teman tidak masalah dengan itu, silahkan lanjutkan pencarian kawan-kawan
      </h3>
      <button onClick={closePopup}></button> */}
     </div>
    </div>
  );
};