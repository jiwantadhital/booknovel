import './App.css';
import {Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Header from './components/Header'
import About from './routes/About';

import Books from './routes/Books';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
            <Header/>

<Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/all' element={<Books/>}/>
        {/* <Route path='/about' element={<All/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/about' element={<About/>}/> */}
      </Routes>  
<Footer/>
        </div>
  );
}

export default App;
