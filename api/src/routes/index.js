const { Router } = require('express');
const { getVideoGames } = require("../controllers/getVideoGames")
const { getVideoGameById } = require("../controllers/getVideoGameById")
const { postVideoGame } = require("../controllers/postVideoGame")
const { searchGames } = require("../controllers/searchVideoGame")
const {getGenres} = require("../controllers/getGenres")
const { upload} = require("../controllers/utils/postImage");
const { getImage } = require('../controllers/getImage');
const { getPlatforms } = require('../controllers/getPlatforms');

const router = Router();

router.get("/videogames", getVideoGames)
router.get("/videogames/:idVideogame", getVideoGameById)
router.get("/videogames/name/search", searchGames)
router.post("/videogames", upload.single('image'), postVideoGame)
router.get("/images/:name", getImage)
router.get("/genres", getGenres)
router.get("/platforms", getPlatforms)

module.exports = router;
