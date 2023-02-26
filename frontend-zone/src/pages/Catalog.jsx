import React from 'react';
import { useParams } from 'react-router';
import PageHeader from '../components/page-header/PageHeader';
import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {

    const { category,keyword,tipe,genre } = useParams();
 
    return ( 
        <>
            <PageHeader>
                {tipe === "Movie" ? 'Movie' : 'Anime'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid tipe={tipe} category={category}  keyword={keyword} genre={genre}/> 
                </div>
            </div>
        </>
    );
}

export default Catalog;
