const axios = require('axios');
const { Videogame, Genre } = require('../db');
require('dotenv').config();
const {API_KEY} = process.env;

const URL = "https://api.rawg.io/api/games"
const PAGES = 5

exports.getVideoGames = async (req, res) => {
    try {

        let videogames = await Videogame.findAll({
            include:{
                model: Genre,
                through:{
                    attributes: []
                }
            },
            limit:100
        })

        for (let i = 1; i <= PAGES; i++) {
            const response = await axios.get(`${URL}?page=${i}&key=${API_KEY}`)
            videogames = [...videogames, ...response.data.results]
        }

        res.status(200).json(videogames)

    } catch (error) {

        res.status(500).json({error: error.message})
    }
}