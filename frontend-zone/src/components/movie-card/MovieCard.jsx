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
   
    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${item.poster_path})`}}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
                <div className='info-card'>
                    <div className='info-card-title'>
                        <span className='text-title'>{item.series || item.title}</span>
                    </div>
                    {item.itemanime ? (<span className='text-title'> Episode : {item.itemanime.length}</span>):(<span className='text-title'>Episode : 1</span>)}
                    
                </div>
            </div>
            {/* <h3 >{item.series || item.title}</h3> */}
        </Link>
    );
}

export default MovieCard;
