const path = require('path');

exports.getImage = (req, res) => {
    const {name} = req.params;
    const rutaImagen = path.join(__dirname, '../images/', name);

    res.sendFile(rutaImagen);
}