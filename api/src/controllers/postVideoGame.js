const {Videogame} = require("../db")
const path = require('path');
const multer = require('multer');
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const directorioDestino = './src/images';
        fs.mkdirSync(directorioDestino, { recursive: true });
        cb(null, directorioDestino);
    },
    filename: (req, file, cb) => {
        const nombreArchivo = `${Date.now()}-${file.originalname}`;
        cb(null, nombreArchivo);
    }
});

exports.upload = multer({ storage });

exports.postVideoGame = async (req, res) => {
    const{id, name, description, plataforms, image, release, rating, genres} = req.body
    const imageName= req.file.filename

    if(!id || !name || !description || !plataforms || !image || !release ||!rating || !genres || !genres.length){
        return res.status(401).json({error: "Faltan datos"})
    }

    try {
        const [videogame, created] = await Videogame.findOrCreate({
            where: {id, name, description, plataforms, image: `http://localhost:3001/images/${imageName}`, release, rating},
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