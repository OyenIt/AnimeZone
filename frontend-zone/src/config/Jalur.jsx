import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Setup from '../pages/Setup';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import AddMovie from '../pages/Admin/AddMovie';
import AddAnime from '../pages/Admin/AddAnime';
import AddSubAnime from '../pages/Admin/AddSubAnime';
import Ud_Movie from '../pages/Admin/Ud_Movie';
import Ud_Anime from '../pages/Admin/Ud_Anime';
import Ud_SubAnime from '../pages/Admin/Ud_SubAnime';
// import UpdateDelPage from '../pages/Admin/UpdateDelPage';
// import UpdateDelPageS from '../pages/Admin/UpdateDelPageS';
// import login_page from '../pages/login/login_page';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import About_us from '../pages/About_us';
import Contact_Us from '../pages/Contact_Us';


const Jalur = () => {
    return (
        <Routes>
            {/* <Route
                path='/basecamp/Update/subseries/:secret'
                exac
                element={<UpdateDelPageS/>}
            />
            <Route
                path='/basecamp/Update/series/:secret'
                exac
                element={<UpdateDelPage/>}
            /> */}
            <Route
                path='/basecamp/ud_subanime/:secret'
                exac
                element={<Ud_SubAnime/>}
            />
            <Route
                path='/basecamp/ud_anime/:secret'
                exac
                element={<Ud_Anime/>}
            />
            <Route
                path='/basecamp/ud_movie/:secret'
                exac
                element={<Ud_Movie/>}
            />
            <Route
                path='/basecamp/add_anime/:secret'
                exac
                element={<AddAnime/>}
            />
            <Route
                path='/basecamp/add_movie/:secret'
                exac
                element={<AddMovie/>}
            />
            <Route
                path='/basecamp/add_sub_anime/:secret'
                exac
                element={<AddSubAnime/>}
            />
            <Route
                path='/basecamp/:secret'
                exac
                element={<Setup/>}
            />
            <Route
                path='/:tipe/search/:keyword'
                element={<Catalog/>}
            />
            <Route
                path='/:tipe/detail/:slug'
                element={<Detail/>}
            />
            <Route
                path='/:tipe/genre/:genre'
                element={<Catalog/>}
            />
            <Route
                path='/:tipe/:category'
                element={<Catalog/>}
            />
            <Route
                path='/:tipe'
                element={<Catalog/>}
            />
            <Route
                path='/search/:keyword'
                exac
                element={<searchPage/>}
            />
            <Route
                path='/aboutus'
                exact
                element={<About_us/>}
            />
            <Route
                path='/privacypolicy'
                exact
                element={<PrivacyPolicy/>}
            />
            <Route
                path='/contactus'
                exact
                element={<Contact_Us/>}
            />
            <Route
                path='/'
                exact
                element={<Home/>}
            />
        </Routes>
    );
}

export default Jalur;
