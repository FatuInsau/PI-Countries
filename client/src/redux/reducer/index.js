// Importa las action types acá
import { 
  GET_ALL_PAISES, 
  FILTRO_PAIS_POR_CONTINENTE,
  FILTRO_PAIS_ASC_O_DESC,
  FILTRO_PAIS_POR_POBLACION, 
  POST_ACTIVIDAD,
  GET_PAISES_DETALLE,
  GET_PAIS_NOMBRE,
} from "../actions";

// TENGO QUE SEGUIR TRABAJANDO, FAALTA ACÁ

//Mis estados iniciales por acá
const initialState = {
  paises: [],
  allPaises:[],
  pais:[],
};

//Hacemos nuestro reducer
const rootReducer = (state = initialState, action) => {
  //Depende la accion hace algo
  switch (action.type) {
    //En esta accion hace eso
    case GET_ALL_PAISES:
      return {
        ...state,
        paises: action.payload,
        allPaises: action.payload,
      }
      //VER CUANDO NO TIENE FILTRO Y TAMPOCO ANDA
    case FILTRO_PAIS_ASC_O_DESC:
      var ordenado = action.payload === 'asc'?
      state.paises.sort( function (a,b){
        if( a.name > b.name ) {
          return 1;
        }
        if ( a.name < b.name ) {
          return -1;
        }
        return 0;
      }) : 
      state.paises.sort(function(a,b){
        if( a.name > b.name ){
          return -1;
        }
        if( a.name < b.name ){
          return 1;
        }
        return 0;
      })
      return {
        ...state,
        paises: ordenado,
      }

    case FILTRO_PAIS_POR_CONTINENTE:
      const todosPaises = state.allPaises;
      const filtro = action.payload === 'Todos' ? todosPaises : todosPaises.filter( p => p.continente===action.payload);
      return{
        ...state,
        paises: filtro,
      }

      //VER CUUANDO NO TIENE FILTRO Y TAMPOCO ANDA
      case FILTRO_PAIS_POR_POBLACION:
        let orden = action.payload === 'mayor'?
        state.paises.sort( function (a,b){
          if( a.name > b.name ) {
            return 1;
          }
          if ( a.name < b.name ) {
            return -1;
          }
          return 0;
        }) : 
        state.paises.sort(function(a,b){
          if( a.name > b.name ){
            return -1;
          }
          if( a.name < b.name ){
            return 1;
          }
          return 0;
        })
        return {
          ...state,
          paises: orden,
        }
      case POST_ACTIVIDAD:
        return {
          ...state,
        }
      case GET_PAISES_DETALLE:
        return {
          ...state,
          pais: action.payload,
        }
      case GET_PAIS_NOMBRE:
        return {
          ...state,
          paises: action.payload,
        }
    //Si no coincide ninguna accion me devuelve mi estado como estaba
    default: return {...state}               
  }
};

export default rootReducer;