import React, { useState } from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";
import { category, tipe } from "../api/AZapi";
const Home = () => {
  var listgenre = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Crime",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Historical",
    "Horror",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Pyschologic",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shoujo Ai",
    "Shounen",
    "Police",
    "Shounen Ai",
    "Slice of Life",
    "Space",
    "Sports",
    "Supernatural",
    "Super Power",
    "Thriller",
    "Vampire",
  ];
  // // var first_visit = false;
  // checkFirstVisit();
  // function checkFirstVisit(){
  //     if(localStorage.getItem('was_visited')){
  //         return;
  //     }
  //     setOpen(true);
  //     localStorage.setItem('was_visited', 1);
  //     console.log(localStorage.getItem('was_visited'))
  // }
  // // console.log(first_visit);
  function adsComponent() {
    return (
      <div>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : '93b43a671771bb6bc0b23d72f6013653',
                'format' : 'iframe',
                'height' : 60,
                'width' : 468,
                'params' : {}
              };
              document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.profitabledisplaynetwork.com/93b43a671771bb6bc0b23d72f6013653/invoke.js"></scr' + 'ipt>');
            `
          }}
        />
      </div>
    );
  }
  return (
    <>
      <HeroSlide />

      
      <div className="container">
        {/* ads */}
          <div className="section mb" style={{padding:"0"}}>
            {adsComponent()}
          </div>
        {/* ==== */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            
            <h2>Trending Movies</h2>
            <Link to="/Movie/popular">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList tipe={tipe.movie} category={category.popular} />
        </div>
        {/* ads */}
        <div className="section mb" style={{padding:"0"}}>
            {adsComponent()}
          </div>
        {/* ==== */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular Anime</h2>
            <Link to="/Anime/popular">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.popular} tipe={tipe.anime} />
        </div>
        {/* ads */}
        <div className="section mb" style={{padding:"0"}}>
            {adsComponent()}
          </div>
        {/* ==== */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>New Update Anime</h2>
            <Link to="/Anime/new">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.newUpdate} tipe={tipe.anime} />
        </div>
        {/* ads */}
        <div className="section mb" style={{padding:"0"}}>
            {adsComponent()}
          </div>
        {/* ==== */}
        {/* ads session */}
        {/* <div className="section mb" style={{padding:"0"}}>
          <div className="ads-container">
            <a href="">
              <img
                alt="banner"
                src="https://landings-cdn.adsterratech.com/referralBanners/png/468%20x%2060%20px.png"
              />
            </a>
          </div>
        </div> */}
      {/* ===== */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>GENRE</h2>
          </div>
          {listgenre.map((x, z) => (
            <>
              <span> </span>
              <Link to={`/Anime/genre/${x}`}>
                <OutlineButton className="small">{x}</OutlineButton>
              </Link>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
