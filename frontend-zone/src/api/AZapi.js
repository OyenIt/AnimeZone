import axiosClient from "./axiosClient";

export const tipe = {
    movie: 'Movie',
    anime: 'Anime'
}

export const category = {
    newUpdate: 'newUpdate',
    popular: 'Popular',
    top_rated: 'top_rated',
    trending: 'Trending'
}


const enjeApi = {
    getMoviesList: (type, params) => {
        const url = 'http://127.0.0.1:8000/movie' ;
        return axiosClient.get(url);
    },
    getAnimeList: (type, params) => {
        const url = 'film/category/Anime/';
        return axiosClient.get(url);
    },
    getTypeList: (categorys, type) => {
        const url = 'film/category/'+categorys +'/' +type +'';
        return axiosClient.get(url);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
}

export default enjeApi;