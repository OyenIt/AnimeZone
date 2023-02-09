
import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Jalur from './config/Jalur';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<>
            <Header />
            <Jalur/>
            <Footer/>
            </>} 
        />
        
      </Routes>
  </BrowserRouter>
  );
}

export default App;
