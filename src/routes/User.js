const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const CreateService = require('../services/Create')
const UpdateService = require('../services/Update')
const DeleteService = require('../services/Delete')
const RetrievedServices = require('../services/Read')
const LoginServices = require('../services/Login')

router.post('/login',async (req,res)=> {
    const {username,password} = req.body
    const results = await LoginServices(username,password)
    if (results == false){
        res
        .status(500)
        .send({
            status:true,
            token: null,
            result:[],
            message: "Successfully Retrieved"
        })
    }else{
        console.log(results)
        const user_id = {id: results[0]['admin_id']}
        const token = jwt.sign({user_id}, 'my_secret_key');
        res
        .status(200)
        .send({
            status:true,
            token: token,
            result:results,
            message: "Successfully Retrieved"
        })
    }
})

router.post('/create',ensureToken ,async (req,res)=> {
    jwt.verify(req.token, 'my_secret_key', async function(err,data){
        if (err){
            res.sendStatus(403)
        }else{
            const {username,password,firstname,lastname } = req.body
            const results = await  CreateService(username,password,firstname,lastname )
            if (results){
                res
                .status(200)
                .send({
                    result:true,
                    status:results,
                    message: "Successfully Created"
                })
            }else{
                res
                .status(500)
                .send({
                    result:false,
                    status:[],
                    message: "Not Created"
                })
            }
        }
    })
})

router.post('/update', ensureToken, async (req,res)=> {
    jwt.verify(req.token, 'my_secret_key', async function(err,data){
        if (err){
            res.sendStatus(403)
        }else{
            const decodedToken = jwt.decode(req.token);
            const id = decodedToken.user_id.id;
            const {username,password,firstname,lastname} = req.body
            console.log("token:",req.token)
            console.log("userid:",id)
            const results = await  UpdateService(username,password,firstname,lastname,id)
            if (results){
                res
                .status(200)
                .send({
                    status:results,
                    message: "Successfully Updated"
                })
            }else{
                res
                .status(500)
                .send({
                    status:results,
                    message: "Not Updated"
                })
            }
        }
    })
})

router.delete('/delete', ensureToken,async (req,res)=> {
    jwt.verify(req.token, 'my_secret_key', async function(err,data){
        if (err){
            res.sendStatus(403)
        }else{
            const {ids} = req.body
            let string_id = `${ids}`
            const results = await  DeleteService(string_id)
            if (results){
                res
                .status(200)
                .send({
                    status:results,
                    message: "Successfully Delete"
                })
            }else{
                res
                .status(500)
                .send({
                    status:results,
                    message: "Not Deleted"
                })
            }
        }
    })
})

router.post('/read', ensureToken, async (req,res)=> {
    jwt.verify(req.token, 'my_secret_key', async function(err,data){
        if (err){
            res.sendStatus(403)
        }else{
            const {id} = req.body
            let string_id = `${id}`
            const results = await RetrievedServices(string_id)
            if (results){
                res
                .status(200)
                .send({
                    status:true,
                    result:results,
                    message: "Successfully Retrieved"
                })
            }else{
                res
                .status(500)
                .send({
                    status:false,
                    result:results,
                    message: "Not Retrieved"
                })
            }
        }
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