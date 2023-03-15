import React from 'react'
import BestCategories from './home/BestCategories'
import Carousel from './home/Carousel'
import MostPpular from './home/MostPpular'

const Home = () => {
  return (
    <div>
        <Carousel/>
        <BestCategories/>
        <MostPpular/>
    </div>
  )
}

export default Home