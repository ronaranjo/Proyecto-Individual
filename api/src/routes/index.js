const { Router } = require('express');
const { getVideoGames } = require("../controllers/getVideoGames")
const { getVideoGameById } = require("../controllers/getVideoGameById")
const { postVideoGame } = require("../controllers/postVideoGame")
const { searchGames } = require("../controllers/searchVideoGame")
const {getGenres} = require("../controllers/getGenres")
const {saveImage, upload} = require("../controllers/postImage");
const { getImage } = require('../controllers/getImage');
const path = require('path');
const { getPlatforms } = require('../controllers/getPlatforms');

const router = Router();

router.get("/videogames", getVideoGames)
router.get("/videogames/:idVideogame", getVideoGameById)
router.get("/videogames/name/search", searchGames)
router.post("/videogames", upload.single('image'), postVideoGame)
router.get("/images/:name", getImage)
router.get("/genres", getGenres)
router.get("/platforms", getPlatforms)


//ARREGLAR SEARCH


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
