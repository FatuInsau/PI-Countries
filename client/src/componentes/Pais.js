import React from "react";
import { NavLink } from "react-router-dom";



//PRUEBA, NO ESTÁ LISTO

export default function Pais(){
  return (
    <section className="sectionPais">
      <img src="" alt="imagen de una bandera" />
      <h3 className="sectionPais_h3">NOMBRE</h3>
      <p className="sectionPais_p">CAPITAL</p>
      <NavLink to={'/home/:idPais'}>
        <button className="sectionPais_button">DETALLE</button>
      </NavLink>
      
    </section>
  )
};