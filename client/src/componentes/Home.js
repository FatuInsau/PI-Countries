import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  getAllPaises, 
  filtroPaisPorContinente, 
  filtroPaisAscODesc,
  filtroPaisPorPoblacion,
  filtroPaisPorActividad, } from "../redux/actions";
import Pais from './Pais';
import { NavLink } from 'react-router-dom';
import Paginado from "./Paginado";
import '../estilos/Home.css'
import SearchBar from "./SearchBar";

//PRUEBA, NO ESTÁ LISTO

export default function Home(){

  const dispatch = useDispatch();
  const allPaises = useSelector( (state) => state.paises);
  const allAct = useSelector( (state) => state.actividad);
  //Mi estado de la página actual
  const [currentPage,setCurrentPage]=useState(1);
  //Me fijo cuántos paises tengo que mostrar por página
  const [paisPorPagina,setPaisPorPagina]=useState(10);
  const [orden, setOrden]=useState('');

  //Indice del ultimo pais por pagina
  const ultimoPais = function (currentPage) {

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

  function handleFiltroAscODesc (e) {
    e.preventDefault();
    dispatch(filtroPaisAscODesc(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleFiltroPoblacion (e) {
    e.preventDefault();
    dispatch(filtroPaisPorPoblacion(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleFiltroActividad (e) {
    e.preventDefault();
    dispatch(filtroPaisPorActividad(e.target.value));
    setCurrentPage(1);
  }

  function handleFiltroContinente (e){
    dispatch(filtroPaisPorContinente(e.target.value));
    setCurrentPage(1);
  };
 

  return (
    <section className="sectionHome">
      <h1 className="sectionHome_h1">Paises del Mundo</h1>
      <NavLink to={'/home/crearActividad'}>
        <button className="sectionHome_button">Crear Actividad</button>
      </NavLink>
      <SearchBar/>
      <div className="sectionHome_divFiltro">
        <select className="div_selectOrden" onChange={ (e) => handleFiltroAscODesc(e) } >
          <option value="todo">Alfabéticamente</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select className="div_selectPoblacion" onChange={ (e) => handleFiltroPoblacion(e) } >
          <option value="todo">Población</option>
          <option value="mayor">De Mayor a Menor</option>
          <option value="menor">De Menor a Mayor</option>
        </select>
        <select className="div_selectContinente" onChange={ (e) => handleFiltroContinente(e) } >
          <option value="Todos">Todos</option>
          <option value="Africa">África</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Antartica</option>
        </select>
        <select className="div_selectActividad" onChange={ (e) => handleFiltroActividad(e) }>
          <option value="todos">Actividad</option>
          {
            allAct?.map ( a => {
              return (
                <option value={a.nombre}>{a.nombre}</option>
              )
            })
          }
        </select>
      </div>
      <div className="sectionHome_divPaises">
        {
          currentPais?.map( pais => {
            return (
              <div className="div_divpais" key={pais.id}>
                <NavLink to={'/home/'+ pais.id}>
                  <Pais 
                    nombre={ pais.nombre }
                    imagen={ pais.imagen }
                    continente={ pais.continente }
                    id= { pais.id } />
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