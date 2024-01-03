const {Videogame} = require("../db")
const fs = require("fs");

exports.postVideoGame = async (req, res) => {
    const{id, name, description, platforms, released, rating, genres} = req.body
    const image = req.file

    if(!id || !name || !description || !platforms.length || !image || !released ||!rating || !genres || !genres.length){
        fs.unlink(image.path, (error) => {
          console.log(error);
        });
        return res.status(401).json({error: "Faltan datos"})}

    try {
        const [videogame, created] = await Videogame.findOrCreate({
            where: {id, name, description, image: image.filename, released, rating},
        })

        if(!created){
            fs.unlink(image.path, (error) => {
              console.log(error);
            });
            return res.status(401).json({error: "Videojuego ya registrado"})
        }

        videogame.addGenres(genres)
        videogame.addPlatforms(platforms)

        return res.status(200).json(videogame)
        
    } catch (error) {
        fs.unlink(image.path, (error) => {
            console.log(error);
          });
        res.status(500).json({error: error.message})
    }
}
