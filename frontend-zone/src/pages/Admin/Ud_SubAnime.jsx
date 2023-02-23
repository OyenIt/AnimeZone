import React, {useEffect,useState } from 'react';
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
export const Ud_SubAnime = () => {
    const { secret} = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([])
    const [id_item, setidItem] = useState(0)
    const [id_subitem, setidsubItem] = useState([])

    const [idUpdateSub, setidUpdateSub] = useState(0)

    const [title,settitle] = useState("")
    const [link_360,setlink_360] = useState([])
    const [link_480,setlink_480] = useState([])
    const [link_720,setlink_720] = useState([])
    const [link_1080,setlink_1080] = useState([])
    const [stream_link,setstream_link] = useState("")
    const [upload_at, setupload_at] = useState(new Date())
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
            axios.get(apiConfig.baseUrl+'api/AzItemAnime/',{headers:{'Content-Type': 'application/json'}}).then(res => {
              setMessage(res.data.message)
              setItems(res.data)
              // console.log(res.data.message)
            });
            setMy_friends(true)
          } catch (e) {
            setMy_friends(false)
            window.location.href = '/basecamp'
          }
         })()};
     }, []);
    // useEffect(() => {
    //     if(secret !== undefined){
    //         if (secret !== "koderahasia") {
    //           navigate('/')
    //         }else{
    //             fetch(apiConfig.baseUrl+"api/AzItemAnime/",{
    //                 method:'GET',
    //                 headers : {
    //                   'Content-Type':'application/json',
    //                 }
    //               }).then((res) => {
    //                 if (res.ok) return res.json()
    //               }).then((res) => setItems(res)).catch((err) => console.log(err));
    //         }
    //       }else{
    //         navigate('/')
    //       }
        
    // }, [])
    const UpdateSubSeries = () =>{
        let formField = new FormData()
        
        formField.append('series',id_item)
        formField.append('title',title)
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
        formField.append('stream_link',stream_link)
        formField.append('upload_at',upload_at.getFullYear()+"-"+(upload_at.getMonth()+1) +"-"+upload_at.getDate())
        
        try {
            axios
            .put(apiConfig.baseUrl+`api/AzSubItemAnime/${idUpdateSub}/`, formField)
            .then((res) => {
              alert("SUKSES")
              window.location.reload(false)
            });
        } catch (error) {
            alert(error)
        }
        
    }
    const DeleteSubSeries = () =>{
        try {
            axios
            .delete(apiConfig.baseUrl+`api/AzSubItemAnime/${idUpdateSub}`)
            .then((res) => {
              alert("SUKSES")
              window.location.reload(false)
            });
        } catch (error) {
            alert(error)
        }
    }
    const showSeries  = () =>{
        items.map((val, key) =>{
          if(val.id === id_item){
            setidsubItem(val.itemanime)
            // setrelease(val.title)
          }
        })
    }

    const [rowIndexClicked, setRowIndexClicked] = useState(null);
    const handlerRowClicked = (rowIndex,itm) => (event) => {
        if (rowIndexClicked !== rowIndex) {
          // handle if user clicks again the same row
          setRowIndexClicked(rowIndex);
          setidItem(itm.id)
          
        } else {
          setRowIndexClicked(null); // set clicked row to null if same row is selected
        }
      };

      const [showTables, setShowTables] = useState(true);

      function changeStateTables() {
        setShowTables(!showTables);
        showSeries();
      }

      const ShowSubSeries  = (x) =>{
        setidUpdateSub(x)
        fetch(apiConfig.baseUrl+`api/AzSubItemAnime/${x}`,{
            method:'GET',
            headers : {
              'Content-Type':'application/json',
            }
          }).then((res) => {
            if (res.ok) return res.json()
          }).then((res) => {settitle(res.title);
            setlink_360(res.link_360);setlink_480(res.link_480);
            setlink_720(res.link_720);setlink_1080(res.link_1080);setstream_link(res.stream_link);}
          ).catch((err) => console.log(err));
    }
    
  return (
    <>
    {My_Friends ? <> <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
    <div className="mb-2 movie-content container">
        <div className="movie-content__poster">
        <div className="genres" >
              <Link to="/basecamp/menu"><button className='btn-outline' style={{backgroundImage: 'url(' + bg_home + ')', height:"50px",width:"50px",backgroundSize: 'cover',}} ></button></Link>
            </div>
        </div>
        <div className="movie-content__info">
        {showTables ? (
        <>
        <button onClick={changeStateTables}> Display </button>
        <div className='show-list-anime'>
        <div class="table-container">
            <table className='table-series-anime'>
              <thead>
                <tr>
                  <th className='poster-head'>POSTER</th>
                  <th className='title-head'>SERIES</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
              {items.map((val, key) => {
                      return (
                        <>
                        <tr
                        key={key}
                        id={key}
                        className={rowIndexClicked === key ? "clicked-class" : ""}
                        onClick={handlerRowClicked(key,val)}>
                          <td className='text-center'>
                            <div className='poster-box'>
                              <img className='poster-series' src={val.poster_path} alt="" />
                            </div>
                          </td>
                          <td ><div className='poster-box'>{val.series}</div></td>
                          <td><div className='poster-box'>{val.description}</div></td>
                        </tr>
                        </>
                      )
                    })}
              </tbody>
            </table>
          </div>
              {/* <button className='btn-update' onClick={showSeries} > Add </button> */}
          </div>
            </>
        ) : (
          <>
          <button onClick={changeStateTables}> Hide </button>
          <div className='show-input-form'>
              <ul className='grid-container'>
                <li><h4>TITLE</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Title" name='title' value={title}
                    onChange={(e) => settitle(e.target.value)}/></li>
                <li><h4>UPLOAD AT</h4></li>
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
                    selected={upload_at}
                    onChange={(date) => setupload_at(new Date(date))}
                    /></li>
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
                <li><input className='input-data' type="text" placeholder="Enter Stream" name='title' value={stream_link}
                    onChange={(e) => setstream_link(e.target.value)}/></li>
              </ul>
              <div className='series' style={{marginLeft:"50px"}}>
                EPISODE
                <ul style={{gridAutoColumns:"100%", gridAutoRows:"100%"}}>
                    {/* <li><img className='poster' src={poster} alt="" /></li> */}
                    <li style={{width:"250px"}}>
                        <div style={{height:"200px", width:"100%", overflow:"hidden", overflowY:'scroll'}}>
                            <ul>
                                {console.log(id_subitem)}
                                {id_subitem.map((vls,vlsx)=>(
                                    <>
                                      <li style={{textAlign:"left",overflow:"hidden", textOverflow:"ellipsis"}}><a onClick={(event) => {ShowSubSeries(vls);}}><span style={{fontWeight:"500"}}>{vlsx+1}</span></a></li>
                                    </>
                                    ))}
                                
                                    
                            </ul>
                        </div>
                    </li>
                </ul>
                
              </div>
              
          </div>
          <button className='btn-save' onClick={UpdateSubSeries}> UPDATE </button>
          <button className='btn-save' style={{backgroundColor:"red"}}onClick={DeleteSubSeries}> DELETE </button>
          </>
          
        )}


            
            
        </div>
        
    </div></>: null}
    </>
  )
}

export default Ud_SubAnime