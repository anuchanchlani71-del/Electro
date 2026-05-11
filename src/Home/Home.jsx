import React from 'react'
import Navbar from '../Navbar'
import Slider from './Slider'
import Services from './Services'
import Offers from './Offers'

import Bestseller from './Bestseller'
import Footer from '../Footer'
import Topbar from '../Topbar'
import OurProduct from '../Bestseller/OurProduct'

export default function Home() {
  return (
    <div>
      <Topbar/>
        <Navbar/>
        <Slider/>
        <Services/>
        <Offers/>
        <OurProduct/>
        {/* <Products/> */}
        <Bestseller/>
        <Footer/>
    </div>
  )
}
