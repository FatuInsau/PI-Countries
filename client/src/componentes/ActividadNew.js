import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActividad, getAllPaises } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";


//PRUEBA, NO ESTÁ LISTO

function validate (input) {
  let error= {};
  if (!input.nombre) {
    error.nombre = 'Se requiere el nombre';
  } else if(!input.dificultad) {
    error.dificultad= 'Se requiere la dificultad';
  }
  return error;
}

export default function ActividadNew(){

  const dispatch = useDispatch();
  const history = useHistory();
  const allPaises = useSelector( (state) => state.paises);
  const [input,setInput] = useState({
    nombre: '',
    dificultad: 0,
    duracion: 0,
    temporada: '',
    paises: [],
  })
  const [error,setError] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });
    setError(validate)({
      ...error,
      [e.target.name]:e.target.value
    });
  };

  function handleCheck(e){
    if(e.target.checked){
      setInput({
        ...input,
        paises: [...input.paises, e.target.value],
      })
    } 
    if(!e.target.checked){
      setInput({
        ...input,
        paises: input.paises.filter( p => p !== e.target.value),
      })
    }
  }

  function handleSelectDificultad(e) {
    setInput({
      ...input,
      dificultad: e.target.value,
    })
  }

  function handleSelectTemporada(e) {
    setInput({
      ...input,
      temporada: e.target.value,
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(postActividad(input))
    setInput({
      nombre: '',
      dificultad: 0,
      duracion: 0,
      temporada: '',
      paises: [],
    })
    history.push('/home')
  }

  useEffect( () => {
    dispatch(getAllPaises());
  },[dispatch]);

  const difilcultades = ['Dificultades','1','2','3','4','5'];
  const temporadas = ['Temporadas','Verano','Otoño','Invierno','Primavera'];


  return (
    <section className="sectionActividadNew">
      <Link to={'/home'} >
        <button>Volver</button>
      </Link>
        <h3 className="sectionActividadNew_h3">Crea tu Actividad</h3>
        <p className="sectionActividadNew_p">TEXTO EXPLICANDO UN POCO LO QUE SE HACE ACÁ</p>

        <form onSubmit={ (e) => handleSubmit(e) } >
          <div>
            <label>Nombre:</label>
            <input 
            type={"text"}
            value={input.nombre}
            name={'nombre'}
            onChange={ (e) => handleChange(e) } />
            { error.nombre && (
              <p className="error">{error.nombre}</p>
            )}
          </div>
          <div>
            <label>Duracion:</label>
            <input 
            type={"number"}
            value={input.duracion}
            name={'duracion'}
            onChange={ (e) => handleChange(e) } />
          </div>
          <select onChange={ (e) => handleSelectDificultad(e) } >
            {difilcultades.map( (d) => (
              <option value={d}>{d}</option>
            ))}
          </select>
          <select onChange={ (e) => handleSelectTemporada(e) } >
            {temporadas.map( (t) => (
              <option value={t}>{t}</option>
            ))}
          </select>
          <div>
            <label>Paises:</label>
            {allPaises.map( (p) => (
              <label><input 
              type={"checkbox"}
              nombre={p.nombre}
              value={p.nombre} 
              onChange={ (e) => handleCheck(e) } />{p.nombre}</label>
            ))}
          </div>

          <button type={'submit'}>Crear</button>

        </form>
    </section>
  )
};