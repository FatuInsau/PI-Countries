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
  } else if(!input.duracion) {
    error.duracion= 'Se requiere la duracion';
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
    idpaises: [],
  })

  console.log(input)
  const [error,setError] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });
    setError(validate({
      ...error,
      [e.target.name]:e.target.value
    }));
  };

  function handleCheck(e){
    if(e.target.checked){
      setInput({
        ...input,
        idpaises: [...input.idpaises, e.target.id],
      }) 
    }
    if(!e.target.checked){
      setInput({
        ...input,
        idpaises: input.idpaises.filter( p => p !== e.target.value),
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
      idpaises: [],
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
      <Link to={'/home'} className={'sectionActividadNew_a'}>
        <button className="a_button">Volver</button>
      </Link>
      <div className="sectionActividadNew_div">
        <h3 className="div_h3">Crea tu Propia Actividad Turistica</h3>

        <form onSubmit={ (e) => handleSubmit(e) } className='div_form' >
          <section className="form_section">
            <div className="form_div" >
              <label><b>Nombre: </b></label>
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
            <div className="form_div" >
              <label><b>Duracion: </b></label>
              <input 
                type={"number"}
                value={input.duracion}
                name={'duracion'}
                className='div_input'
                onChange={ (e) => handleChange(e) } />
            </div>
            <select onChange={ (e) => handleSelectDificultad(e) } className="form_select" >
              {difilcultades.map( (d) => (
                <option value={d}>{d}</option>
              ))}
            </select>
            <select onChange={ (e) => handleSelectTemporada(e) } className="form_select" >
              {temporadas.map( (t) => (
                <option value={t}>{t}</option>
              ))}
            </select>
          </section>
          
          <div className="form_divCheckbox" >
            <label className="form_divCheckbox_label"><b>Paises: </b></label>
            <div className="divCheckbox_div">
              {allPaises.map( (p) => (
                <label><input 
                type={"checkbox"}
                nombre={p.nombre}
                value={p.nombre} 
                id={p.id}
                className='div_input'
                onChange={ (e) => handleCheck(e) } />{p.nombre}</label>
            ))}
            </div>
            
          </div>

          <button type={'submit'} className='form_button'>Crear</button>

        </form>
      </div>
        
    </section>
  )
};