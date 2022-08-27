import React from "react";

export default function PaisDetalle({ nombre, continente, id, capital, subregion, area, poblacion, imagen }){
  return (
    <section className="sectionPaisDetalle">
      <img src={imagen} alt='imagen de bandera' />
      <h3 className="sectionPaisDetalle_h3">{nombre}</h3>
      <p className="sectionPaisDetalle_p">Continente: {continente}</p>
      <p className="sectionPaisDetalle_p">Código del COI: {id}</p>
      <p className="sectionPaisDetalle_p">Capital: {capital}</p>
      <p className="sectionPaisDetalle_p">Subregión: {subregion}</p>
      <p className="sectionPaisDetalle_p">Área: {area} km²</p>
      <p className="sectionPaisDetalle_p">Población: {poblacion} millones</p>
    </section>
  )
};