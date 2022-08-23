
import React from "react";
import { NavLink } from "react-router-dom";



export default function Landing(){
  return (
    <section className="sectionLanding">
    
      <div className="sectionLanding_boton">
        <h3 className="sectionLanding_h3">Country App</h3>
        <NavLink to={'/home'}>
          <button>Empezar...</button>
        </NavLink>
      </div>
        
    </section>
  )
};