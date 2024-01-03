
const multer = require('multer');
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const destinationDirectory = './src/images';
        fs.mkdirSync(destinationDirectory, { recursive: true });
        cb(null, destinationDirectory);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

exports.upload = multer({ storage });