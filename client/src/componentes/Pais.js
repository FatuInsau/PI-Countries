import React from "react";
import '../estilos/Pais.css'

// recibo por props los datos de cada país y los renderizo
export default function Pais({ nombre, imagen, continente }){
  
  return (
    <section className="sectionPais">

      <img src={imagen} alt="imagen de una bandera" width={'300rem'} height={'150rem'} />
      <h3 className="sectionPais_h3">{nombre}</h3>
      <p className="sectionPais_p">{continente}</p>

    </section>
  )
};