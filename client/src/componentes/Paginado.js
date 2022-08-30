import React from "react";
import '../estilos/Paginado.css'

//VER LAS CLASES PARA DARLE ESTILO

export default function Paginado ({ allPaises, paginado }) {
  
  const numeroDePaginas = [];

  for (let i=1; i<=Math.ceil(allPaises/10); i++){
    numeroDePaginas.push(i);
  }

  return (
    <nav className="navPaginado">
      <ul className="navPaginado_ul">
        { numeroDePaginas?.map( n => (
          <li className="ulPaginado_li" key={n}>
            <a onClick={() => paginado(n)} className='liPaginado_a'>{n}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
};