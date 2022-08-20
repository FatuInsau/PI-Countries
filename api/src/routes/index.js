const { Router, response } = require('express');
const axios = require('axios');
const { Country, ActTuris } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//funciones 

//Pedir los paises a la api y guardarlos en mi base de datos
const apiInfoAll = async () => {
  //Me fijo si tiene algo ya
  const guardados = await Country.findAll();
  if(guardados.length<1){
    axios.get('https://restcountries.com/v3/all').then((response) => {
      //Por cada país que recibió, creo una instancia en mi base de datos
      response.data.forEach(pais => {
        var paises = Country.findOrCreate({
          where: {
            //solo los datos necesarios
            nombre:pais.name.common?pais.name.common:'No tiene nombre',
            imagen:pais.flags[1],
            continente:pais.region,
            //¿por qué me faltan algunos datos? :'(
            capital:pais.capital?pais.capital[0]:'No tiene capital',
            subregion:pais.subregion?pais.subregion:'No tiene subregion',
            area:pais.area,
            poblacion:pais.population,
            id:pais.cca3,
          },
        });
        //Los devuelvo
        return paises;
      });
    });
  };
};


// const bdInfo = async () => {
//   return await ActTuris.findAll({
//     incluide: {
//       model: Country,
//       attributes: ['nombre'],
//       through: {
//         attributes:[],
//       },
//     }
//   })
// }


//rutas

router.get('/countries', async function( req, res ){
  try {
    apiInfoAll();
    const paises = await Country.findAll({
      attributes: [ 'nombre', 'imagen', 'continente' ]
    });
    res.send(paises);
  } catch(e){
    res.status(404).send(e.toString())
  };
});

router.get('/countries/:idPais', async function( req, res ){
  let { idPais } = req.params; 
  try {
    const response = await axios.get(`https://restcountries.com/v3/alpha/${idPais}`)
    res.send({
      nombre:response.data[0].name.common,
      imagen:response.data[0].flags[1],
      continente:response.data[0].region,
      capital:response.data[0].capital[0],
      subregion:response.data[0].subregion,
      area:response.data[0].area,
      poblacion:response.data[0].population,
      id:response.data[0].cca3,
      // actTuris:response.data[0].,
    });
  } catch(e){
    res.status(404).send(e.toString())
  };
});

router.get('/countries', async function( req, res ){
  const { nombre } = req.params; 
  try {
    const response = await axios.get(`https://restcountries.com/v3/name/${nombre}`)
    res.send({
      //??
    });
  } catch(e){
    res.status(404).send(e.toString())
  };
});

//   


module.exports = router;
