import React from 'react';
import './SetItem.scss';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';

const SetItem = () => {
    const [backdrop,setbackdrop] = useState(null)
    const [poster,setposter] = useState(null)
    const [title,settitle] = useState("")
    const [category,setcategory] = useState([])
    const [description,setdescription] = useState("")
    const [episode,setepisode] = useState("")
    const [genr,setgenr] = useState([])
    const [producers,setproducers] = useState("")
    const [rate,setrate] = useState(0)
    const [release,setrelease] = useState("")
    const [status,setstatus] = useState("")
    const [link_360,setlink_360] = useState("")
    const [link_480,setlink_480] = useState("")
    const [link_720,setlink_720] = useState("")
    const [link_1080,setlink_1080] = useState("")
    const [link1_360,setlink1_360] = useState("")
    const [link1_480,setlink1_480] = useState("")
    const [link1_720,setlink1_720] = useState("")
    const [link1_1080,setlink1_1080] = useState("")
    const [slug,setslug] = useState("")
    const config = {headers:{"Content-Type":"application/json"}}

    var categorys = ['Movie','Anime'];
    var genres = ['Action', 'Adventure', 'Cars','Comedy','Crime',
    'Demons', 'Drama', 'Ecchi','Fantasy','Game',
    'Harem', 'Historical', 'Horror','Josei','Kids',
    'Magic', 'Martial Arts', 'Mecha','Military','Music',
    'Mystery', 'Parody', 'Police','Pyschologic','Romance',
    'Samurai', 'School', 'Sci-Fi','Seinen','Shoujo',
    'Shoujo Ai', 'Shounen', 'Police','Shounen Ai','Slice of Life',
    'Space', 'Sports', 'Supernatural','Super Power','Thriller',
    'Vampire'];

    const history = useNavigate();
    const addItem =  async() =>{
        let formField = new FormData()
        
        if(backdrop !== null && poster !== null){
            formField.append('backdrop_path',backdrop)
            formField.append('poster_path',poster)
        }
        formField.append('title',title)
        formField.append('category',category)
        formField.append('description',description)
        formField.append('episode',episode)
        formField.append('genres',genr)
        formField.append('producers',producers)
        formField.append('rate',rate)
        formField.append('release',release)
        formField.append('status',status)
        formField.append('link_360',[link_360,link1_360])
        formField.append('link_480',[link_480,link1_480])
        formField.append('link_720',[link_720,link1_720])
        formField.append('link_1080',[link_1080,link1_1080])
        formField.append('slug',slug)
        // alert(formField)
        
        try {
            // await axios.post({
           await axios.post({
            method : 'post',
            url : apiConfig.baseUrl+'api/enjeItem/', 
            data : formField,
            

           }).then((response)=>{
            console.log(response.data)
            history('/')
           })
            // axios
            // .post("http://localhost:8000/api/njItem/", formField)
            // .then((res) => this.refreshList());
        } catch (error) {
            alert(error)
        }
        
        
    }
    const handle =() =>{
        
        alert(link_360)
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
          setgenr(prev => [...prev, value]);
        } else {
          // remove unchecked value from the list
          setgenr(prev => prev.filter(x => x !== value));
        }
      }
    // const hndle_active = check =>()=>{

    // }
  return (
    <>
    <div className="banner" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original//rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg")`}}></div>
    <div className="mb-3 movie-content container">
        <div className="movie-content__poster">
            <div className="movie-content__poster__img" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original//jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg")`}}></div>
        </div>
        <div className="movie-content__info">
            <h1>SETUP ITEM</h1>
            <div className="genres">     
                <span className='label_input'>
                    Backdrop : <input type="file" className='checkbox-outline' name='backdrop' value={backdrop}
                    onChange={(e) => setbackdrop(e.target.value)}/></span>
            </div>
            <div className="genres">     
                <span className='label_input'>
                    Poster   : <input type="file" className='checkbox-outline' name='poster' value={poster}
                    onChange={(e) => setposter(e.target.value)}/></span>
            </div>
            <div className="genres">     
                <span className='label_input'>
                    title : 
                    <input type="text" placeholder="Enter keyword"
                    name='title'
                    value={title}
                    onChange={(e) => settitle(e.target.value)}/></span>
            </div>
            <div className="genres">     
                <span className='label_input'>
                    episode : 
                    <input type="text" placeholder="Enter keyword"
                    name='episode'
                    value={episode}
                    onChange={(e) => setepisode(e.target.value)}/></span>
            </div>
            <div className="genres">     
                <span className='label_input'>
                    producers : 
                    <input type="text" placeholder="Enter keyword"
                    name='producers'
                    value={producers}
                    onChange={(e) => setproducers(e.target.value)}/></span>
            </div>
            <div className="genres">     
                <span className='label_input'>description : 
                    <input type="text" placeholder="Enter keyword"
                    name='description'
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}/></span>
            </div>
            <div className="genres">     
                <span className='label_input'>rate : 
                    <input type="text" placeholder="Enter keyword"
                    name='rate'
                    value={rate}
                    onChange={(e) => setrate(e.target.value)}/></span>
            </div>
            <div className="genres">     
                <span className='label_input'>status : 
                    <input type="text" placeholder="Enter keyword"
                    name='status'
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}/></span>
            </div>
            <div className="genres">     
                <span className='label_input'>release date : 
                    <input type="text" placeholder="Enter keyword"
                    name='release'
                    value={release}
                    onChange={(e) => setrelease(e.target.value)}/></span>
            </div>
            <div className="genres">
                <h4>category :</h4>
                {categorys.map(function(category){
                    return <span><input
                    type="checkbox"
                    name="category"
                    value={[category]}
                    onChange={handleChangeCategory}
                  />{category}</span>
                })}
            </div>
            <div className="genres">
                <h4>genre :</h4>
                {genres.map(function(genre){
                    return <span><input
                    type="checkbox"
                    name="genr"
                    value={[genre]}
                    onChange={handleChangeGenre}
                  />{genre}</span>
                })}
                
            </div>
            <h3>Link Download:</h3>
            <div className="genres"> 
                <h4>360 :</h4>    
                <span className='label_input'>
                    <input type="text" placeholder="Enter keyword"
                        name='link_360'
                        value={link_360}
                        onChange={(e) => setlink_360(e.target.value)}/>
                        <input type="text" placeholder="Enter keyword"
                        name='link1_360'
                        value={link1_360}
                        onChange={(e) => setlink1_360(e.target.value)}/>
                </span>
            </div>
            <div className="genres"> 
            <h4>480 :</h4>     
                <span className='label_input'>
                    <input type="text" placeholder="Enter keyword"
                        name='link_480'
                        value={link_480}
                        onChange={(e) => setlink_480(e.target.value)}/>
                        <input type="text" placeholder="Enter keyword"
                        name='link1_480'
                        value={link1_480}
                        onChange={(e) => setlink1_480(e.target.value)}/>
                </span>
            </div>
            <div className="genres"> 
            <h4>720 :</h4>     
                <span className='label_input'>
                    <input type="text" placeholder="Enter keyword"
                        name='link_720'
                        value={link_720}
                        onChange={(e) => setlink_720(e.target.value)}/>
                        <input type="text" placeholder="Enter keyword"
                        name='link1_720'
                        value={link1_720}
                        onChange={(e) => setlink1_720(e.target.value)}/>
                </span>
            </div>
            <div className="genres"> 
            <h4>1080 :</h4>     
                <span className='label_input'>
                    <input type="text" placeholder="Enter keyword"
                        name='link_1080'
                        value={link_1080}
                        onChange={(e) => setlink_1080(e.target.value)}/>
                        <input type="text" placeholder="Enter keyword"
                        name='link1_1080'
                        value={link1_1080}
                        onChange={(e) => setlink1_1080(e.target.value)}/>
                </span>
            </div>
            <div className="genres">     
                <span className='label_input'>slug : 
                    <input type="text" placeholder="Enter keyword"
                    name='slug'
                    value={slug}
                    onChange={(e) => setslug(e.target.value)}/></span>
            </div>
            <button className='btn-save' onClick={addItem}> SAVE </button>
        </div>
    </div>
    </>
         
    
  )
}

export default SetItem