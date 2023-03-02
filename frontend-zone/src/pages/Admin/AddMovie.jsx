import React, {useEffect,useState } from 'react';
import './AddMovie.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";

import apiConfig from '../../api/apiConfig';
import "react-datepicker/dist/react-datepicker.css";
import bg from '../../assets/footer-bg.jpg';

import { Link } from 'react-router-dom';
import bg_home from '../../assets/ic_home.png';

import {FaHome} from 'react-icons/fa';

const AddMovie = () => {

    const [backdrop,setbackdrop] = useState("")
    const [poster,setposter] = useState("")
    const [title,settitle] = useState("")
    const [category,setcategory] = useState([])
    const [description,setdescription] = useState("")
    const   [link_360,setlink_360] = useState([])
    const   [link_480,setlink_480] = useState([])
    const   [link_720,setlink_720] = useState([])
    const   [link_1080,setlink_1080] = useState([])
    // const [episode,setepisode] = useState("")
    const [genre,setgenre] = useState([])
    const [producers,setproducers] = useState("")
    const [rate,setrate] = useState(0)
    const [release,setrelease] = useState(new Date())
    const [status,setstatus] = useState("")
    const [stream,setstream] = useState("")
    const [slug,setslug] = useState("")
    const range = (start, end) => {
        return new Array(end - start).fill().map((d, i) => i + start);
      };
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const { secret} = useParams();
    const navigate = useNavigate();
    const [My_Friends, setMy_friends] = useState(false)
  const [message, setMessage] = useState('');
  useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/basecamp'
            setMy_friends(false)
        }
        else{
         (async () => {
           try {
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token')
            axios.get(apiConfig.baseUrl+'home/',{headers:{'Content-Type': 'application/json'}}).then(res => {
              setMessage(res.data.message)
              
              // console.log(res.data.message)
            });
            setMy_friends(true)
            
          } catch (e) {
            setMy_friends(false)
            window.location.href = '/basecamp'
          }
         })()};
     }, []);
    // var categorys = ['Movie','Anime'];
    var categorys = ['Popular','Trending'];
    // var tipes = ['Trending','New','Populer'];
    var listgenre = ['Action', 'Adventure', 'Cars','Comedy','Crime',
    'Demons', 'Drama', 'Ecchi','Fantasy','Game',
    'Harem', 'Historical', 'Horror','Josei','Kids',
    'Magic', 'Martial Arts', 'Mecha','Military','Music',
    'Mystery', 'Parody', 'Police','Pyschologic','Romance',
    'Samurai', 'School', 'Sci-Fi','Seinen','Shoujo',
    'Shoujo Ai', 'Shounen', 'Police','Shounen Ai','Slice of Life',
    'Space', 'Sports', 'Supernatural','Super Power','Thriller',
    'Vampire'];
    
    const addItem =  async() =>{
        let formField = new FormData()
       
        formField.append('backdrop_path',backdrop)
        formField.append('poster_path',poster)
        formField.append('title',title)
        category.map(function (ct) {  
            formField.append('category',ct)
        })
        formField.append('description',description)
        // formField.append('episode',episode)
        link_360.map(function (lk1) { 
            formField.append('link_360',lk1)
          })
          link_480.map(function (lk2) { 
            formField.append('link_480',lk2)
          })
          link_720.map(function (lk3) { 
            formField.append('link_720',lk3)
          })
          link_1080.map(function (lk4) { 
            formField.append('link_1080',lk4)
          })
        genre.map(function (gr) {
            formField.append('genres',gr)  
        })
        formField.append('producers',producers) 
        formField.append('rate',rate)
        formField.append('release',release.getFullYear()+"-"+(release.getMonth()+1) +"-"+release.getDate())
        formField.append('status',status)
        formField.append('stream_link',stream)
        formField.append('slug',slug)
        
        try {
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token')
            axios
            .post(apiConfig.baseUrl+"api/AzMovie/", formField)
            .then((res) => {
              alert("SUKSES")
              window.location.reload(false)
            });
        } catch (error) {
            alert(error)
        }
        
        
    }   
    const handleChangeCategory = e => {
        const { value, checked } = e.target;
        if (checked) {
          // push selected value in list
          setcategory(prev => [...prev, value]);
        } else {
          // remove unchecked value from the list
          setcategory(prev => prev.filter(x => x !== value));
        }
      }
    const handleChangeGenre = e => {
        const { value, checked } = e.target;
        if (checked) {
          // push selected value in list
          setgenre(prev => [...prev, value]);
        } else {
          // remove unchecked value from the list
          setgenre(prev => prev.filter(x => x !== value));
        }
      }
  return (
    <>
    {My_Friends ? <><div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
    <div className="mb-3 movie-content container">
        {/* <div className="movie-content__poster">
            <div className="movie-content__poster__img" style={{backgroundImage: `url("https://images2.imgbox.com/44/e2/GudW1dRF_o.png")`}}></div>
        </div> */}
        <div className="movie-content-admin__info">
        <div className="genres" >
              <Link to="/basecamp/menu"><FaHome size="40px"/></Link>
            </div>
            <div className='text-center'>
            <h1>SETUP ITEM</h1>
            </div>
            
            <div className='add-group'>
            <hr/>
            <br></br>
            <ul className='grid-container'>
                <li><h4>BACKDROP</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Backdrop" name='backdrop' value={backdrop}
                    onChange={(e) => setbackdrop(e.target.value)}/></li>
                <li><h4>POSTER</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Poster" name='poster' value={poster}
                    onChange={(e) => setposter(e.target.value)}/></li>
                <li><h4>TITLE</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Title" name='title' value={title}
                    onChange={(e) => settitle(e.target.value)}/></li>
                <li><h4>CATEGORY</h4></li>
                <li>:</li>
                <li>
                    <ul className='grid-container-check'>
                    {categorys.map(function(ct){
                    return <li className='text-center'><input
                    type="checkbox"
                    name="category"
                    value={[ct]}
                    onChange={handleChangeCategory}
                  /> <h5 className='h5-normal'>{ct}</h5></li>
                })}
                    </ul>
                </li>
                <li><h4>DESCRIPTION</h4></li>
                <li>:</li>
                <li><textarea name="description" id="" cols="80" rows="10" value={description}
                    onChange={(e) => setdescription(e.target.value)}></textarea></li>
                <li><h4>GENRE</h4></li>
                <li>:</li>
                <li>
                    <ul className='grid-container-check'>
                    {listgenre.map(function(gr){
                    return <li className='text-center'><input
                    type="checkbox"
                    name="genre"
                    value={[gr]}
                    onChange={handleChangeGenre}
                  /> <h5 className='h5-normal'>{gr}</h5></li>
                })}
                    </ul>
                </li>
                
                <li><h4>PRODUCER</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Producer" name='producer' value={producers}
                    onChange={(e) => setproducers(e.target.value)}/></li>
                <li><h4>RATE</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Rate" name='rate' value={rate}
                    onChange={(e) => setrate(e.target.value)}/></li>
                <li><h4>RELEASE</h4></li>
                <li>:</li>
                <li><DatePicker
                    
                    renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }) => (
                        <div
                        style={{
                            margin: 10,
                            display: "flex",
                            justifyContent: "center",
                        }}
                        >
                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            {"<"}
                        </button>
                        <select
                            value={getYear(date)}
                            onChange={({ target: { value } }) => changeYear(value)}
                        >
                            {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>

                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                            }
                        >
                            {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>
                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            {">"}
                        </button>
                        </div>
                    )}
                    selected={release}
                    onChange={(date) => setrelease(new Date(date))}
                    /></li>
                <li><h4>STATUS</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Status" name='status' value={status}
                    onChange={(e) => setstatus(e.target.value)}/></li>
                <li><h4>LINK 360</h4></li>
                <li>:</li>
                <li>
                    <ul className='container-link-dowload'>
                    <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link1'
                            value={link_360[0]} onChange={(e) => {
                                setlink_360((prevArr) => {
                                  const result = [...prevArr];
                                  result[0] = e.target.value;
                                  return result;
                                });
                              }} />
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link2'
                             value={link_360[1]} onChange={(e) => {
                                setlink_360((prevArr) => {
                                  const result = [...prevArr];
                                  result[1] = e.target.value;
                                  return result;
                                });
                              }} />
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link3' 
                            value={link_360[2]} onChange={(e) => {
                                setlink_360((prevArr) => {
                                  const result = [...prevArr];
                                  result[2] = e.target.value;
                                  return result;
                                });
                              }} />
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link4' 
                            value={link_360[3]} onChange={(e) => {
                                setlink_360((prevArr) => {
                                  const result = [...prevArr];
                                  result[3] = e.target.value;
                                  return result;
                                });
                              }} />
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link5' 
                             value={link_360[4]} onChange={(e) => {
                                setlink_360((prevArr) => {
                                  const result = [...prevArr];
                                  result[4] = e.target.value;
                                  return result;
                                });
                              }} />
                            
                        </li>
                    </ul>
                </li>
                <li><h4>LINK 480</h4></li>
                <li>:</li>
                <li>
                    <ul className='container-link-dowload'>
                    <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link6' 
                            value={link_480[0]} onChange={(e) => {
                                setlink_480((prevArr) => {
                                  const result = [...prevArr];
                                  result[0] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link7'
                            value={link_480[1]} onChange={(e) => {
                                setlink_480((prevArr) => {
                                  const result = [...prevArr];
                                  result[1] = e.target.value;
                                  return result;
                                });
                              }} />
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link8'
                            value={link_480[2]} onChange={(e) => {
                                setlink_480((prevArr) => {
                                  const result = [...prevArr];
                                  result[2] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link9' 
                            value={link_480[3]} onChange={(e) => {
                                setlink_480((prevArr) => {
                                  const result = [...prevArr];
                                  result[3] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link10' 
                            value={link_480[4]} onChange={(e) => {
                                setlink_480((prevArr) => {
                                  const result = [...prevArr];
                                  result[4] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                    </ul>
                    
                </li>
                <li><h4>LINK 720</h4></li>
                <li>:</li>
                <li>
                    <ul className='container-link-dowload'>
                    <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link11' 
                            value={link_720[0]} onChange={(e) => {
                                setlink_720((prevArr) => {
                                  const result = [...prevArr];
                                  result[0] = e.target.value;
                                  return result;
                                });
                              }} />
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link12' 
                            value={link_720[1]} onChange={(e) => {
                                setlink_720((prevArr) => {
                                  const result = [...prevArr];
                                  result[1] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link13' 
                            value={link_720[2]} onChange={(e) => {
                                setlink_720((prevArr) => {
                                  const result = [...prevArr];
                                  result[2] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link14' 
                            value={link_720[3]} onChange={(e) => {
                                setlink_720((prevArr) => {
                                  const result = [...prevArr];
                                  result[3] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link15' 
                            value={link_720[4]} onChange={(e) => {
                                setlink_720((prevArr) => {
                                  const result = [...prevArr];
                                  result[4] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                    </ul>
                </li>
                <li><h4>LINK 1080</h4></li>
                <li>:</li>
                <li>
                    <ul className='container-link-dowload'>
                    <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link16' 
                            value={link_1080[0]} onChange={(e) => {
                                setlink_1080((prevArr) => {
                                  const result = [...prevArr];
                                  result[0] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link17' 
                            value={link_1080[1]} onChange={(e) => {
                                setlink_1080((prevArr) => {
                                  const result = [...prevArr];
                                  result[1] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link18' 
                            value={link_1080[2]} onChange={(e) => {
                                setlink_1080((prevArr) => {
                                  const result = [...prevArr];
                                  result[2] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link19' 
                            value={link_1080[3]} onChange={(e) => {
                                setlink_1080((prevArr) => {
                                  const result = [...prevArr];
                                  result[3] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link20' 
                            value={link_1080[4]} onChange={(e) => {
                                setlink_1080((prevArr) => {
                                  const result = [...prevArr];
                                  result[4] = e.target.value;
                                  return result;
                                });
                              }}/>
                            
                        </li>
                    </ul>
                </li>
                <li><h4>STREAM</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter stream" name='stream' value={stream}
                    onChange={(e) => setstream(e.target.value)}/></li>
            </ul>
            
            </div>
            
            <button className='btn-save' onClick={addItem}> SAVE </button>
            <br/>
        </div>
    </div></>:null}
    </>
  )
}

export default AddMovie