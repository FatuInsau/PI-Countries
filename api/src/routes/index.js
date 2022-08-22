const { Router, response } = require('express');
const axios = require('axios');
const { Country, ActTuris } = require('../db');


const router = Router();

//rutas

router.get('/countries', async function( req, res ){
  const { nombre } = req.query;
  //Si me pasaron algo que lo use, sino next
  if(nombre){
    try {
      const todo = await Country.findAll();
      //Me fijo si existe alguno igual
      let buscado = await todo.filter( p => p.nombre.toLowerCase().includes(nombre.toLowerCase()))
      //Si existe alguno que me muestre
      if(buscado.length!==0){
        res.json(buscado);
      }else {
        //Si no que me tire error
        res.status(404).send('No se encontró el pais buscado')
      }
      //Por las dudas otro error
    } catch(e) {
      res.status(404).send(e.toString())
    };
  } else {
    try {

      //Me fijo cuánto tengo en mi base de datos
      const count = await Country.count();

      //Si no tengo nada que me agregue los datos de la api
      if(count===0){

        //Me guardo toda la info
        const todoInfo= await axios.get('https://restcountries.com/v3/all')

        //Solo los datos necesarios de cada pais para mi BD
        let paises = todoInfo.data.map( pais => ({
          nombre:pais.name.common?pais.name.common:'No tiene nombre',
          imagen:pais.flags[1],
          continente:pais.region,
          //¿por qué me faltan algunos datos? :'(
          capital:pais.capital?pais.capital[0]:'No tiene capital',
          subregion:pais.subregion?pais.subregion:'No tiene subregion',
          area:pais.area,
          poblacion:pais.population,
          id:pais.cca3
        }))

        //Los agrego a todos a mi base de datos
        await Country.bulkCreate(paises);
      }

      //Busco en mi base de datos todos los paises con lo justo y necesario
      const paisesResumen = await Country.findAll({
        attributes: [ 'nombre', 'imagen', 'continente' ]
      });

      res.json(paisesResumen);
    } catch(e){
      res.status(404).send(e.toString())
    };
  }
});

router.get('/countries/:idPais', async function( req, res ){
  let { idPais } = req.params; 
  try {
    //TRATE DE USAR LOS LINKS PERO FRACASE :'( LOS DEJO ACÁ POR SI ME TIRAN LA DATA
    // const response = await axios.get(`https://restcountries.com/v3/alpha/${idPais}`)
    // const unPais = {
    //   nombre:response.data[0].name.common?response.data[0].name.common:'No tiene nombre',
    //   imagen:response.data[0].flags[1],
    //   continente:response.data[0].region,
    //   capital:response.data[0].capital?response.data[0].capital[0]:'No tiene capital',
    //   subregion:response.data[0].subregion?response.data[0].subregion:'No tiene subregion',
    //   area:response.data[0].area,
    //   poblacion:response.data[0].population,
    //   id:response.data[0].cca3,
    // };

    //busco en mi base de datos el pais con su actividad
    const datoQueFalta = await Country.findByPk(idPais.toUpperCase(),{
      include:ActTuris,
      // attributes:[],
    });
    // const todo = unPais.concat(datoQueFalta);
    res.send(datoQueFalta);
  } catch(e){
    res.status(404).send(e.toString());
  };
});

router.post('/activities', async function( req, res ){

  //Busco mis datos en el body
  const { nombre, dificultad, duracion, temporada, idpaises} = req.body;
  try {
    //Creo en mi base de datos la nueva actividad
    const newAct = await ActTuris.create({
      nombre:nombre,
      dificultad:dificultad,
      duracion:duracion,
      temporada:temporada,
    })
    //La conecto con los paises correspondientes
    newAct.addCountry(idpaises);
    res.json(newAct);
  } catch(e) {
    res.status(404).send(e.toString());
  }
})

module.exports = router;
