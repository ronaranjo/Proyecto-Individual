const {Videogame} = require("../db")

exports.postVideoGame = async (req, res) => {
    const{id, name, description, plataforms, image, release, rating, genres} = req.body
    if(!id || !name || !description || !plataforms || !image || !release ||!rating || !genres || !genres.length){
        return res.status(401).json({error: "Faltan datos"})
    }

    try {
        const [videogame, created] = await Videogame.findOrCreate({
            where: {id, name, description, plataforms, image, release, rating},
        })

        if(!created){
            return res.status(409).json({error: "Favorito ya registrado"})
        }

        videogame.addGenres(genres)

        return res.status(200).json(videogame)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}