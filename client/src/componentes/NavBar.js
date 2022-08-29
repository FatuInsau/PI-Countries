import React from "react";
import { NavLink } from "react-router-dom";
import '../estilos/NavBar.css'


export default function NavBar(){
  return (
    <nav className="navNavbar">
      <ul className="navNavbar_ul" >
        <li className="ul_li" >
          <NavLink to='/' className='li_a' ><b className="b" >Country App</b></NavLink>
        </li>
        <li className="ul_li" >
          <NavLink to='/home' className='li_a' ><b className="b" >Home</b></NavLink> 
        </li>
      </ul>
    </nav>
  )
};