import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import About_us from '../pages/About_us';
import Contact_Us from '../pages/Contact_Us';
import LoginPage from '../pages/Admin/loginPage';
import AdminMenu from '../pages/Admin/AdminMenu';
import Logout from '../pages/Admin/logoutPage';
import AddMovie from '../pages/Admin/AddMovie';
import AddAnime from '../pages/Admin/AddAnime';
import AddSubAnime from '../pages/Admin/AddSubAnime';
import Ud_Movie from '../pages/Admin/Ud_Movie';
import Ud_Anime from '../pages/Admin/Ud_Anime';
import Ud_SubAnime from '../pages/Admin/Ud_SubAnime';
import NotFound from '../pages/NotFound';
// import AdsPage from '../pages/adsPage/adsPage'


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
            {/* <Route
                path='/generate-link-download'
                exac
                element={<AdsPage/>}
            /> */}
            <Route
                path='/basecamp/ud_subanime'
                exac
                element={<Ud_SubAnime/>}
            />
            <Route
                path='/basecamp/ud_anime'
                exac
                element={<Ud_Anime/>}
            />
            <Route
                path='/basecamp/ud_movie'
                exac
                element={<Ud_Movie/>}
            />
            <Route
                path='/basecamp/add_anime'
                exac
                element={<AddAnime/>}
            />
            <Route
                path='/basecamp/add_movie'
                exac
                element={<AddMovie/>}
            />
            <Route
                path='/basecamp/add_sub_anime'
                exac
                element={<AddSubAnime/>}
            />
            {/* <Route
                path='/' 
            /> */}
            <Route
                path='/basecamp/logout'
                exac
                element={<Logout/>}
            />
            <Route
                path='/basecamp/menu'
                exac
                element={<AdminMenu/>}
            />
            <Route
                path='/basecamp'
                exac
                element={<LoginPage/>}
            />
            <Route
                path='/:tipe/search/:keyword'
                element={<Catalog/>}
            />
            <Route
                path='/:tipe/detail/:slug'
                element={<Detail/>}
            />
            {/* <Route
                path='/:tipe/genre/:category'
                element={<Catalog/>}
            /> */}
            <Route
                path='/:tipe/:category/:genre'
                element={<Catalog/>}
            />
            <Route
                path='/:tipe/:category'
                element={<Catalog/>}
            />
            {/* <Route
                path='/:tipe/:category'
                element={<Catalog/>}
            /> */}
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
            <Route path='/NotFound' element={<NotFound />} status={404} />
        </Routes>
    );
}

export default Jalur;
