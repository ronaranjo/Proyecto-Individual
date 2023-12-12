const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const URL = "https://api.rawg.io/api/games"
const {Videogame, Genre} = require("../db.js")
const { Op, Sequelize } = require("sequelize");

exports.searchGames = async (req, res) => {
    const {name} = req.query
    const limit = 15
    console.log(name)
    try {
        const {count, rows } = await Videogame.findAndCountAll({
            where: {
                name: {
                  [Op.iLike]: `%${name}%`
                },
                
              },
              include:{
                model: Genre,
                through:{
                    attributes: []
                }
            },
            limit: limit
        })


        if(rows.length < limit){
            const response = await axios.get(`${URL}?search=${name}&key=${API_KEY}`)
            const games_array = response.data.results

            if(games_array.length){
                
                while(rows.length < limit && games_array.length > 0){

                    rows.push(games_array.shift())
                };
            }
        }

        return res.status(200).json(rows)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
}