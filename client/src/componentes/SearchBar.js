import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPaisNombre } from '../redux/actions';

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
      onChange={ (e) => handleInput(e) } />
      <button type='submit' onClick={ (e) => handleSubmit(e) } >Buscar</button>
    </div>
  )
}