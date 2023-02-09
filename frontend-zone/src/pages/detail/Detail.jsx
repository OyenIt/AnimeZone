import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './Detail.scss';
import ListEpisod from './ListEpisod';
import VideoList from './VideoList';
import { OutlineButton } from '../../components/button/Button';
import MovieList from '../../components/movie-list/MovieList';
import apiConfig from '../../api/apiConfig';
import { categorys} from '../../api/AZapi';
import background_video from '../../assets/backgroun_video_anime.mp4';

const Detail = () => {
    const { tipe, slug } = useParams();

    const [item, setItem] = useState([]);
    
    useEffect(() => {
        fetch(apiConfig.baseUrl+`${tipe}/${slug}`,{
            method:'GET',
            headers : {
              'Content-Type':'application/json',
            }
            
          }).then((res) => {
            if (res.ok) return res.json()
          }).then((res) => setItem(res)).catch((err) => console.log(err));
      }, [])
    //   const episode_anime = e => {
        
    //     for (let index = 0; index < 50; index++) {
    //         return <li className="link-download">1</li>
            
    //     }
    //   }
    const Test = (x) => {
        return (
            <li className="link-download">1</li>
        );
      }
    return (
        <>
        {item.map((items,ky) => 
                <>
                <div className="banner" style={{backgroundImage: `url(${items.backdrop_path})`}}></div>
                <div className="mb-1 movie-content container">
                {/* <div className="movie-content__poster">
                        <div className="movie-content__poster__img" style={{backgroundImage: `url(${items.poster_path})`}}></div>
                    </div> */}
                    <div className="movie-content__info">
                        <span className='info'>{items.title || items.series}</span>
                        <div className='show-video-eps'>
                            <video muted autoPlay loop controls className='background-video' src={background_video}>
                            </video>
                            <div className='scroll-episode'>
                            <span className='info'>EPISODE</span>
                                <ul className='show-episode'>
                                { Array.from(Array(60)).map(el => <Test />) }
                                    
                                </ul>
                                
                            </div>
                        </div>
                        <ul className='group-link-download'>
                            <li className="link-download"><span >GOOGLE DRIVE</span></li>
                            <li className="link-download"><span >GOOGLE DRIVE</span></li>
                            <li className="link-download"><span >GOOGLE DRIVE</span></li>
                            <li className="link-download"><span >GOOGLE DRIVE</span></li>
                            <li className="link-download"><span >GOOGLE DRIVE</span></li>
                        </ul>
                        <br/>
                        <div className='show-poster-info'>
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${items.poster_path})`}}></div>
                            </div>
                            <div>
                                <p>
                                    <span className='info'>{items.title || items.series}</span>
                                    <br/>
                                    <span className='info'>Episode   : {items.episode || "1"}</span>
                                    <br/>
                                    <span className='info'>Release   : {items.release}</span>
                                    <br/>
                                    <span className='info'>Status   : {items.status}</span>
                                    <br/>
                                    <span className='info'>Producers : {items.producers}</span>
                                    <br/>
                                    <span className='info'>Genre : {items.producers}</span>
                                </p>
                                <p className="overview">{items.description}</p>
                            </div>
                        </div>
                        
                        
                    </div>
                
                </div>
            </>
        )}
           
        </>
    );
}

const getsmilar = props =>{
    const smilarItem = props.smlr;
    return(
        <h1>oke</h1>
    )
}

export default Detail;
