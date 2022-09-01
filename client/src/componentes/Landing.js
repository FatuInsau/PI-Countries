import '../estilos/Landing.css'
import React from "react";
import { NavLink } from "react-router-dom";



export default function Landing(){
  return (
    
      <div className="divLanding">
        <h3 className="divLanding_h3"><b>Conoce el Mundo</b></h3>
        <NavLink to={'/home'} className = 'divLanding_a'>
          <button className="divLanding_boton">Empezar...</button>
        </NavLink>
      </div>
        
  )
};