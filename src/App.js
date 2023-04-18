import './App.css';
import {Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Header from './components/Header'
import About from './routes/About';
import BookDetail from './routes/BookDetail.js';
import Books from './routes/Books';
import Footer from './components/Footer';
import LoginRegister from './routes/auth/LoginRegister';
import BookAttribute from './routes/home/BookAttributes/BookAttribute';
import ChapterDetails from './routes/home/BookDetails/ChapterDetails';
import Contact from './routes/Contact';
import Liked from './routes/userlikes/Liked';

function App() {
  return (
    <div className="App">

<Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/all' element={<Books/>}/>
        <Route path="/product-details" element={<BookDetail/>}/>
        <Route path="/product-attribute" element={<BookAttribute/>}/>
        <Route path='/loginRegister' element={<LoginRegister/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/chapterDetails' element={<ChapterDetails/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/liked' element={<Liked/>}/>

        {/* <Route path='/about' element={<About/>}/>
        <Route path='/about' element={<About/>}/> */}
      </Routes>  
        </div>
  );
}

export default App;
