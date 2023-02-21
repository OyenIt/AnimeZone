import  React from 'react';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './AdminMenu.scss';
import bg from '../../assets/footer-bg.jpg';
import background_video from '../../assets/backgroun_video_anime.mp4';
import axios from "axios";

const AdminMenu = () => {
  const [My_Friends, setMy_friends] = useState(false)
  const [message, setMessage] = useState('');
  useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/basecamp'
            setMy_friends(false)
        }
        else{
         (async () => {
           try {
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token')
            axios.get('http://127.0.0.1:8000/home/',{headers:{'Content-Type': 'application/json'}}).then(res => {
              setMessage(res.data.message)
              
              // console.log(res.data.message)
            });
            setMy_friends(true)
          } catch (e) {
            setMy_friends(false)
            window.location.href = '/basecamp'
          }
         })()};
     }, []);
  return (
    <>
    {My_Friends ? <section id='main'>
    <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
    
    <div className="mb-6 movie-content">
      {/* <h1>WELCOME TO THE JUNGLE {message}</h1> */}
    <video muted autoPlay loop controls className='background-video-menu' src={background_video}>
          {/* <source  type="video/mp4"/> */}
        </video>
        <div className="movie-content__info1">
            <h1>{message}</h1>
           <br/>
            <h1 >MOVIE</h1>
            <div className="genres">
              <Link to="/basecamp/add_movie"> <button className='btn-outline' > ADD MOVIE </button></Link>
              
              {/* <Link to="/basecamp/update/series"> <button classNamem 'btn-outline' > Update & Delete</button></Link> */}
            </div>
            <div className="genres">
            <Link to="/basecamp/ud_movie"> <button className='btn-outline' > Update & Delete</button></Link>
            </div>
            <br/>
            <h1>SERIES ANIME</h1>
            <div className="genres">
            <Link to="/basecamp/add_anime"> <button className='btn-outline' > ADD ANIME </button></Link>
            </div>
            <div className="genres">
            <Link to="/basecamp/ud_anime"> <button className='btn-outline' > Update & Delete</button></Link>
            </div>
            <br/>
            <h1>SUB SERIES ANIME</h1>
            <div className="genres">
            <Link to="/basecamp/add_sub_anime"> <button className='btn-outline' > ADD SUB ANIME </button></Link>
            </div>
            <div className="genres">
            <Link to="/basecamp/ud_subanime"> <button className='btn-outline' > Update & Delete</button></Link>
            </div>
            <br/>
            <br/>
            <div className="genres" >
              <Link to="/basecamp/logout"><button className='btn-outline' style={{backgroundColor:"#fc2638"}} > Keluar </button></Link>
            </div>
            
        </div>
    </div>
    </section> : null}
    </>
  )
}

export default AdminMenu