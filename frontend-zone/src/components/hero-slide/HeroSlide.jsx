import React, { useState, useEffect, useRef } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
import enjeApi, { category as categorys } from '../../api/enjeApi';
import apiConfig from '../../api/apiConfig';
import './hero-slide.scss';
import { useNavigate } from 'react-router-dom';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);
    useEffect(() => {
        fetch(apiConfig.baseUrl+`api/AzMovie/`,{
          method:'GET',
          headers : {
            'Content-Type':'application/json',
          }
          
        }).then((res) => {
          if (res.ok) return res.json()
        }).then((res) => setMovieItems(res.slice(0,3))).catch((err) => console.log(err));
      }, [])

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                
                 {/* {movieItems.map((item,ky) => <div>{item.title} === </div>)  } */}
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useNavigate();

    const item = props.item;

    const background = item.backdrop_path;

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        // const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (item.trailer_link.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + item.trailer_link;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }
 

    return (
        <div className='header-group'>
                <div
                className={`hero-slide__item ${props.className}`}
                style={{backgroundImage: `url(${background})`}}
            >
                <div className="hero-slide__item__content container">
                    <div className="hero-slide__item__content__info">
                        <h4 className="title">{item.title || item.series}</h4>
                        <div className="overview">{item.overview}</div>
                        <div className="btns">
                        {/* const link = '/' + 'Anime/detail/' + item.slug; */}
                            <Button onClick={() => hisrory('/Movie/detail/' + item.slug)}>
                                Watch now
                            </Button> 
                            {/* <OutlineButton onClick={setModalActive}>
                                Watch trailer
                            </OutlineButton> */}
                        </div>
                    </div>
                    <div className="hero-slide__item__content__poster">
                        <img className='poster' src={item.poster_path} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer" allowFullScreen={true}></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
