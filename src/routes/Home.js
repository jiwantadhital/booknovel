import BestCategories from './home/BestCategories'
import Carousel from './home/Carousel'
import React, { useState,useEffect } from 'react';

import MostPpular from './home/MostPpular'
import Header from '../components/Header'
import Footer from '../components/Footer';
import Recommended from './home/Recommended'
const Home = () => {
  const [isLoggedIn, setActiveTab] = useState(false);
  const datas = localStorage.getItem('token');
  const handleTabClick = () => {
      if(datas != null){
          setActiveTab(true);
       }
    };
    useEffect(() => {
      if(datas != null){
          setActiveTab(true);
       }
    }, isLoggedIn);
  return (
    <div>
                          <Header/>

        <Carousel/>
        <BestCategories/>{
         isLoggedIn==true? <Recommended/>:<div></div>
        }
        <MostPpular/>
        <Footer/>

    </div>
  )
}

export default Home