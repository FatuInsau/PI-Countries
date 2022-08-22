import React from "react";
import Pais from './Pais';

//PRUEBA, NO ESTÁ LISTO

export default function Home(){
  return (
    <section className="sectionHome">
      <h1 className="sectionHome_h1">Paises del Mundo</h1>
      por cada pais mostrar uno 
      <Pais/>
      ver paginado
      filtros
      ordenamientos
    </section>
  )
};