import React from "react";
import '../estilos/PaisDetalle.css'

export default function PaisDetalle({ nombre, continente, id, capital, subregion, area, poblacion, imagen }){
  return (
    <section className="sectionPaisDetalle">
      <img src={imagen} alt='imagen de bandera' className="sectionPaisDetalle_imagen"/>
      <h3 className="sectionPaisDetalle_h3">{nombre}</h3>
      <div className="sectionPaisDetalle_ps">
        <p className="sectionPaisDetalle_p"><b>Continente: </b>{continente}</p>
        <p className="sectionPaisDetalle_p"><b>Código del COI: </b>{id}</p>
        <p className="sectionPaisDetalle_p"><b>Capital: </b>{capital}</p>
        <p className="sectionPaisDetalle_p"><b>Subregión: </b>{subregion}</p>
        <p className="sectionPaisDetalle_p"><b>Área: </b>{area}</p>
        <p className="sectionPaisDetalle_p"><b>Población: </b>{poblacion}</p>
      </div>
      
    </section>
  )
};