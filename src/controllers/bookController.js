//const { count } = require("console")
const bookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}

const getBook=async function(req,res){
    const allBooks=await bookModel.find().select({bookName:1,authorName:1, _id:0})
     res.send({data:allBooks})
  }
 
  const getBooksInYear=async function(req,res){
   let value=req.body.year
  const bookinyears=await bookModel.find({year:{$eq:value}})
    res.send({msg:bookinyears})
   
}


const getParticularBooks=async function(req,res){
  let input=req.body  
 const particularbooks=await bookModel.find(input) 
  res.send({msg:particularbooks})
  
}



const getInrBooks=async function(req,res){
   const inrBooks=await bookModel.find({"price.indianPrice":{$in:["100INR","200INR","500INR"]}})
    
  res.send({inrBooks})
  
}


const getRandomBooks=async function(req,res){
  const randomBooks=await bookModel.find({$or:[{totalPages:{$gt:500}},{stockAvailable:true}]})
   
 res.send({randomBooks})
 
}

module.exports.createBook= createBook
module.exports.getBook= getBook
module.exports.getBooksInYear= getBooksInYear
module.exports. getParticularBooks= getParticularBooks
module.exports.getInrBooks= getInrBooks
module.exports.getRandomBooks= getRandomBooks