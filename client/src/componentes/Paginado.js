import React from "react";

//VER LAS CLASES PARA DARLE ESTILO

export default function Paginado ({ allPaises, paginado }) {
  
  const numeroDePaginas = [];

  for (let i=1; i<=Math.ceil(allPaises/10); i++){
    numeroDePaginas.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        { numeroDePaginas?.map( n => (
          <li className="veremos" key={n}>
            <a onClick={() => paginado(n)}>{n}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
};