import React from "react";
import PaisDetalle from './PaisDetalle';
import ActividadDetalle from "./ActividadDetalle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaisesDetalle } from "../redux/actions";
import { useEffect } from "react";


export default function Detalle(props){

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getPaisesDetalle(props.match.params.idPais));
  },[dispatch]);

  const elPais = useSelector( (state) => state.pais);
console.log(elPais)

  return (
    <section className="sectionPaisDetalle">
      <div>
        {
          <PaisDetalle
            nombre={elPais.nombre}
            continente={elPais.continente}
            id={elPais.id}
            capital={elPais.capital} 
            subregion={elPais.subregion} 
            area={elPais.area} 
            poblacion={elPais.poblacion} 
            imagen={elPais.imagen} /> 
        }
      </div>
      <div>
        <h2>Avtividades Turísticas</h2>
        {
          elPais.actTuris?.map( a => {
            return (
              <div>
                <ActividadDetalle
                  nombre={ a.nombre }
                  dificultad={ a.dificultad }
                  duracion={ a.duracion }
                  temporada={ a.temporada } />
              </div>
            )
          })
        }
      </div>
      <Link to={'/home'} >
        <button>Volver</button>
      </Link>
    </section>
  )
};