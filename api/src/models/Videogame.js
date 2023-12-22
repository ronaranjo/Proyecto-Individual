const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image:{
      type: DataTypes.STRING,
      allowNull: false
    },

    description:{
      type: DataTypes.TEXT,
      defaultValue: ""
    },

    release:{
      type: DataTypes.STRING,
      allowNull: false
    },
    
    rating:{
      type: DataTypes.FLOAT
    }, 
  },{timestamps: false});
};