import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaises } from "../redux/actions";
import Pais from './Pais';
import { NavLink } from 'react-router-dom';
import Paginado from "./Paginado";
import '../estilos/Home.css'

//PRUEBA, NO ESTÁ LISTO

export default function Home(){

  const dispatch = useDispatch();
  const allPaises = useSelector( (state) => state.paises);
  //Mi estado de la página actual
  const [currentPage,setCurrentPage]=useState(1);
  //Me fijo cuántos paises tengo que mostrar por página
  const [paisPorPagina,setPaisPorPagina]=useState(10);

  //Indice del ultimo pais por pagina
  const ultimoPais = function (currentPage) {
    //Pinche paginado culero!! ME SALIOOOO 
    if(currentPage===1){
      return 9;
    } else {
      return (currentPage*paisPorPagina)-1;
    }
  }(currentPage);

  //Indice del primer pais por pagina
  const primerPais = function (ultimoPais,paisPorPagina) {
    if(currentPage===1){
      return 0;
    } else {
      return ultimoPais-paisPorPagina;
    }
  }(ultimoPais,paisPorPagina);
  
  //Arreglo de paises por pagina
  const currentPais = allPaises.slice(primerPais,ultimoPais);

  const paginado = (numDePag) => {
    setCurrentPage(numDePag)
  };
  
  //Despacho esta action
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
              <div className="div_divpais" key={pais.id}>
                <NavLink to={'/home/'+pais.id}>
                  <Pais 
                    nombre={ pais.nombre }
                    imagen={ pais.imagen }
                    continente={ pais.continente } />
                </NavLink>
              </div>              
            );
        })
      }
      </div>

      <div className="sectionHome_divPaginado">
        <Paginado
          allPaises={ allPaises.length }
          paginado={ paginado } />
      </div>
        
    </section>
  )
};