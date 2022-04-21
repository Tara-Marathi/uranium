
const orderModel=require('../models/orderModel')
const productModel=require('../models/productModel')
const userModel=require('../models/userModel')

const createOrder= async function(req, res) {
let freeUser=req.headers.isfreeappuser

 //console.log(req.headers)

let orders=req.body
let userId=orders.userId
let productId=orders.productId

 if(!userId) {
    return res.send("userId is required ")
}
let user=await userModel.findById(userId)
 if(!user) {
    return res.send("Invalid user")
}

if(!productId) {
    return res.send("productId is required")
}
let product=await productModel.findById(productId)
 if(!product) {
    return res.send("product does not exists")
}


 
//let productList=await productModel.findById(productId)
let productPrice=product.price
//console.log(productPrice)
//let userList=await userModel.findById(userId)
let userBalance=user.balance
//console.log(userBalance)

    if(freeUser=="true"){
        orders.amount=0
        orders.isFreeAppUser=true
        let create=await orderModel.create(orders)
        return res.send({data:create})

    }
    else
    {
        if(userBalance >= productPrice){
            let updatedOrders=await userModel.findByIdAndUpdate(
            {_id:userId},
            {$inc:{balance: -productPrice}},
            {new:true})
            orders.amount=productPrice
            orders.isFreeAppUser=false
            let createOrder=await orderModel.create(orders)
            return res.send({data:createOrder})
            //console.log(updatedOrders)     
        }
        else{
            return res.send("Insufficient balance")
        }
    }
   
}
   
module.exports.createOrder=createOrder