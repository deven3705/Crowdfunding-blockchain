import React from 'react'
import Header from './component/Header.jsx'
import Footer from './component/Footer.jsx'
import {Outlet} from 'react-router-dom'
import "./layout.css";
function layout() {
  return (
    <div className='layout'>
      <Header className='header'></Header>
      <Outlet></Outlet>
      <Footer></Footer>

    </div>
  )
}

export default layout
