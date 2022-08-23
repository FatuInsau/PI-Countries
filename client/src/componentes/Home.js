import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaises } from "../redux/actions";
import Pais from './Pais';
import { NavLink } from 'react-router-dom';

//PRUEBA, NO ESTÁ LISTO

export default function Home(){

  const dispatch = useDispatch();
  const allPaises = useSelector( (state) => state.paises);

  useEffect( () => {
    dispatch(getAllPaises());
  },[]);


  return (
    <section className="sectionHome">
      <h1 className="sectionHome_h1">Paises del Mundo</h1>
      <NavLink to={'/home/crearActividad'}>
        <button className="sectionHome_button">Crear Actividad</button>
      </NavLink>
      por cada pais mostrar uno 
      <Pais/>
      ver paginado
      filtros
      ordenamientos
    </section>
  )
};