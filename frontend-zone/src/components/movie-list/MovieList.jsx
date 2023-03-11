import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './movie-list.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import MovieCard from '../movie-card/MovieCard';
 
const MovieList = props => {

    const [items, setItems] = useState([]);
    useEffect(() => {
        console.log()
        if (props.tipe !== undefined ) {
            if(props.tipe === "Movie"){
                fetch(apiConfig.baseUrl+`api/AzMovie/`,{
                method:'GET',
                headers : {
                    'Content-Type':'application/json',
                }
                
                }).then((res) => {
                if (res.ok) return res.json()
            }).then((res) => setItems(res.slice(0,20))).catch((err) => console.log(err));
            }else if(props.tipe === "Anime"){
                if (props.category !== undefined) {
                    if (props.category === "genre") {
                        fetch(apiConfig.baseUrl+`Anime/category/${props.category}`,{
                            method:'GET',
                            headers : {
                                'Content-Type':'application/json',
                            }
                            
                            }).then((res) => {
                            if (res.ok) return res.json()
                        }).then((res) => setItems(res.slice(0,20))).catch((err) => console.log(err));
                    }else{
                        fetch(apiConfig.baseUrl+`Anime/category/${props.category}`,{
                            method:'GET',
                            headers : {
                                'Content-Type':'application/json',
                            }
                            
                            }).then((res) => {
                            if (res.ok) return res.json()
                        }).then((res) => setItems(res.slice(0,20))).catch((err) => console.log(err));
                    }
                }else{
                    fetch(apiConfig.baseUrl+`api/AzItemAnime/`,{
                        method:'GET',
                        headers : {
                            'Content-Type':'application/json',
                        }
                        
                        }).then((res) => {
                        if (res.ok) return res.json()
                    }).then((res) => setItems(res.slice(0,20))).catch((err) => console.log(err));
                }
                
            }
                
        }
        
    }, [])
    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard tipe={props.tipe} item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList;
