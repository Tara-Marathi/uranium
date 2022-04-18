const batchModel = require("../models/batchModel")
const developersModel = require("../models/developersModel")


const createDeveloper= async function (req, res) {
    let developer = req.body
    let developerCreated = await developersModel.create(developer)
    res.send({data: developerCreated})
}

const getDevelopersData= async function (req, res) {
    let developers = await developersModel.find({gender:"Female",percentage:{$gte:70}})
    res.send({data: developers})
}

const getDeveloper= async function (req, res) {
    let getPercentage=req.query.percentage
    let batchName=req.query.name
    
    let batchDetails=await batchModel.findOne({name:batchName}).select({_id:1})
    let id=batchDetails._id
    let developer = await developersModel.find({batch:id,percentage:{$gte:getPercentage}})
    
    res.send({data: developer})
}

module.exports.createDeveloper= createDeveloper
module.exports.getDevelopersData= getDevelopersData
module.exports.getDeveloper=getDeveloper

