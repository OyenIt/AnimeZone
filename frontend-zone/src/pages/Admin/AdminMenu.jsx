import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './AdminMenu.scss';
import bg from '../../assets/footer-bg.jpg';
import background_video from '../../assets/backgroun_video_anime.mp4';


const AdminMenu = () => {
  const { secret} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(secret !== undefined){
      if (secret !== "koderahasia") {
        navigate('/')
      }
    }else{
      navigate('/')
    }
  }, [])
  return (
    <>
    <section id='main
'>
    <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
    
    <div className="mb-6 movie-content">
    <video muted autoPlay loop controls className='background-video-menu' src={background_video}>
          {/* <source  type="video/mp4"/> */}
        </video>
        <div className="movie-content__info1">
            <h1 >MOVIE</h1>
            <div className="genres">
              <Link to="/basecamp/add_movie/koderahasia"> <button className='btn-outline' > ADD MOVIE </button></Link>
              {/* <Link to="/basecamp/update/series/koderahasia"> <button classNamem 'btn-outline' > Update & Delete</button></Link> */}
            </div>
            <div className="genres">
            <Link to="/basecamp/ud_movie/koderahasia"> <button className='btn-outline' > Update & Delete</button></Link>
            </div>
            <br/>
            <h1>SERIES ANIME</h1>
            <div className="genres">
            <Link to="/basecamp/add_anime/koderahasia"> <button className='btn-outline' > ADD ANIME </button></Link>
            </div>
            <div className="genres">
            <Link to="/basecamp/ud_anime/koderahasia"> <button className='btn-outline' > Update & Delete</button></Link>
            </div>
            <br/>
            <h1>SUB SERIES ANIME</h1>
            <div className="genres">
            <Link to="/basecamp/add_sub_anime/koderahasia"> <button className='btn-outline' > ADD SUB ANIME </button></Link>
            </div>
            <div className="genres">
            <Link to="/basecamp/ud_subanime/koderahasia"> <button className='btn-outline' > Update & Delete</button></Link>
            </div>
            
        </div>
    </div>
    </section>
    </>
  )
}

export default AdminMenu