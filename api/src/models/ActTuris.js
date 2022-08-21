const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('actTuris', {
    nombre: {
      type: DataTypes.STRING,
    },
    dificultad:{
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
    },
    duracion:{
      type: DataTypes.INTEGER,
      get() {
        return this.getDataValue('duracion')+ ' horas'
      }
    },
    temporada:{
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
    },
  },{
    timestamps:false,
  });
};