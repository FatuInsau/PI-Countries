import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPaisNombre } from '../redux/actions';
import '../estilos/SearchBar.css'

export default function SearchBar () {

  const dispatch = useDispatch();
  const [name,setName] = useState("");

  function handleInput(e){
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getPaisNombre(name))
  }

  return (
    <div>
      <input 
      type="text"
      placeholder='Buscar...' 
      className='input'
      onChange={ (e) => handleInput(e) } />
      <button className='button' type='submit' onClick={ (e) => handleSubmit(e) } >Buscar</button>
    </div>
  )
}