import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActividad, getAllPaises } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import '../estilos/ActividadNew.css';


//PRUEBA, NO ESTÁ LISTO

function validate (input) {
  let error= {};
  if (!input.nombre) {
    error.nombre = 'Se requiere el nombre';
  } 
  if (input.nombre.length > 250) {
    error.nombre = 'El nombre es muy largo';
  }
  if (input.dificultad===0 || input.dificultad === 'Dificultades') {
    error.dificultad = 'Se requiere la dificultad';
  } 
  if (!input.duracion || input.duracion === 'Duración') {
    error.duracion = 'Se requiere la duración';
  } 
  if (!input.temporada || input.temporada === 'Temporadas') {
    error.temporada = 'Se requiere la temporada';
  } 
  if (input.idpaises.length===0) {
    error.paises = 'Se requiere agregar paises';
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
    duracion: '',
    temporada: '',
    idpaises: [],
    paises:[],
  })

  allPaises.sort( function (a,b){
    if( a.nombre > b.nombre ) {
      return 1;
    }
    if ( a.nombre < b.nombre ) {
      return -1;
    }
    return 0;
  })

  const [error,setError] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });
  };

  function handleSelectDificultad(e) {
    setInput({
      ...input,
      dificultad: e.target.value,
    })
  }

  function handleSelectDuracion(e) {
    setInput({
      ...input,
      duracion: e.target.value,
    })
  }

  function handleSelectPais(e) {
    var id = (allPaises.filter((p)=> p.nombre=== e.target.value))[0].id
    setInput({
      ...input,
      paises:[...input.paises,e.target.value],
      idpaises: [...input.idpaises,id],
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
    setError(validate(input))
    const errores = validate(input)
    if(Object.values(errores).length === 0){
      dispatch(postActividad(input))
      setInput({
        nombre: '',
        dificultad: 0,
        duracion: '',
        temporada: '',
        idpaises: [],
      })
      history.push('/home')
    }
  }

  useEffect( () => {
    dispatch(getAllPaises());
  },[dispatch]);

  const difilcultades = ['Dificultades','1','2','3','4','5'];
  const temporadas = ['Temporadas','Verano','Otoño','Invierno','Primavera'];
  const duraciones = ['Duración','30 min','1 hora', '3 horas', '5 horas'];

  function handleDelete (pa) {
    var id = (allPaises.filter((p)=> p.nombre=== pa))[0].id
    setInput({
      ...input,
      paises: input.paises.filter(p => p!== pa),
      idpaises: input.idpaises.filter( p => p !== id)
    })
  }

  console.log(input)

  return (
    <section className="sectionActividadNew">
      <Link to={'/home'} className={'sectionActividadNew_a'}>
        <button className="a_button">Volver</button>
      </Link>
      <div className="sectionActividadNew_div">
        <h3 className="div_h3">Crea tu Propia Actividad Turistica</h3>

        <form onSubmit={ (e) => handleSubmit(e) } className='div_form' >
          <section className="form_section">
            <div className="form_div" >
              <label className="nombre"><b>Nombre: </b></label>
              <input 
                type={"text"}
                value={input.nombre}
                name={'nombre'}
                className='div_input'
                onChange={ (e) => handleChange(e) } />
                { error.nombre && (
                <p className="error">{error.nombre}</p>
                )}
            </div>
            <div className="selector_error">
              <select onChange={ (e) => handleSelectDuracion(e) } className='form_select' >
                {duraciones.map( (d) => (
                  <option value={d}>{d}</option>
                ))}
              </select>
              { error.duracion && (
                <p className="error">{error.duracion}</p>
              )}
            </div>
            <div className="selector_error">
              <select onChange={ (e) => handleSelectDificultad(e) } className="form_select" >
                {difilcultades.map( (du) => (
                  <option value={du}>{du}</option>
                ))}
              </select>
              { error.dificultad && (
                <p className="error">{error.dificultad}</p>
              )}
            </div>
            <div className="selector_error">
              <select onChange={ (e) => handleSelectTemporada(e) } className="form_select" >
                {temporadas.map( (t) => (
                  <option value={t}>{t}</option>
                ))}
              </select>
              { error.temporada && (
                <p className="error">{error.temporada}</p>
              )}
            </div>
          </section>
          <div className="selector_error">
            <select onChange={ (e) => handleSelectPais(e) } className= "form_select">
              <option value="Todos">Paises</option>
              {allPaises.map( (p) => (
                <option value={p.nombre} id= {p.id}>{p.nombre}</option>
              ))}
            </select>
            { error.paises && (
              <p className="error">{error.paises}</p>
            )}
          </div>
          
          { input.paises.map( (pa) => 
          <div className="seleccionados">
            <p className="p"><b>{pa}</b></p>
            <button className="botonX" onClick={() => handleDelete(pa)}><b>x</b></button>
          </div> )}
          <button type={'submit'} className='form_button'>Crear</button>

        </form>
      </div>
    </section>
  )
};