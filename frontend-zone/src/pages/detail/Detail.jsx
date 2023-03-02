import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import "./Detail.scss";
import apiConfig from "../../api/apiConfig";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { OutlineButton } from "../../components/button/Button";
import { category, tipe as tp } from "../../api/AZapi";
import MovieList from "../../components/movie-list/MovieList";
import { BsDownload } from "react-icons/bs";
const Detail = () => {
  const { tipe, slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [titleSub, setTitleSub] = useState([]);
  const [item, setItem] = useState([]);
  const link_stream = useRef();
  const [subItem_id, setsubItem_id] = useState([]);
  const [subItem, setsubItem] = useState([]);
  const [link_360, setlink_360] = useState([]);
  const [link_480, setlink_480] = useState([]);
  const [link_720, setlink_720] = useState([]);
  const [link_1080, setlink_1080] = useState([]);

  useEffect(() => {
    if (tipe === "Anime") {
      fetch(apiConfig.baseUrl + `${tipe}/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        // .then((res) =>  )
        .then((res) => {
          getSubItem(res[0].itemanime[res[0].itemanime.length - 1]);
          setItem(res);
        })
        .catch((err) => console.log(err));
    } else if (tipe === "Movie") {
      fetch(apiConfig.baseUrl + `${tipe}/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        // .then((res) =>  )
        .then((res) => {
          setItem(res);
          setTitleSub(res[0].title);
          setlink_360(res[0].link_360);
          setlink_480(res[0].link_480);
          setlink_720(res[0].link_720);
          setlink_1080(res[0].link_1080);
        })
        .catch((err) => console.log());
    }
  }, [tipe, slug]);

  const getSubItem = (x) => {
    fetch(apiConfig.baseUrl + `Anime/sub/${x}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((resItem) => {
        try {
          setTitleSub(resItem[0].title);
          setlink_360(resItem[0].link_360);
          setlink_480(resItem[0].link_480);
          setlink_720(resItem[0].link_720);
          setlink_1080(resItem[0].link_1080);
          setActive(resItem[0].id);
          updateItem(resItem[0].stream_link);
        } catch (error) {}
      })
      .catch((err) => console.log(err));
  };

  const updateItem = (x) => {
    // console.log(x)
    try {
      if (link_stream.current) {
        link_stream.current.src = x;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Test = (x) => {
    if (tipe !== "Anime") {
      return (
        <>
          <li
            style={{
              borderColor: "red",
            }}
            className="episode-list"
          >
            <a className="cursor-anime">
              <span className="item-eps">1</span>
            </a>
          </li>
        </>
      );
    } else {
      return (
        <>
          {x.map((value, valu31) => (
            <>
              <li
                style={{
                  borderColor: active === value ? "red" : "white",
                }}
                className="episode-list"
              >
                <a
                  className="cursor-anime"
                  onClick={(event) => {
                    getSubItem(value);
                  }}
                >
                  <span className="item-eps">{valu31 + 1}</span>
                </a>
              </li>
            </>
          ))}
        </>
      );
    }
  };

  const openNewLink = x =>{
    console.log("oke")
    window.open("https://www.highrevenuecpmnetwork.com/s3skmstw0q?key=338b6f5fbc2215c345585fff3de1db3f",'_blank', 'noopener,noreferrer');
    window.open(x,'_blank', 'noopener,noreferrer');
    console.log(x)
  }

  return (
    <>
      {item.map((items, ky) => (
        <>
          <div
            className="banner"
            style={{ backgroundImage: `url(${items.backdrop_path})` }}
          ></div>
          <div id="content-detail" className="mb-1 movie-content container">
            <div className="movie-content__info">
              <div style={{ textAlign: "center" }}>
                <span className="info">
                  {titleSub ? titleSub : items.series}
                </span>
              </div>
              <div className="show-video-eps">
                <div className="container-video">
                  {tipe !== "Anime" ? (
                    <iframe
                      className="background-video"
                      src={items.stream_link}
                      type="video/mp4"
                      allowFullScreen="true"
                      webkitallowfullscreen
                      autoPlay
                    ></iframe>
                  ) : (
                    <iframe
                      className="background-video"
                      ref={link_stream}
                      type="video/mp4"
                      allowFullScreen="true"
                      webkitallowfullscreen
                      autoPlay
                    ></iframe>
                  )}
                </div>
                <div className="scroll-episode">
                  <span className="info" style={{ marginLeft: "10px" }}>
                    {" "}
                    EPISODE
                  </span>
                  <ul className="show-episode">
                    {items.itemanime ? Test(items.itemanime) : Test("x")}
                  </ul>
                </div>
              </div>
              <div className="dropdown-link">
                <span style={{ fontWeight: "600" }}>
                  Google Drive <BsDownload />
                </span>
                <div className="dropdown-content-link">
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_360[0])}
                  >
                  {link_360[0]==undefined ? <span style={{textDecoration:"line-through"}}>360p</span>:<span>360p</span>}
                  
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_480[0])}
                  >
                    {link_480[0]==undefined ? <span style={{textDecoration:"line-through"}}>480p</span>:<span>480p</span>}
                    
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_720[0])}
                  >
                    {link_720[0]==undefined ? <span style={{textDecoration:"line-through"}}>720p</span>:<span>720p</span>}
                    
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_1080[0])}
                  >
                    {link_1080[0]==undefined ? <span style={{textDecoration:"line-through"}}>1080p</span>:<span>1080p</span>}
                  </a>
                </div>
              </div>
              <div className="dropdown-link">
                <span style={{ fontWeight: "600" }}>
                  DOOD <BsDownload />
                </span>
                <div className="dropdown-content-link">
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_360[1])}
                  >
                  {link_360[1]==undefined ? <span style={{textDecoration:"line-through"}}>360p</span>:<span>360p</span>}
                  
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_480[1])}
                  >
                    {link_480[1]==undefined ? <span style={{textDecoration:"line-through"}}>480p</span>:<span>480p</span>}
                    
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_720[1])}
                  >
                    {link_720[1]==undefined ? <span style={{textDecoration:"line-through"}}>720p</span>:<span>720p</span>}
                    
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_1080[1])}
                  >
                    {link_1080[1]==undefined ? <span style={{textDecoration:"line-through"}}>1080p</span>:<span>1080p</span>}
                  </a>
                </div>
              </div>
              <div className="dropdown-link">
                <span style={{ fontWeight: "600" }}>
                  ZippyShare <BsDownload />
                </span>
                <div className="dropdown-content-link">
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_360[2])}
                  >
                  {link_360[2]==undefined ? <span style={{textDecoration:"line-through"}}>360p</span>:<span>360p</span>}
                  
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_480[2])}
                  >
                    {link_480[2]==undefined ? <span style={{textDecoration:"line-through"}}>480p</span>:<span>480p</span>}
                    
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_720[2])}
                  >
                    {link_720[2]==undefined ? <span style={{textDecoration:"line-through"}}>720p</span>:<span>720p</span>}
                    
                  </a>
                  <br/>
                  <a
                    className="cursor-anime"
                    onClick={()=>openNewLink(link_1080[2])}
                  >
                    {link_1080[2]==undefined ? <span style={{textDecoration:"line-through"}}>1080p</span>:<span>1080p</span>}
                  </a>
                </div>
              </div>
              <br />
              <div className="show-poster-info" style={{ marginLeft: "10px" }}>
                <div className="movie-content__poster">
                  <div
                    className="movie-content__poster__img"
                    style={{ backgroundImage: `url(${items.poster_path})` }}
                  ></div>
                </div>
                <div>
                  <p>
                    <span className="info">{items.title || items.series}</span>
                    <br />
                    <span className="info">
                      Episode : {items.itemanime ? items.itemanime.length : "1"}
                    </span>
                    <br />
                    <span className="info">Release : {items.release}</span>
                    <br />
                    <span className="info">Status : {items.status}</span>
                    <br />
                    <span className="info">Producers : {items.producers}</span>
                    <br />
                    <span className="info">
                      Genre :{" "}
                      {items.genres.map((value, key) => {
                        if (key !== items.genres.length - 1) {
                          return value + ", ";
                        } else {
                          return value;
                        }
                      })}
                    </span>
                  </p>
                  <p className="overview">{items.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="section mb-3">
            <div className="section__header mb-2">
              <h2>Trending Movies</h2>
              <Link to="/Movie/popular">
                <OutlineButton className="small">View more</OutlineButton>
              </Link>
            </div>
            <MovieList tipe={tp.movie} category={category.popular} />
          </div>
        </>
      ))}
    </>
  );
};
const getsmilar = (props) => {
  const smilarItem = props.smlr;
  return <h1>oke</h1>;
};

export default Detail;
