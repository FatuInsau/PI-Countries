import React from "react";
import { NavLink } from "react-router-dom";
import '../estilos/NavBar.css'


export default function NavBar(){
  return (
    <nav className="nav_Navbar">
      <ul>
        <li>
          <NavLink to='/home'>Home</NavLink> 
        </li>
        <li>
          <NavLink to='/'>Country App</NavLink>
        </li>
      </ul>
    </nav>
  )
};