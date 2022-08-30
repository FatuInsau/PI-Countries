import React from "react";
import '../estilos/Pais.css'

// recibo por props los datos de cada país y los renderizo
export default function Pais({ nombre, imagen, continente }){
  return (
    <section className="sectionPais">

      <img src={imagen} alt="imagen de una bandera" className="sectionPais_imagen" />
      <h3><b className="sectionPais_h3">{nombre}</b></h3>
      <p className="sectionPais_p">{continente}</p>

    </section>
  )
};