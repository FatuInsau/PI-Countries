import React from "react";
import '../estilos/ActividadDetalle.css'

export default function ActividadDetalle({ nombre, dificultad, duracion, temporada }){
  return (
    <section className="sectionActividadDetalle">
      <h3 className="sectionActividadDetalle_h3">{nombre}</h3>
      <p className="sectionActividadDetalle_p"><b>Dificultad: </b>{dificultad}</p>
      <p className="sectionActividadDetalle_p"><b>Duración: </b>{duracion}</p>
      <p className="sectionActividadDetalle_p"><b>Temporada: </b>{temporada}</p>
    </section>
  )
};