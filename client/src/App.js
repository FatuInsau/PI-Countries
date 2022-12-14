import './App.css';
import React from 'react';
import NavBar from './componentes/NavBar';
import { Route, Switch } from 'react-router-dom';
import Landing from './componentes/Landing';
import Home from './componentes/Home';
import Detalle from './componentes/Detalle';
import ActividadNew from './componentes/ActividadNew';
import Error from './componentes/Error';

function App() {
  return (
    <React.Fragment>

      <Route path={'/home'} component={ NavBar } />
      
      <Switch>

        <Route path={'/home/crearActividad'} component={ ActividadNew } />

        <Route path={'/home/:idPais'} component={ Detalle } />

        <Route path={'/home'} component={ Home } />

        <Route exact path= {'/'} component={ Landing } />

        <Route path={'/'} component={Error} />
        
      </Switch>
    
    </React.Fragment>
  );
}

export default App;
