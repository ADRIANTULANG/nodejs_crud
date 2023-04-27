const express = require('express')
const router = express.Router()

const CreateService = require('../services/Create')
const UpdateService = require('../services/Update')
const DeleteService = require('../services/Delete')
const RetrievedServices = require('../services/Read')



router.post('/create',async (req,res)=> {
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
})

router.post('/update',async (req,res)=> {
    const {username,password,firstname,lastname,id} = req.body

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
})

router.delete('/delete',async (req,res)=> {
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
})

router.post('/read',async (req,res)=> {
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
})

module.exports = router