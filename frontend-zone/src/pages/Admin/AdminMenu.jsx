import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./AdminMenu.scss";
import bg from "../../assets/footer-bg.jpg";
import background_video from "../../assets/backgroun_video_anime.mp4";
import axios from "axios";
import apiConfig from "../../api/apiConfig";
const AdminMenu = () => {
  const [My_Friends, setMy_friends] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/basecamp";
      setMy_friends(false);
    } else {
      (async () => {
        try {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");
          axios
            .get(apiConfig.baseUrl + "home/", {
              headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
              setMessage(res.data.message);

              // console.log(res.data.message)
            });
          setMy_friends(true);
        } catch (e) {
          setMy_friends(false);
          window.location.href = "/basecamp";
        }
      })();
    }
  }, []);
  return (
    <>
      {My_Friends ? (
        <section id="main">
          <div
            className="banner"
            style={{ backgroundImage: `url(${bg})` }}
          ></div>

          <div className="movie-content">
            {/* <h1>WELCOME TO THE JUNGLE {message}</h1> */}
            {/* <video muted autoPlay loop controls className='background-video-menu' src={background_video}>
        </video> */}
            <div style={{ width: "100%", textAlign: "center" }}>
              <h1>{message}</h1>
            </div>
            <div className="movie-content__info1">
              <div className="content-x">
                <h1>MOVIE</h1>
                <div className="genres">
                  <Link to="/basecamp/add_movie">
                    {" "}
                    <button className="btn-outline-menu"> ADD MOVIE </button>
                  </Link>

                  {/* <Link to="/basecamp/update/series"> <button classNamem 'btn-outline-menu' > Update & Delete</button></Link> */}
                </div>
                <div className="genres">
                  <Link to="/basecamp/ud_movie">
                    {" "}
                    <button className="btn-outline-menu"> Update & Delete</button>
                  </Link>
                </div>
              </div>
              <div className="content-x">
                <h1>ANIME</h1>
                <div className="genres">
                  <Link to="/basecamp/add_anime">
                    {" "}
                    <button className="btn-outline-menu"> ADD ANIME </button>
                  </Link>
                </div>
                <div className="genres">
                  <Link to="/basecamp/ud_anime">
                    {" "}
                    <button className="btn-outline-menu"> Update & Delete</button>
                  </Link>
                </div>
              </div>
              <div className="content-x">
                <h1>SUB ANIME</h1>
                <div className="genres">
                  <Link to="/basecamp/add_sub_anime">
                    {" "}
                    <button className="btn-outline-menu"> ADD SUB ANIME </button>
                  </Link>
                </div>
                <div className="genres">
                  <Link to="/basecamp/ud_subanime">
                    {" "}
                    <button className="btn-outline-menu"> Update & Delete</button>
                  </Link>
                </div>
              </div>
              <div className="genres">
                <Link to="/basecamp/logout">
                  <button
                    className="btn-outline-menu"
                    style={{ backgroundColor: "#fc2638" }}
                  >
                    {" "}
                    Keluar{" "}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default AdminMenu;
