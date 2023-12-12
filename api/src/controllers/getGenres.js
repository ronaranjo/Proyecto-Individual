const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const URL = "https://api.rawg.io/api"
const {Genre} = require("../db.js")
const { v4: uuidv4 } = require('uuid');

exports.getGenres = async (req, res) => {
    try {
        let genres_db = await Genre.findAll()
        if(!genres_db.length){
            const response = await axios.get(`${URL}/genres?key=${API_KEY}`)
            const genres_array = response.data.results
            

            for (let i = 0; i < genres_array.length; i++) {
                
                const {name} = genres_array[i]
                const id = uuidv4()
                const [genres, created] = await Genre.findOrCreate({
                    where: {id, name: name},
                    
                })
            }
        }

        genres_db = await Genre.findAll()

        return res.status(200).json(genres_db)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 