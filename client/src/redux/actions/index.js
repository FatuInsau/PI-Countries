// Dejo por aca las action types
export const GET_ALL_PAISES = 'GET_ALL_PAISES';
export const GET_PAISES_DETALLE = 'GET_PAISES_DETALLE';


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

// export const createMovie = (payload) => {
//   return {
//     type: CREATE_MOVIE,
//     payload: {
//       id: id++,
//       name: payload.name,
//       director: payload.director,
//       releaseYear: payload.releaseYear,
//       description:payload.description,
//       image: payload.image,
//       runningTime: payload.runningTime,
//     }
// }};

// // Desde el componente ejecutamos la action creator, pasandole como argumento el id de la movie que queremos eliminar.
// export const deleteMovie = (id) => {
//   return {
//     type: DELETE_MOVIE,
//     payload: id
// }};

// // Desde el componente ejecutamos la action creator, pasandole como argumento los values que vamos a utilizar para enviar el form de contacto.
// export const sendEmail = (payload) => {
//   return {
//     type: SEND_EMAIL,
//     payload
//   }
// };
