import React from "react";
import PaisDetalle from './PaisDetalle';
import ActividadDetalle from "./ActividadDetalle";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaisesDetalle } from "../redux/actions";
import { useEffect } from "react";
import '../estilos/Detalle.css'


export default function Detalle(props){

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getPaisesDetalle(props.match.params.idPais));
  },[dispatch]);

  const elPais = useSelector( (state) => state.pais);

  return (
    <section className="sectionPaisDetalle">
      <div className="sectionPaisDetalle_divDetalle">
        <div className="divDetalle_divPais">
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
        <div className="divDetalle_divActividades">
          <h2 className="divActividades_h2">Actividades Turísticas</h2>
          {
            elPais.actTuris?.length>0 ? elPais.actTuris.map( a => {
              return (
                <div className="divActividades_divAct" key={a.id}>
                  <ActividadDetalle
                    nombre={ a.nombre }
                    dificultad={ a.dificultad }
                    duracion={ a.duracion }
                    temporada={ a.temporada } />
                </div>
              )
            }):
            <p className="pAux">No tiene ninguna.</p>
          }
      </div>
      </div>
      
      <Link to={'/home'} className='sectionPaisDetalle_a'>
        <button className="a_button">Volver</button>
      </Link>
    </section>
  )
};