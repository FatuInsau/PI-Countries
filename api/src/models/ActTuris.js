const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('actTuris', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 1,
      }
    },
    duracion:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 24,
        min: 0,
      },
      get() {
        return this.getDataValue('duracion')+ ' horas'
      }
    },
    temporada:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Verano', 'Otoño', 'Invierno', 'Primavera']],
      }
    },
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
  },{
    timestamps:false,
  });
};