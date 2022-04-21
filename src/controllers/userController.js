const req = require("express/lib/request")
const userModel= require("../models/userModel")


const createUser = async function(req, res) {
    let user = req.body
    let userCreated=await userModel.create(user)
    return res.send({msg:userCreated})
}
       
module.exports.createUser = createUser


