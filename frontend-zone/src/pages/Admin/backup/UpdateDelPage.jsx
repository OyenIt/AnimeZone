import React, { useState, useEffect } from 'react';
import './UpdateDelPage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';

import DatePicker from "react-datepicker";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";
import "react-datepicker/dist/react-datepicker.css";

import bg from '../../assets/footer-bg.jpg';
const UpdateDelPage = () => {
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
  const [slug,setslug] = useState("")

  const [itemnime,setitemnime] = useState([])
  
  const [id_item, setidItem] = useState(0)
  const [items, setItems] = useState([])
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
  var categorys = ['Movie','Anime'];
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
  const { secret} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(secret !== undefined){
      if (secret !== "koderahasia") {
        navigate('/')
      }else{
        fetch(apiConfig.baseUrl+"api/enjeItem/",{
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
  const showUpdate  = () =>{
    items.map((val, key) =>{
      if(val.id === id_item){
        setbackdrop(val.backdrop_path)
        setposter(val.poster_path)
        setseries(val.series)
        setcategory(val.category)
        setdescription(val.description)
        setepisode(val.episode)
        setgenre(val.genres)
        setproducers(val.producers)
        setrate(val.rate)
        setstatus(val.status)
        settrailer(val.trailer_link)
        setslug(val.slug)

        setitemnime(val.itemanime)
        // setrelease(val.title)
      }
   })
  }
  const UpdateItem =  async() =>{
      let formField = new FormData()
       
      formField.append('backdrop_path',backdrop)
      formField.append('poster_path',poster)
      formField.append('series',series)
      category.map(function (ct) {  
          formField.append('category',ct)
      })
      
      formField.append('description',description)
      formField.append('episode',episode)
      genre.map(function (gr) {
          formField.append('genres',gr)  
      })
      formField.append('producers',producers)
      formField.append('rate',rate)
      formField.append('status',status)
      formField.append('trailer_link',trailer)
      formField.append('slug',slug)
        // alert(formField)
        
      try {
          axios
          .put(apiConfig.baseUrl+`api/enjeItem/${id_item}/`, formField)
          .then((res) => {
            alert("SUKSES")
            window.location.reload(false)
          });
      } catch (error) {
            alert(error)
      }
        
        
    }
    const DeletItem =  async() =>{
      try {
        axios
        .delete(apiConfig.baseUrl+`api/enjeItem/${id_item}`)
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
    <div className="banner" style={{backgroundImage: `url(${bg})`}}></div>
    <div className="mb-3 movie-content container">
        <div className="movie-content__poster">
          <table>
            <tr>
              <th>Title</th>
              <th>Category</th>
              
            </tr>
            {items.map((val, key) => {
              return (
                <tr
                key={key}
                id={key}
                className={rowIndexClicked === key ? "clicked-class" : ""}
                onClick={handlerRowClicked(key,val.id)}
              >
                  <td>{val.series}</td>
                  <td>{val.category}</td>
                </tr>
              )
            })}
          </table>
          <button className='btn-update' onClick={showUpdate} > UPDATE </button>
          <button className='btn-delete' onClick={DeletItem}> DELETE </button>
          
          </div>
        <div className="movie-content__info">
            <h1>SETUP ITEM</h1>
            <div className="genres">     
                <span className='label_input'>
                    Backdrop :</span>
                    <input type="text" placeholder="Enter keyword" name='backdrop' value={backdrop}
                    onChange={(e) => setbackdrop(e.target.value)}/>
            </div>
            <div className="genres">     
                <span className='label_input'>
                    Poster   :</span>
                    <input type="text" placeholder="Enter keyword" name='poster' value={poster}
                    onChange={(e) => setposter(e.target.value)}/>
            </div>
            <div className="genres">     
                <span className='label_input'>
                    Series :</span>
                    <input type="text" placeholder="Enter keyword"
                    name='series'
                    value={series}
                    onChange={(e) => setseries(e.target.value)}/>
            </div>
            <div className="genres">     
                <span className='label_input'>
                    Episode :</span>
                    <input type="text" placeholder="Enter keyword"
                    name='episode'
                    value={episode}
                    onChange={(e) => setepisode(e.target.value)}/>
            </div>
            <div className="genres">     
                <span className='label_input'>
                    Producers : </span>
                    <input type="text" placeholder="Enter keyword"
                    name='producers'
                    value={producers}
                    onChange={(e) => setproducers(e.target.value)}/>
            </div>
            <div className="genres">     
                <span className='label_input'>Description :</span>
                <input type="text" placeholder="Enter keyword"
                    name='description'
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}/>
            </div>
            <div className="genres">     
                <span className='label_input'>Rate :</span>
                <input type="text" placeholder="Enter keyword"
                    name='rate'
                    value={rate}
                    onChange={(e) => setrate(e.target.value)}/>
            </div>
            <div className="genres">     
                <span className='label_input'>Status :</span>
                    <input type="text" placeholder="Enter keyword"
                    name='status'
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}/>
            </div>
            <div className='genres'>
                <span className='label_input'>Release Date : </span>
                <DatePicker
                    
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
                    />
            </div>
            <div className="genres">
                <h4>Category :</h4>
                {categorys.map(function(categorye){
                  if(category.indexOf(categorye)>-1){
                    return <span><input
                    type="checkbox"
                    name="category"
                    checked={true}
                    value={[categorye]}
                    onChange={handleChangeCategory}
                  />{categorye}</span>
                  }else{
                    return <span><input
                    type="checkbox"
                    name="category"
                    checked={false}
                    value={[categorye]}
                    onChange={handleChangeCategory}
                  />{categorye}</span>
                  }
                   
                })}
            </div>
            <div className="genres">
                <h4>Genre :</h4>
                {listgenre.map(function(lsgenre){
                    if(genre.indexOf(lsgenre) > -1){
                      return <span><input
                      type="checkbox"
                      name="genre"
                      checked={true}
                      value={[lsgenre]}
                      onChange={handleChangeGenre}
                    />{lsgenre}</span>
                    }
                    else{
                      return <span><input
                      type="checkbox"
                      name="genre"
                      checked={false}
                      value={[lsgenre]}
                      onChange={handleChangeGenre}
                    />{lsgenre}</span>
                    }
                })}
                
            </div>
            <div className="genres">
                <span className='label_input'>
                    Trailer :</span>
                    <input type="text" placeholder="Enter keyword"
                    name='trailer'
                    value={trailer}
                    onChange={(e) => settrailer(e.target.value)}/>
            </div>
            <div className="genres">     
                <span className='label_input'>Slug : 
                    <input type="text" placeholder="Enter keyword"
                    name='slug'
                    value={slug}
                    onChange={(e) => setslug(e.target.value)}/></span>
            </div>
            <button className='btn-save' onClick={UpdateItem}> SAVE </button>
        </div>
    </div>
    </>
  )
}

export default UpdateDelPage;