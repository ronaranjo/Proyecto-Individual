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

exports.saveImage = (req, res) => {

    const rutaImagen = req.file;
    console.log('Ruta de la imagen guardada:', rutaImagen);
    res.send('Imagen subida exitosamente.');
}