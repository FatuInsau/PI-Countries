import React from "react";
import { NavLink } from "react-router-dom";


export default function NavBar(){
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/home'>Home</NavLink> 
        </li>
        <li>
          <NavLink to='/'>Landing</NavLink>
        </li>
        <li>
        <NavLink to='/home/crearActividad'>Nueva Actividad</NavLink>
        </li>
      </ul>
    </nav>
  )
};