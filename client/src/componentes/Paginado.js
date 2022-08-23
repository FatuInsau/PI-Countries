import React from "react";

//VER LAS CLASES PARA DARLE ESTILO

export default function Paginado ({ paisPorPagina, allPaises, paginado}) {
  
  const numeroDePaginas = [];

  for (let i=1; i<=Math.ceil(allPaises/paisPorPagina); i++){
    numeroDePaginas.push(i+1);
  }

  return (
    <nav>
      <ul>
        { numeroDePaginas?.map( n => (
          <li className="veremos" key={n}>
            <a onClick={() => paginado(n)}>{n}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
};