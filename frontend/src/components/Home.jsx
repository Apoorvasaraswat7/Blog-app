import React from 'react'
import Hero from '../Home/Hero'
import Trending from '../Home/Trending'
import Devotional from '../Home/Devotional'
import Politics from '../Home/Politics'
import Creator from '../Home/Creator'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      
      <Devotional></Devotional>
      <Trending></Trending>
      <Politics></Politics>
      <Creator></Creator>
    </div>
  )
}

export default Home

