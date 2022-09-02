import React from "react";
import { NavLink } from "react-router-dom";
import '../estilos/Error.css'

export default function Error(){

  return (
    <div className="divError">
      <h2 className="h2Error">Error 404</h2>
      <div className="ps">
        <p className="pError">Página no Encontrada</p>
        <p className="pError">La página que estaba buscando no existe u otro error ocurrio</p>
        <p className="pError">Disculpe las molestias</p>
      </div>
      <NavLink to={'/'} className = 'divLanding_a'>
          <button className="botonError">Volver</button>
      </NavLink>
    </div>
  )
}