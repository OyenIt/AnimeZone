import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import "./Detail.scss";
import apiConfig from "../../api/apiConfig";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { OutlineButton } from "../../components/button/Button";
import { category, tipe as tp} from "../../api/AZapi";
import MovieList from "../../components/movie-list/MovieList";
const Detail = () => {
  const { tipe, slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

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
                  <span className="item-eps">
                    {valu31 + 1}
                    {/* {value} :
                  {subItem_id} */}
                  </span>
                </a>
              </li>
            </>
          ))}
        </>
      );
    }
  };

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
              <div style={{ textAlign:"center"}}>
                <span className="info">
                  {items.title || items.series}
                </span>
              </div>
              <div className="show-video-eps" style={{ marginLeft: "10px" }}>
                {
                  tipe !== "Anime" ? (
                    <iframe
                      className="background-video"
                      src={items.stream_link}
                      type="video/mp4"
                      style={{ width: "640", height: "360" }}
                      autoPlay
                    ></iframe>
                  ) : (
                    <iframe
                      className="background-video"
                      ref={link_stream}
                      type="video/mp4"
                      style={{ width: "640", height: "360" }}
                      autoPlay
                    ></iframe>
                  )
                  // <video width="640" height="360" controls >
                  //       <source ref={link_stream} type="video/mp4"/>
                  // </video>
                }
                <div className="scroll-episode">
                  <span className="info">EPISODE</span>
                  <ul className="show-episode">
                    {items.itemanime ? Test(items.itemanime) : Test("x")}
                  </ul>
                </div>
              </div>
              <ul className="group-link-download">
                {/* {items.itemanime ? <div>data</div> : null } */}
                <li className="link-download-title">
                  <span>LINK DOWNLOAD : </span>
                </li>
                <li className="link-download">
                  <Popup
                    contentStyle={{ width: "350px" }}
                    trigger={
                      <a className="cursor-anime">
                        <span>GOOGLE DRIVE</span>
                      </a>
                    }
                    position="right center"
                  >
                    <div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_360[0]}
                          target="_blank"
                        >
                          <span>360</span>
                        </a>
                      </div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_480[0]}
                          target="_blank"
                        >
                          <span>480</span>
                        </a>
                      </div>

                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_720[0]}
                          target="_blank"
                        >
                          <span>720</span>
                        </a>
                      </div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_1080[0]}
                          target="_blank"
                        >
                          <span>1080</span>
                        </a>
                      </div>
                    </div>
                    {/* <button>Click here</button> */}
                  </Popup>
                </li>
                <li className="link-download">
                  <Popup
                    contentStyle={{ width: "350px" }}
                    trigger={
                      <a className="cursor-anime">
                        <span>ZippyShare</span>
                      </a>
                    }
                    position="right center"
                  >
                    <div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_360[1]}
                          target="_blank"
                        >
                          <span>360</span>
                        </a>
                      </div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_480[1]}
                          target="_blank"
                        >
                          <span>480</span>
                        </a>
                      </div>

                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_720[1]}
                          target="_blank"
                        >
                          <span>720</span>
                        </a>
                      </div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_1080[1]}
                          target="_blank"
                        >
                          <span>1080</span>
                        </a>
                      </div>
                    </div>
                    {/* <button>Click here</button> */}
                  </Popup>
                </li>
                <li className="link-download">
                  <Popup
                    contentStyle={{ width: "350px" }}
                    trigger={
                      <a className="cursor-anime">
                        <span>DOOD</span>
                      </a>
                    }
                    position="right center"
                  >
                    <div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_360[2]}
                          target="_blank"
                        >
                          <span>360</span>
                        </a>
                      </div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_480[2]}
                          target="_blank"
                        >
                          <span>480</span>
                        </a>
                      </div>

                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_720[2]}
                          target="_blank"
                        >
                          <span>720</span>
                        </a>
                      </div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_1080[2]}
                          target="_blank"
                        >
                          <span>1080</span>
                        </a>
                      </div>
                    </div>
                    {/* <button>Click here</button> */}
                  </Popup>
                </li>
                <li className="link-download">
                  <Popup
                    contentStyle={{ width: "350px" }}
                    trigger={
                      <a className="cursor-anime">
                        <span>TERABOX</span>
                      </a>
                    }
                    position="right center"
                  >
                    <div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_360[3]}
                          target="_blank"
                        >
                          <span>360</span>
                        </a>
                      </div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_480[3]}
                          target="_blank"
                        >
                          <span>480</span>
                        </a>
                      </div>

                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_720[3]}
                          target="_blank"
                        >
                          <span>720</span>
                        </a>
                      </div>
                      <div className="link-download">
                        <a
                          className="cursor-anime"
                          href={link_1080[3]}
                          target="_blank"
                        >
                          <span>1080</span>
                        </a>
                      </div>
                    </div>
                  </Popup>
                </li>
              </ul>
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
