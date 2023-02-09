import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

// import { category as cate } from '../api/tmdbApi';
import { category as cate } from '../api/enjeApi';
import MovieGrid from '../components/movie-grid/MovieGrid';

const searchPage = () => {

    const { category } = useParams();

    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'Anime'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/> 
                </div>
            </div>
        </>
    );
}

export default searchPage;
