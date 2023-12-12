const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('genre', {
        id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        
    }, {timestamps: false})
}