import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaises } from "../redux/actions";
import Pais from './Pais';
import { NavLink } from 'react-router-dom';
import Paginado from "./Paginado";

//PRUEBA, NO ESTÁ LISTO

export default function Home(){

  const dispatch = useDispatch();
  const allPaises = useSelector( (state) => state.paises);
  //Mi estado de la página actual
  const [currentPage,setCurrentPage]=useState(1);
  //Me fijo cuántos paises tengo que mostrar por página
  //VER QUE ONDA
  const [paisPorPagina,setPaisPorPagina]=useState(10);
  //Indice del ultimo pais por pagina
  const ultimoPais = currentPage*paisPorPagina;
  //Indice del primer pais por pagina
  const primerPais = ultimoPais-paisPorPagina;
  //Arreglo de paises por pagina
  const currentPais = allPaises.slice(primerPais,ultimoPais);

  const paginado = (numDePag) => {
    setCurrentPage(numDePag)
  };

  

  useEffect( () => {
    dispatch(getAllPaises());
  },[dispatch]);


  return (
    <section className="sectionHome">
      <h1 className="sectionHome_h1">Paises del Mundo</h1>
      <NavLink to={'/home/crearActividad'}>
        <button className="sectionHome_button">Crear Actividad</button>
      </NavLink>
      <div className="sectionHome_divFiltro">
        <select name="" id="" className="div_selectOrden">
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select name="" id="" className="div_selectContinente">
          <option value="Todos">Todos</option>
          <option value="Africa">África</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="sectionHome_divPaises">
        {
          currentPais?.map( pais => {
            return (
              <fragment className="div_divpais">
                <NavLink to={'/home/'+pais.id}>
                  <Pais 
                    name={ pais.nombre }
                    imagen={ pais.imagen }
                    continente={ pais.continente } />
                </NavLink>
              </fragment>              
            );
        })
      }
      </div>
      <Paginado
      paisPorPagina={ paisPorPagina }
      allPaises={ allPaises }
      paginado={ paginado } />
      ver paginado
    </section>
  )
};