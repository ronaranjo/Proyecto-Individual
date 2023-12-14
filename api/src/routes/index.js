const { Router } = require('express');
const { getVideoGames } = require("../controllers/getVideoGames")
const { getVideoGameById } = require("../controllers/getVideoGameById")
const { postVideoGame } = require("../controllers/postVideoGame")
const { searchGames } = require("../controllers/searchVideoGame")
const {getGenres} = require("../controllers/getGenres")
const {saveImage, upload} = require("../controllers/postImage");
const { getImage } = require('../controllers/getImage');

const router = Router();

router.get("/videogames", getVideoGames)
router.get("/videogames/:idVideogame", getVideoGameById)
router.get("/videogames/name/search", searchGames)
router.post("/videogames", upload.single('imagen'), postVideoGame)
router.get("/images/:name", getImage)
router.get("/genres", getGenres)

//ARREGLAR SEARCH


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
