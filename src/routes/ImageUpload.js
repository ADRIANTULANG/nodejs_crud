const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ "-" + file.originalname);
    },
})
const upload = multer({storage: fileStorageEngine});

function auth(req,res,next){
    jwt.verify(req.token, 'my_secret_key', async function(err,data){
        if (err){
            res.sendStatus(403)
        }else{
            next()
        }
    })
}

router.post('/uploadImage',ensureToken, [auth,upload.single("image")], async (req,res)=> {
    res
    .status(200)
    .send({
        status:true,
        message: "Successfully Uploaded"
    })
})

router.post('/multipleUploadImage',ensureToken, [auth,upload.array("image")], async (req,res)=> {
    res
    .status(200)
    .send({
        status:true,
        message: "Successfully Uploaded"
    })
})

function ensureToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next()
    }else{
        res.sendStatus(403)
    }
}

module.exports = router