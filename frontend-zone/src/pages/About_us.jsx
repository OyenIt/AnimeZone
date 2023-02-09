import React from 'react';
import PageHeader from '../components/page-header/PageHeader';
import bg from '../assets/footer-bg.jpg';
const About_us = () => {
  return (
    <>
            <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
                <div className="mb-3 movie-content container">
                    {/* <div className="movie-content__poster">
                        <div className="movie-content__poster__img" style={{backgroundImage: `url(${items.poster_path})`}}></div>
                    </div> */}
                    <div className="movie-content__info">
                      <h3>ABOUT US</h3>
                      <p>
                        Enjenime adalah website streaming anime maupun tempat download Anime
                        terlengkap, Di Enjenime terdapat berbagai genre dan bisa di download via
                        Google Drive, Zippyshare, dll <br/> 

                      </p>
                    </div>
                </div>
    </>
  )
}

export default About_us