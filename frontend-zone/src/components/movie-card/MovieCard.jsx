import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {

    const item  = props.item;
    const tipe  = props.tipe;
    const link ='/' + tipe +'/detail/' + item.slug;;
    // if (category) {
        
    // }else{
    //     link = '/' + 'Anime/detail/' + item.slug;
    // }
    
    // if (item.series) {
        
    // }else{
    //     const link = '/' + 'Anime/detail/' + item.slug;
    // }
    

    // const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${item.poster_path})`}}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
                <div className='info-card'>
                    <div className='info-card-title'>
                        <span style={{fontSize:"20px", fontWeight:"600"}}>{item.series || item.title}</span>
                    </div>
                    {item.itemanime ? (<h3> Episode : {item.itemanime.length}</h3>):(<h3>Episode : 1</h3>)}
                    
                </div>
            </div>
            {/* <h3 >{item.series || item.title}</h3> */}
        </Link>
    );
}

export default MovieCard;
