const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const {Platform} = require("../db.js")
const { v4: uuidv4 } = require('uuid');

const URL = "https://api.rawg.io/api/platforms"

exports.getPlatforms = async (req, res) => {
    try {
        let platforms_db = await Platform.findAll()
        if(!platforms_db.length){
            const response = await axios.get(`${URL}?key=${API_KEY}`)
            const platforms_array = response.data.results

            for (let i = 0; i < platforms_array.length; i++) {
                
                const {name} = platforms_array[i]
                const id = uuidv4()
                const [platforms, created] = await Platform.findOrCreate({
                    where: {id, name: name},
                    
                })
            }
        }

        platforms_db = await Platform.findAll()

        return res.status(200).json(platforms_db)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 