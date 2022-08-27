import React from "react";

export default function ActividadDetalle({ nombre, dificultad, duracion, temporada }){
  return (
    <section className="sectionActividadDetalle">
      <h3 className="sectionActividadDetalle_h3">{nombre}</h3>
      <p className="sectionActividadDetalle_p">Dificultad: {dificultad}</p>
      <p className="sectionActividadDetalle_p">Duración: {duracion}</p>
      <p className="sectionActividadDetalle_p">Temporada: {temporada}</p>
    </section>
  )
};