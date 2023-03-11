import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./movie-grid.scss";
import MovieCard from "../movie-card/MovieCard";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import apiConfig from "../../api/apiConfig";
import { tipe } from "../../api/AZapi";
import { BiSearchAlt } from "react-icons/bi";
import {MdOutlineMore} from "react-icons/md";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [filterGenre, setfilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [showItem, setshowItem] = useState(18);

  const { keyword } = useParams();
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
  useEffect(() => {
    const getList = async () => {
      if (keyword === undefined) {
        switch (props.tipe) {
          case tipe.movie:
            fetch(apiConfig.baseUrl + `api/AzMovie/`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (res.ok) return res.json();
              })
              .then((res) => setItems(res))
              .catch((err) => console.log(err));
            break;
          case tipe.anime:
            if (props.category !== undefined) {
              if (props.category === "genre") {
                if (props.genre !== undefined) {
                  setfilterGenre([props.genre]);
                }
                fetch(apiConfig.baseUrl + `Anime/category/${props.category}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => {
                    if (res.ok) return res.json();
                  })
                  .then((res) => setItems(res))
                  .catch((err) => console.log(err));
              } else {
                fetch(apiConfig.baseUrl + `Anime/category/${props.category}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => {
                    if (res.ok) return res.json();
                  })
                  .then((res) => setItems(res))
                  .catch((err) => console.log(err));
              }
            } else {
              fetch(apiConfig.baseUrl + `api/AzItemAnime/`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {
                  if (res.ok) return res.json();
                })
                .then((res) => setItems(res))
                .catch((err) => console.log());
            }
            break;
          default:
            alert("404");
            break;
        }
      } else {
        fetch(apiConfig.baseUrl + `${props.tipe}/search/${keyword}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) return res.json();
          })
          .then((res) => setItems(res))
          .catch((err) => console.log(err));
      }
    };
    getList();
  }, [props.tipe, keyword]);
  const handleChangeGenre = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // push selected value in list
      if (filterGenre[0] !== value) {
        setfilterGenre((prev) => [...prev, value]);
      }
    } else {
      // remove unchecked value from the list
      setfilterGenre((prev) => prev.filter((x) => x !== value));
    }
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
  return (
    <>
      <div className="section mb-3">
        {/* ads */}
        
        {adsComponent()}

        {/* ==== */}
        <MovieSearch tipe={props.tipe} keyword={keyword} />

        <div className="section mb-3">
          <div class="dropdown">
            <a>
              <span>
                <h4>Category+</h4>
              </span>
            </a>
            <div class="dropdown-content">
              <li>
                <ul className="grid-container-check1">
                  {listgenre.map(function (gr) {
                    return (
                      <li className="text-center">
                        <input
                          className="cursor-anime-default"
                          type="checkbox"
                          name="genre"
                          value={[gr]}
                          onChange={handleChangeGenre}
                          // style={{width:"25%", display:"inline"}}
                        />
                        <h5 className="h5-normal">{gr}</h5>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </div>
          </div>

          <div className="genre-choice">
          {filterGenre.map((x, z) => (
            <>
              <span> </span>
              <OutlineButton
                className="small"
                onClick={() =>
                  setfilterGenre((prev) =>
                    prev.filter((x) => x !== filterGenre[z])
                  )
                }
              >
                {x}
              </OutlineButton>
            </>
          ))}
          </div>
        </div>
      </div>
      <div className="movie-grid">
        {items.slice(0,showItem).map((item, i) => {
          var gnrvalid = false;
          if (filterGenre.length !== 0) {
            filterGenre.map((gnr) => {
              if (item.genres.some((gnrCheck) => gnrCheck === gnr)) {
                gnrvalid = true;
              }
            });
          }
          if (gnrvalid) {
            return <MovieCard tipe={props.tipe} item={item} key={i} />;
          } else if (filterGenre.length === 0) {
            return <MovieCard tipe={props.tipe} item={item} key={i} />;
          }
        })}
      </div>
      <div className="show-container">
        <a className="cursor-anime" onClick={() => setshowItem(showItem+12)}>SHOW MORE <MdOutlineMore fontSize="20"/></a>
          {/* ads */}
          
          {adsComponent()}
          
          {/* ==== */}
        </div>
    </>
  );
};

const MovieSearch = (props) => {
  const history = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history(`/${props.tipe}/search/${keyword}`);
    }
  }, [keyword, props.tipe, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <>
      <div className="movie-search">
        <Input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button className="small" onClick={goToSearch}>
          Search
          <BiSearchAlt/>
        </Button>
      </div>
    </>
  );
};

export default MovieGrid;
