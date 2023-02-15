import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import apiConfig from '../../api/apiConfig';
import { tipe } from '../../api/AZapi';

const MovieGrid = props => {

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();
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
                        if(props.category !== undefined){
                            fetch(apiConfig.baseUrl+`api/AzItemAnime/`,{
                            method:'GET',
                            headers : {
                                'Content-Type':'application/json',
                            }
                            
                            }).then((res) => {
                            if (res.ok) return res.json()
                            }).then((res) => setItems(res)).catch((err) => console.log(err));
                        }else if(props.category !== undefined){
                            fetch(apiConfig.baseUrl+`api/AzItemAnime/`,{
                            method:'GET',
                            headers : {
                                'Content-Type':'application/json',
                            }
                            
                            }).then((res) => {
                            if (res.ok) return res.json()
                            }).then((res) => setItems(res)).catch((err) => console.log(err));
                        }else{
                            fetch(apiConfig.baseUrl+`api/AzItemAnime/`,{
                            method:'GET',
                            headers : {
                                'Content-Type':'application/json',
                            }
                            
                            }).then((res) => {
                            if (res.ok) return res.json()
                            }).then((res) => setItems(res)).catch((err) => console.log(err));
                            
                            
                        }
                        break;
                    default:
                        alert("404")
                        break;
                }
            }
            else{
                fetch(apiConfig.baseUrl+`film/search/item/${keyword}`,{
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

    return (
        <>
        
            <div className="section mb-3">
                {/* <h1>{props.tipe}</h1> */}
                <MovieSearch tipe={props.tipe} keyword={keyword}/>
                
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard tipe={props.tipe} item={item} key={i}/>)
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
                history(`/${props.category}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
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
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid;
