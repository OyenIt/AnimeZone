import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import "./Detail.scss";
import apiConfig from "../../api/apiConfig";
import { Link } from "react-router-dom";
import { OutlineButton } from "../../components/button/Button";
import { category, tipe as tp } from "../../api/AZapi";
import MovieList from "../../components/movie-list/MovieList";
import { BsDownload } from "react-icons/bs";
import NotFound from "../NotFound";

const Detail = () => {
  const { tipe, slug } = useParams();
  const [active, setActive] = useState(0);
  const [titleSub, setTitleSub] = useState([]);
  const [item, setItem] = useState([]);
  const link_stream = useRef();
  const [link_360, setlink_360] = useState([]);
  const [link_480, setlink_480] = useState([]);
  const [link_720, setlink_720] = useState([]);
  const [link_1080, setlink_1080] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diketahui, setDiketahui] = useState(true);

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
        .catch((err) => setDiketahui(false));
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
          updateItem(res[0].stream_link);
        })
        .catch((err) => console.log("error"));
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
    
    try {
      if (link_stream.current) {
        if (x !== null) {
          link_stream.current.src = x;
        } else {
          link_stream.current.src = null;
        }
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
              <li>
                <div style={{
                  borderColor: active === value ? "red" : "white",
                }}
                className="episode-list">
                <a
                  className="cursor-anime"
                  onClick={(event) => {
                    getSubItem(value);
                    openNewLink();
                  }}
                >
                  <span className="item-eps">{valu31 + 1}</span>
                </a>
                </div>
              </li>
            </>
          ))}
        </>
      );
    }
  };

  const openNewLink = (x) => {
    
    window.open(
      "https://reticencevaliddecoction.com/s3skmstw0q?key=338b6f5fbc2215c345585fff3de1db3f",
      "_blank"
    );
  };
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
  console.clear()
  return (
    <>
      {diketahui ? (
        <>
          {item.map((items, ky) => (
            <>
              <div
                className="banner"
                style={{ backgroundImage: `url(${items.backdrop_path})` }}
              ></div>
              <div id="content-detail" className="mb-1 movie-content container">
                <div className="movie-content__info">
                  {/* <div style={{ textAlign: "center" }}>
                <span className="info">
                  {titleSub ? titleSub : items.series}
                </span>
              </div> */}
                  <br />
                  <div className="show-video-eps">
                    <div className="container-video">
                      {/* <iframe className="frame-video" src="https://dood.yt/e/z231zw1ln3ma" scrolling="no" frameborder="0" allowfullscreen="true"></iframe> */}
                      {tipe === "Anime" ? (
                        <>
                          {link_stream !== null ? (
                            <iframe
                              className="frame-video"
                              ref={link_stream}
                              type="video/mp4"
                              allowFullScreen={true}
                            ></iframe>
                          ) : (
                            <h1>error</h1>
                          )}
                        </>
                      ) : (
                        <iframe
                          className="frame-video"
                          src={items.stream_link}
                          type="video/mp4"
                          allowFullScreen={true}
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
                        onClick={openNewLink}
                        href={link_360[0]}
                        // target="_blank"
                        // rel="noopener noreferrer"
                      >
                        {link_360[0] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            360p
                          </span>
                        ) : (
                          <span>360p</span>
                        )}
                      </a>
                      <br />
                      <a
                        href={link_480[0]}
                        className="cursor-anime"
                        // target="_blank"
                        // rel="noopener noreferrer"
                        onClick={openNewLink}
                      >
                        {link_480[0] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            480p
                          </span>
                        ) : (
                          <span>480p</span>
                        )}
                      </a>
                      <br />
                      <a
                        className="cursor-anime"
                        href={link_720[0]}
                        onClick={openNewLink}
                      >
                        {link_720[0] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            720p
                          </span>
                        ) : (
                          <span>720p</span>
                        )}
                      </a>
                      <br />
                      <a
                        className="cursor-anime"
                        href={link_1080[0]}
                        onClick={openNewLink}
                      >
                        {link_1080[0] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            1080p
                          </span>
                        ) : (
                          <span>1080p</span>
                        )}
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
                        href={link_360[1]}
                        onClick={openNewLink}
                      >
                        {link_360[1] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            360p
                          </span>
                        ) : (
                          <span>360p</span>
                        )}
                      </a>
                      <br />
                      <a
                        className="cursor-anime"
                        href={link_480[1]}
                        onClick={openNewLink}
                      >
                        {link_480[1] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            480p
                          </span>
                        ) : (
                          <span>480p</span>
                        )}
                      </a>
                      <br />
                      <a
                        className="cursor-anime"
                        href={link_720[1]}
                        onClick={openNewLink}
                      >
                        {link_720[1] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            720p
                          </span>
                        ) : (
                          <span>720p</span>
                        )}
                      </a>
                      <br />
                      <a
                        className="cursor-anime"
                        href={link_1080[1]}
                        onClick={openNewLink}
                      >
                        {link_1080[1] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            1080p
                          </span>
                        ) : (
                          <span>1080p</span>
                        )}
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
                        href={link_360[2]}
                        onClick={openNewLink}
                      >
                        {link_360[2] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            360p
                          </span>
                        ) : (
                          <span>360p</span>
                        )}
                      </a>
                      <br />
                      <a
                        className="cursor-anime"
                        href={link_480[2]}
                        onClick={openNewLink}
                      >
                        {link_480[2] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            480p
                          </span>
                        ) : (
                          <span>480p</span>
                        )}
                      </a>
                      <br />
                      <a
                        className="cursor-anime"
                        href={link_720[2]}
                        onClick={openNewLink}
                      >
                        {link_720[2] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            720p
                          </span>
                        ) : (
                          <span>720p</span>
                        )}
                      </a>
                      <br />
                      <a
                        className="cursor-anime"
                        href={link_1080[2]}
                        onClick={openNewLink}
                      >
                        {link_1080[2] === '' ? (
                          <span style={{ textDecoration: "line-through" }}>
                            1080p
                          </span>
                        ) : (
                          <span>1080p</span>
                        )}
                      </a>
                    </div>
                  </div>
                  <br />
                  <div
                    className="show-poster-info"
                    style={{ marginLeft: "10px" }}
                  >
                    <div className="movie-content__poster">
                      <div
                        className="movie-content__poster__img"
                        style={{ backgroundImage: `url(${items.poster_path})` }}
                      ></div>
                    </div>
                    <div>
                      <p>
                        <span className="info">
                          {items.title || items.series}
                        </span>
                        <br />
                        <span className="info">
                          Episode :{" "}
                          {items.itemanime ? items.itemanime.length : "1"}
                        </span>
                        <br />
                        <span className="info">Release : {items.release}</span>
                        <br />
                        <span className="info">Status : {items.status}</span>
                        <br />
                        <span className="info">
                          Producers : {items.producers}
                        </span>
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
                      <div className="description">
                        <p className="overview">{items.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section mb-3">
                {/* ads */}
        
                  {adsComponent()}
                
                {/* ==== */}
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
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Detail;
