// Importa las action types acá
import { GET_ALL_PAISES } from "../actions";

// TENGO QUE SEGUIR TRABAJANDO, FAALTA ACÁ

//Mis estados iniciales por acá
const initialState = {
  paises: [],
};

//Hacemos nuestro reducer
const rootReducer = (state = initialState, action) => {
  //Depende la accion hace algo
  switch (action.type) {
    //En esta accion hace eso
    case GET_ALL_PAISES:
      return {
        ...state,
        paises: action.payload
      }
    //Si no coincide ninguna accion me devuelve mi estado como estaba
    default: return {...state}               
  }
};

export default rootReducer;