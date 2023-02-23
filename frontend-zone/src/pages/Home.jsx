import React from 'react';
import { Link } from 'react-router-dom';  

import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';
// import { category, movieType, tvType } from '../api/tmdbApi';
import { category, tipe} from '../api/AZapi';
const Home = () => {
    var listgenre = ['Action', 'Adventure', 'Cars','Comedy','Crime',
    'Demons', 'Drama', 'Ecchi','Fantasy','Game',
    'Harem', 'Historical', 'Horror','Josei','Kids',
    'Magic', 'Martial Arts', 'Mecha','Military','Music',
    'Mystery', 'Parody', 'Police','Pyschologic','Romance',
    'Samurai', 'School', 'Sci-Fi','Seinen','Shoujo',
    'Shoujo Ai', 'Shounen', 'Police','Shounen Ai','Slice of Life',
    'Space', 'Sports', 'Supernatural','Super Power','Thriller',
    'Vampire'];

  return (
    <>
    <HeroSlide/>
    <div className="container">
        <div className="section mb-3">
            <div className="section__header mb-2"> 
                <h2>Trending Movies</h2>
                <Link to="/Movie/popular">
                    <OutlineButton className="small">View more</OutlineButton>
                </Link>
            </div>
            <MovieList tipe={tipe.movie} category={category.popular}/>
        </div>
        <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>Popular Anime</h2>
                    <Link to="/Anime/popular">
                        <OutlineButton className="small">View more</OutlineButton>
                    </Link>
            </div>
            <MovieList category={category.popular} tipe={tipe.anime}/>
        </div>
        <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>New Update Anime</h2>
                    <Link to="/Anime/new">
                        <OutlineButton className="small">View more</OutlineButton>
                    </Link>
            </div>
            <MovieList category={category.newUpdate} tipe={tipe.anime}/>
        </div>
        {/* 
        <div className="section mb-3">
            <div className="section__header mb-2">
                <h2>New Update Anime</h2>
                    <Link to="/Anime">
                        <OutlineButton className="small">View more</OutlineButton>
                    </Link>
            </div>
            <MovieList category={category.anime}/>
        </div>
        <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>GENRE</h2>
                    </div>
                    {listgenre.map((x,z)=> 
                    <>
                    <span>   </span>
                        <Link to={`/Anime/genre/${x}`}>
                            <OutlineButton className="small">{x}</OutlineButton>
                        </Link>
                    </>
                        
                    )}  
        </div> */}
        <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>GENRE</h2>
                    </div>
                    {listgenre.map((x,z)=> 
                    <>
                    <span>   </span>
                        <Link to={`/Anime/genre/${x}`}>
                            <OutlineButton className="small">{x}</OutlineButton>
                        </Link>
                    </>
                        
                    )}  
        </div>
    </div>
    
        
     
    </>
  )
}

export default Home