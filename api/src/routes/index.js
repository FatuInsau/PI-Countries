const { Router, response } = require('express');
const axios = require('axios');
const { Country, ActTuris } = require('../db');
const { Op } = require('sequelize');
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


//rutas

router.get('/countries', async function( req, res ){
  const { nombre } = req.query;
  if(nombre){
    try {
      const todo = await Country.findAll();
      let buscado = await todo.filter( p => p.nombre.toLowerCase().includes(nombre.toLowerCase()))
      console.log(buscado)
      if(buscado.length!==0){
        res.json(buscado);
      }else {
        res.status(404).send('No se encontró el pais buscado')
      }
    } catch(e) {
      res.status(404).send(e.toString())
    };
  } else {
    try {
      //me guardo toda la info
      const datos = await apiInfoAll();
      //busco en mi base de datos todos los paises con los datos que necesito
      const paises = await Country.findAll({
        attributes: [ 'nombre', 'imagen', 'continente' ]
      });
      res.json(paises);
    } catch(e){
      res.status(404).send(e.toString())
    };
  }
});

router.get('/countries/:idPais', async function( req, res ){
  let { idPais } = req.params; 
  try {
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
    res.status(404).send(e.toString())
  };
});


module.exports = router;
