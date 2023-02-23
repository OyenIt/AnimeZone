import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import apiConfig from '../../api/apiConfig';
import { tipe } from '../../api/AZapi';
import { FaZhihu } from 'react-icons/fa';

const MovieGrid = props => {

    const [items, setItems] = useState([]);
    const [filterGenre, setfilterGenre] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword} = useParams();
    var listgenre = ['Action', 'Adventure', 'Cars','Comedy','Crime',
    'Demons', 'Drama', 'Ecchi','Fantasy','Game',
    'Harem', 'Historical', 'Horror','Josei','Kids',
    'Magic', 'Martial Arts', 'Mecha','Military','Music',
    'Mystery', 'Parody', 'Police','Pyschologic','Romance',
    'Samurai', 'School', 'Sci-Fi','Seinen','Shoujo',
    'Shoujo Ai', 'Shounen', 'Police','Shounen Ai','Slice of Life',
    'Space', 'Sports', 'Supernatural','Super Power','Thriller',
    'Vampire'];
    useEffect(() => {
        const getList = async () => {
            if (keyword === undefined){
                switch(props.tipe){
                    case tipe.movie:
                        fetch(apiConfig.baseUrl+`api/AzMovie/`,{
                            method:'GET',
                            headers : {
                                'Content-Type':'application/json',
                            }
                            
                            }).then((res) => {
                            if (res.ok) return res.json()
                            }).then((res) => setItems(res)).catch((err) => console.log(err));
                        break;
                    case tipe.anime:
                        if (props.category !== undefined) {
                            if (props.category === "genre") {
                                console.log(props.category)
                                if (props.genre !== undefined) {
                                    setfilterGenre([props.genre])
                                    console.log(props.genre)
                                }
                                console.log(props.genre)
                                fetch(apiConfig.baseUrl+`Anime/category/${props.category}`,{
                                    method:'GET',
                                    headers : {
                                        'Content-Type':'application/json',
                                    }
                                    
                                    }).then((res) => {
                                    if (res.ok) return res.json()
                                }).then((res) => setItems(res.slice(0,20))).catch((err) => console.log(err));
                            }else{
                                fetch(apiConfig.baseUrl+`Anime/category/${props.category}`,{
                                    method:'GET',
                                    headers : {
                                        'Content-Type':'application/json',
                                    }
                                    
                                    }).then((res) => {
                                    if (res.ok) return res.json()
                                }).then((res) => setItems(res.slice(0,20))).catch((err) => console.log(err));
                            }
                        }else{
                            fetch(apiConfig.baseUrl+`api/AzItemAnime/`,{
                                method:'GET',
                                headers : {
                                    'Content-Type':'application/json',
                                }
                                
                                }).then((res) => {
                                if (res.ok) return res.json()
                            }).then((res) => setItems(res.slice(0,20))).catch((err) => console.log(err));
                        }
                        break;
                    default:
                        alert("404")
                        break;
                }
            }
            else{
                fetch(apiConfig.baseUrl+`${props.tipe}/search/${keyword}`,{
                method:'GET',
                headers : {
                    'Content-Type':'application/json',
                }
                
                }).then((res) => {
                if (res.ok) return res.json()
                }).then((res) => setItems(res)).catch((err) => console.log(err));
            }
        }
        getList();
    }, [props.tipe,keyword]);
    // const loadMore = async () => {
    //     let response = null;
    //     if (keyword === undefined) {
    //         const params = {
    //             page: page + 1 
    //         };
    //         switch(props.category) {
    //             case category.movie:
    //                 response = await enjeApi.getMoviesList();
    //                 break;
    //             default:
    //                 response = await enjeApi.getAnimeList();
    //         }
    //     } else {
    //         const params = {
    //             page: page + 1,
    //             query: keyword
    //         }
    //         response = await enjeApi.search(props.category);
    //     }
    //     setItems([...items, ...response.results]);
    //     setPage(page + 1);
    // }

    const handleChangeGenre = e => {
        const { value, checked } = e.target;
        if (checked) {
          // push selected value in list
          if (filterGenre[0]!==value) {
            setfilterGenre(prev => [...prev, value]);
          }
        } else {
          // remove unchecked value from the list
          setfilterGenre(prev => prev.filter(x => x !== value));
        }
    }   
    
    return (
        <>
        
            <div className="section mb-3">
                {/* <h1>{props.tipe}</h1> */}
                <MovieSearch tipe={props.tipe} keyword={keyword}/>
                
                <div className="section mb-3">
                    <div class="dropdown">
                    <a><span><h4>Category+</h4></span></a>
                        <div class="dropdown-content">
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
                            {/* {listgenre.map((x)=> <a value={[x]} onClick={updateGenre}><p>{x}</p></a>)} */}
                        </div>
                    </div>
                    <div class="dropdown" style={{border:"none", marginLeft:"5px",marginRight:"5px"}}>
                        <a><span><h4>:</h4></span></a>
                    </div>
                    {/* <div className="section__header mb-2">
                        <h2>GENRE</h2>
                    </div> */}
                    
                    {filterGenre.map((x,z)=> 
                    <>
                    <span>   </span>
                        {/* <Link to={`/Anime/genre/${x}`}> */}
                            <OutlineButton className="small" onClick={() => setfilterGenre(prev => prev.filter(x => x !== filterGenre[z]))}>{x}</OutlineButton>
                        {/* </Link> */}
                    </>
                        
                    )}
                    
        </div>
                
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) => {
                        // console.log(filterGenre)
                        var gnrvalid = false
                        if (filterGenre.length !== 0){
                            filterGenre.map((gnr) => {
                                // item.genres.map((gnrCheck) => console.log(gnrCheck))
                                if (item.genres.some((gnrCheck) => gnrCheck === gnr)) {
                                    console.log("entah lah")
                                    gnrvalid=true
                                    
                                }
                            })
                        }
                        if (gnrvalid) {
                            return <MovieCard tipe={props.tipe} item={item} key={i}/>
                        }else if(filterGenre.length === 0){
                            return <MovieCard tipe={props.tipe} item={item} key={i}/>
                        }
                        // return {if(gnrvalid){}}
                    })
                }
                
            </div>
            {/* {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            } */}
        </>
    );
}

const MovieSearch = props => {
    
    const history = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history(`/${props.tipe}/search/${keyword}`);
            }
        },
        [keyword, props.tipe, history]
    );
 
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
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
            
            <Button className="small" onClick={goToSearch}>Search</Button>
            
            
            
        </div>
        
        </>
    )
}

export default MovieGrid;
