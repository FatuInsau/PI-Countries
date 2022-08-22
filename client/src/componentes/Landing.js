
import React from "react";
import { NavLink } from "react-router-dom";



export default function Landing(){
  return (
    <section className="sectionLanding">
    
      <div className="sectionLanding_boton">
        <NavLink to={'/home'}>Country App</NavLink>
      </div>
        
    </section>
  )
};