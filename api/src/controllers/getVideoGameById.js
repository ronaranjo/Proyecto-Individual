const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const {Videogame, Genre, Platform} = require("../db.js")
const validate = require('uuid-validate');

const URL = "https://api.rawg.io/api/games"

exports.getVideoGameById = async (req, res) =>{
    const {idVideogame} = req.params

    try {
        if(validate(idVideogame)){
            const db_game = await Videogame.findAll({
                where:{
                    id: idVideogame
                },
                include:[
                    {
                        model: Genre,
                        through:{
                            attributes: []
                        }
                    },
                    {
                        model: Platform,
                        through:{
                            attributes: []
                        }
                    }
                ]
            })

            if (!db_game.length) {
                return res.status(404).json("Not Found")
            }
            
            return res.status(200).json(db_game[0])
        }

        const response = await axios.get(`${URL}/${idVideogame}?key=${API_KEY}`)
        const game = response.data
        return res.status(200).json(game)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}