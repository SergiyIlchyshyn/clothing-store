const express = require('express');
const router = express.Router();
const multer = require('multer');

// SET STORAGE
const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, 'public/images');
    },
    filename: function(req, file, cb) {
        // console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    },
    limits: {
        fileSize: 1024 * 1024 * 10,
        fieldSize: 1024 * 1024 * 10
    }
});

const upload = multer({ storage: storage })

//POST - /api/image/upload/
router.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file
    console.log(file);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send('/images/' + file.filename);
});

module.exports = router;