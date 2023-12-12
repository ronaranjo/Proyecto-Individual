const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const URL = "https://api.rawg.io/api/games"
const {Videogame, Genre} = require("../db.js")
const validate = require('uuid-validate');

exports.getVideoGameById = async (req, res) =>{
    const {idVideogame} = req.params

    try {
        if(validate(idVideogame)){
            const db_game = await Videogame.findAll({
                where:{
                    id: idVideogame
                },
                include:{
                    model: Genre,
                    through:{
                        attributes: []
                    }
                }
            })
            return res.status(200).json(db_game)
        }

        const response = await axios.get(`${URL}/${idVideogame}?key=${API_KEY}`)
        const game = response.data
        return res.status(200).json(game)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}