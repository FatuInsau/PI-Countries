import axios from 'axios';
// Dejo por aca las action types
export const GET_ALL_PAISES = 'GET_ALL_PAISES';
export const GET_PAISES_DETALLE = 'GET_PAISES_DETALLE';
export const FILTRO_PAIS_POR_CONTINENTE = 'FILTRO_PAIS_POR_CONTINENTE';
export const FILTRO_PAIS_ASC_O_DESC = 'FILTRO_PAIS_ASC_O_DESC';
export const FILTRO_PAIS_POR_POBLACION = 'FILTRO_PAIS_POR_POBLACION';
export const POST_ACTIVIDAD = 'POST_ACTIVIDAD';
export const GET_PAIS_NOMBRE = 'GET_PAIS_NOMBRE';
export const FILTRO_PAIS_POR_ACTIVIDAD = 'FILTRO_PAIS_POR_ACTIVIDAD';


export const getAllPaises = () => {
  return function (dispatch){
    return fetch( 'http://localhost:3001/countries' )
    .then(res => res.json())
    .then(json => {
        dispatch({type: GET_ALL_PAISES, payload: json})
    }).catch( err => console.log(err))
  }};

export const getPaisesDetalle = (id) => {
  return function (dispatch){
    return fetch( `http://localhost:3001/countries/${id}` )
    .then(res => res.json())
    .then(json => {
        dispatch({type: GET_PAISES_DETALLE, payload: json})
    }).catch( err => console.log(err))
  }};

export const filtroPaisAscODesc =(payload) => {
  return {
    type: FILTRO_PAIS_ASC_O_DESC,
    payload,
  }
}

export const filtroPaisPorContinente = (payload) => {
  return {
    type: FILTRO_PAIS_POR_CONTINENTE,
    payload,
  };
};

export const filtroPaisPorPoblacion = (payload) => {
  return {
    type: FILTRO_PAIS_POR_POBLACION,
    payload,
  }
}

export const filtroPaisPorActividad = (payload) => {
  return {
    type: FILTRO_PAIS_POR_ACTIVIDAD,
    payload,
  }
}

export const postActividad = (payload) => {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/activities',payload);
    console.log(response)
    return dispatch ({
      type: POST_ACTIVIDAD,
      payload: response.data,
    })
  }
}

export const getPaisNombre = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/countries?nombre='+payload)
    return dispatch ({
      type: GET_PAIS_NOMBRE,
      payload: response.data,
    });
    } catch (e) {
      console.log(e);
    }
  }
    
}

