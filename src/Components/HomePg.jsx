import React from 'react'
import TopNav from './TopNav'
import MidNav from './MidNav'
import BottomNav from './BottomNav'
import BestSeller from './BestSeller'
import Allcategories from './Allcategories'
import Footer from './Footer'

function HomePg() {
  return (
    <div>
        <TopNav/>
        <MidNav/>
        <BottomNav/>
        <BestSeller/>
        <Allcategories/>
        <Footer/>
    </div>
  )
}

export default HomePg