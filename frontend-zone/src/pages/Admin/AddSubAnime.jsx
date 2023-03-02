import React, {useEffect,useState } from 'react';
import './AddSubAnime.scss';
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
import {RxUpdate} from 'react-icons/rx';

const AddSubAnime = () => {
    var link_360 = ['','','','',''];
    var link_480 = ['','','','',''];
    var link_720 = ['','','','',''];
    var link_1080 = ['','','','',''];
    const [poster,setposter] = useState("")
    const [series,setseries] = useState("")
    const [category,setcategory] = useState([])
    const [title,settitle] = useState("")
    var   [link_360,setlink_360] = useState([])
    var   [link_480,setlink_480] = useState([])
    var   [link_720,setlink_720] = useState([])
    var   [link_1080,setlink_1080] = useState([])
    const [stream_link,setstream_link] = useState("")
    const [upload_at, setupload_at] = useState(new Date())
    const [slug,setslug] = useState("")
    const [items, setItems] = useState([])
    const [id_item, setidItem] = useState(0)

    

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
            axios.get(apiConfig.baseUrl+'api/AzItemAnime',{headers:{'Content-Type': 'application/json'}}).then(res => {
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
    const showSeries  = () =>{
        items.map((val, key) =>{
          if(val.id === id_item){
            setposter(val.poster_path)
            setseries(val.series)
            setcategory(val.category)
            // setrelease(val.title)
          }
        })
    }
    const addItem =  async() =>{
        let formField = new FormData()
        alert(series)
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
            axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token') 
            axios
            .post(apiConfig.baseUrl+"api/AzSubItemAnime/", formField)
            .then((res) => {
              alert("SUKSES")
              window.location.reload(false)
            });
        } catch (error) {
            alert(error)
        }
        
        
    } 

    const [rowIndexClicked, setRowIndexClicked] = useState(null);
    const handlerRowClicked = (rowIndex,id) => (event) => {
        if (rowIndexClicked !== rowIndex) {
          // handle if user clicks again the same row
          setRowIndexClicked(rowIndex);
          setidItem(id)
          
        } else {
          setRowIndexClicked(null); // set clicked row to null if same row is selected
        }
      };

      const [showTables, setShowTables] = useState(true);

      function changeStateTables() {
        setShowTables(!showTables);
        showSeries();
      }
      // const Test = (x) => {
      //   return (
      //       <li className="link-download">1</li>
      //   );
      // }
      
  return (
    <>
    {My_Friends ? <><div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
    <div className="mb-2 movie-content container">
        <div className="movie-content__poster">
        <div className="genres" >
              <Link to="/basecamp/menu"><FaHome size="40px"/></Link>
            </div>
        </div>
        <div className="movie-content__info">
        {showTables ? (
        <>
        {/* <button onClick={changeStateTables}> Display </button> */}
        <a onClick={changeStateTables}><RxUpdate size="30px" /></a>
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
                        onClick={handlerRowClicked(key,val.id)}>
                          <td className='text-center'>
                            <div className='poster-box'>
                              <img className='poster-series' src={val.poster_path} alt="" />
                            </div>
                          </td>
                          <td ><div className='poster-box'>{val.series}</div></td>
                          <td><div className='poster-box'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum pariatur repudiandae ipsam quidem, explicabo, necessitatibus veniam cumque dolores, temporibus unde perferendis eius iure iste eum dignissimos architecto ratione laboriosam.</div></td>
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

          {/* <button onClick={changeStateTables}> Hide </button> */}
          <a onClick={changeStateTables}><RxUpdate size="30px"/></a>
          
          
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
                            onChange={(e) => link_360[0]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link2'
                             onChange={(e) => link_360[1]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link3' 
                            onChange={(e) => link_360[2]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link4' 
                            onChange={(e) => link_360[3]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link5' 
                            onChange={(e) => link_360[4]=e.target.value}/>
                            
                        </li>
                    </ul>
                </li>
                <li><h4>LINK 480</h4></li>
                <li>:</li>
                <li>
                    <ul className='container-link-dowload'>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link6' 
                            onChange={(e) =>link_480[0]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link7'
                            onChange={(e) => link_480[1]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link8'
                            onChange={(e) => link_480[2]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link9' 
                            onChange={(e) => link_480[3]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link10' 
                            onChange={(e) => link_480[4]=e.target.value}/>
                            
                        </li>
                    </ul>
                    
                </li>
                <li><h4>LINK 720</h4></li>
                <li>:</li>
                <li>
                    <ul className='container-link-dowload'>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link11' 
                            onChange={(e) => link_720[0]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link12' 
                            onChange={(e) => link_720[1]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link13' 
                            onChange={(e) => link_720[2]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link14' 
                            onChange={(e) => link_720[3]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link15' 
                            onChange={(e) => link_720[4]=e.target.value}/>
                            
                        </li>
                    </ul>
                </li>
                <li><h4>LINK 1080</h4></li>
                <li>:</li>
                <li>
                    <ul className='container-link-dowload'>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link16' 
                            onChange={(e) => link_1080[0]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link17' 
                            onChange={(e) => link_1080[1]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link18' 
                            onChange={(e) => link_1080[2]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link19' 
                            onChange={(e) => link_1080[3]=e.target.value}/>
                            
                        </li>
                        <li className='container-link-dowload-item'>
                            <input className='input-data-link' type="text" placeholder="Google Drive" name='link20' 
                            onChange={(e) => link_1080[4]=e.target.value}/>
                            
                        </li>
                    </ul>
                </li>
                <li><h4>STREAM</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Stream" name='title' value={stream_link}
                    onChange={(e) => setstream_link(e.target.value)}/></li>
              </ul>
              <div className='series'>
                <img className='poster' src={poster} alt="" />
                <h1>{series}</h1>
              </div>
              
          </div>
          <button className='btn-save' onClick={addItem}> SAVE </button>
          </>
          
        )}


            
            
        </div>
        
    </div></>:null}
    </>
  )
}

export default AddSubAnime;