const { DataTypes } = require('sequelize');

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

    released:{
      type: DataTypes.STRING,
      allowNull: false
    },
    
    rating:{
      type: DataTypes.FLOAT
    }, 
  },{timestamps: false});
};