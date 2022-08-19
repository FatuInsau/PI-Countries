const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continente:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.INTEGER,
      // getter para mostrarlo con km2
      get() {
        return this.getDataValue('area') + ' km²'
      }
    },
    poblacion:{
      type: DataTypes.INTEGER,
      // getter para mostrarlo como millones
      get() {
        return this.getDataValue('poblacion') + ' millones'
      }
    },
    id:{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
  },{
    timestamps:false,
  });
};
