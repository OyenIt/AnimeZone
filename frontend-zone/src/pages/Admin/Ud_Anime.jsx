import React, {useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios';
import DatePicker from "react-datepicker"
import getYear from "date-fns/getYear"
import getMonth from "date-fns/getYear"

import apiConfig from '../../api/apiConfig';
import bg from '../../assets/footer-bg.jpg';
export const Ud_Anime = () => {
    const [items, setItems] = useState([])
    const [backdrop,setbackdrop] = useState("")
    const [poster,setposter] = useState("")
    const [series,setseries] = useState("")
    const [category,setcategory] = useState([])
    const [description,setdescription] = useState("")
    const [episode,setepisode] = useState("")
    const [genre,setgenre] = useState([])
    const [producers,setproducers] = useState("")
    const [rate,setrate] = useState(0)
    const [release,setrelease] = useState(new Date())
    const [status,setstatus] = useState("")
    const [trailer,settrailer] = useState("")
    const [id_item, setidItem] = useState(0)
    const [showTables, setShowTables] = useState(true);
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
    useEffect(() => {
        if(secret !== undefined){
          if (secret !== "koderahasia") {
            navigate('/')
          }else{
            fetch(apiConfig.baseUrl+"api/AzItemAnime/",{
                method:'GET',
                headers : {
                  'Content-Type':'application/json',
                }
              }).then((res) => {
                if (res.ok) return res.json()
              }).then((res) => setItems(res)).catch((err) => console.log(err));
            }
        }else{
          navigate('/')
        }
        }, [])
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
    const DeleteItem = (x) => {
        try {
            axios
            .delete(apiConfig.baseUrl+`api/AzItemAnime/${id_item}/`)
            .then((res) => {
              alert("SUKSES")
              window.location.reload(false)
            });
        } catch (error) {
            alert(error)
        }
    }
    const UpdateItem =  async() =>{
        let formField = new FormData()
        formField.append('backdrop_path',backdrop)
        formField.append('poster_path',poster)
        formField.append('series',series)
        category.map(function (ct) {  
            // console.log(ct)
            formField.append('category',ct)
        })
        formField.append('description',description)
        // formField.append('episode',episode)
        genre.map(function (gr) {
            formField.append('genres',gr)  
        })
        formField.append('producers',producers) 
        formField.append('rate',rate)
        formField.append('release',release.getFullYear()+"-"+(release.getMonth()+1) +"-"+release.getDate())
        formField.append('status',status)
        formField.append('trailer_link',trailer)
        try {
            axios
            .put(apiConfig.baseUrl+`api/AzItemAnime/${id_item}/`, formField)
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
    const showSeries  = () =>{
        items.map((val, key) =>{
          if(val.id === id_item){
            setposter(val.poster_path)
            setseries(val.series)
            setbackdrop(val.backdrop_path)
            setcategory(val.category)
            setdescription(val.description)
            setgenre(val.genres)
            setproducers(val.producers)
            setrate(val.rate)
            // setrelease(val.title)
            setstatus(val.status)
            settrailer(val.trailer_link)
            
          }
        })
    }
    function changeStateTables() {
        setShowTables(!showTables);
        showSeries();
    }
    const handleChangeCategory = e => {
        const { value, checked } = e.target;
        
        if (checked) {
          // push selected value in list
        //   if (value !==) {
            
        //   }
            setcategory(prev => [...prev, value]);
        } else {
          // remove unchecked value from the list
        //   if (condition) {
            setcategory(prev => prev.filter(x => x !== value));
          
           
        }
        console.log(category)
        console.log(checked)
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
    <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
    <div className="mb-2 movie-content container">
        <div className="movie-content__poster">
          
          {/* <button className='btn-update' onClick={showUpdate} > UPDATE </button>
          <button className='btn-delete' onClick={DeletItem}> DELETE </button> */}
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
                  <th className='poster-head' style={{width:"200px"}}>POSTER</th>
                  <th className='title-head'>SERIES</th>
                  <th style={{width:"500px"}}>Description</th>
                  <th>DELETE</th>
                  
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
                          <td><div  style={{marginTop:"-20px",height:"100px", overflow:"hidden", textOverflow:"ellipsis" }}>{val.description}</div></td>
                          <td><div className='poster-box'><button onClick={() => DeleteItem(val.id)} style={{width:"80%", height:"50px", backgroundColor:"#ff1f47", color:"white", fontWeight:"600"}}>DELETE</button></div></td>
                        
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
                <li><h4>BACKDROP</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Backdrop" name='backdrop' value={backdrop}
                    onChange={(e) => setbackdrop(e.target.value)}/></li>
                <li><h4>POSTER</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Backdrop" name='backdrop' value={backdrop}
                    onChange={(e) => setbackdrop(e.target.value)}/></li>
                <li><h4>TITLE</h4></li>
            
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter Title" name='title' value={series}
                   onChange={(e) => setseries(e.target.value)} /></li>
                <li><h4>CATEGORY</h4></li>
                <li>:</li>
                <li>
                    <ul className='grid-container-check'>
                    {categorys.map(function(ct){
                        var checkCategory = "";
                        for (let index = 0; index < category.length; index++) {
                            // const element = array[index];
                            if (ct === category[index]) {
                                checkCategory = category[index]
                                break;
                            }
                        }
                        if (checkCategory === ct) {
                            return <li className='text-center'><input
                            type="checkbox"
                            name="category"
                            value={[ct]}
                            onChange={handleChangeCategory}
                            checked/> <h5 className='h5-normal'>{ct}</h5></li>
                        }else{
                            return <li className='text-center'><input
                            type="checkbox"
                            name="category"
                            value={[ct]}
                            onChange={handleChangeCategory}
                            /> <h5 className='h5-normal'>{ct}</h5></li>
                        }
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
                        var checkGenre = "";
                        for (let index = 0; index < genre.length; index++) {
                            // const element = array[index];
                            if (gr === genre[index]) {
                                checkGenre = genre[index]
                                break;
                            }
                        }
                        if (checkGenre === gr) {
                            return <li className='text-center'><input
                            type="checkbox"
                            name="genre"
                            value={[gr]}
                            onChange={handleChangeGenre}
                            checked
                            /> <h5 className='h5-normal'>{gr}</h5></li>
                        }else{
                            return <li className='text-center'><input
                            type="checkbox"
                            name="genre"
                            value={[gr]}
                            onChange={handleChangeGenre}
                            /> <h5 className='h5-normal'>{gr}</h5></li>
                        }
                        
                    
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
                <li><h4>TRAILER</h4></li>
                <li>:</li>
                <li><input className='input-data' type="text" placeholder="Enter stream" name='stream' value={trailer}
                    onChange={(e) => settrailer(e.target.value)}/></li>
            </ul>
            <div className='series'>
                <img className='poster' src={poster} alt="" />
                <h1>{series}</h1>
            </div>
              
          </div>
          <button className='btn-save' onClick={UpdateItem}> SAVE </button>
          </>
          
        )}


            
            
        </div>
        
    </div>
    </>
  )
}

export default Ud_Anime