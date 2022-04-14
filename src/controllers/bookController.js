
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")


const createBook= async function (req, res) {
    let data = req.body
    if(data.author_id)
    {
        let savedData= await BookModel.create(data)
        res.send({msg: savedData})
    }
    else
    {
        res.send("author id shold be present")
    }
}

const createAuthor= async function (req, res) {
    let data= req.body
    if(data.author_id)
    {

        let savedData= await AuthorModel.create(data)
        res.send({msg: savedData})
    }
    else
    {
        res.send("author id should be present")
    }
}

const getBooks= async function (req, res) {
    let authorDetails= await AuthorModel.find({authorName: "Chetan bhagat"})

    let id=authorDetails[0].author_id
    

    let book=await BookModel.find({author_id:id}).select({bookName:1})
   
    res.send({msg:book})

}
const updatedPrice= async function (req, res) {

    let bookDetails =await BookModel.find({bookName:"Two states"})
    //console.log(bookDetails)
    let id=bookDetails[0].author_id

    let author= await AuthorModel.find({author_id:id}).select({authorName:1,_id:0})
    let book=bookDetails.bookName
    let newPrice=await BookModel.findOneAndUpdate({bookName:book},{$set:{price:100}},{new:true}).select({price:1,_id:0})
    res.send({msg:author,newPrice})
}

const bookWithAuthor= async function (req, res) {
    let authorId=await BookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1,_id:0})

    const id=authorId.map(a=>a.author_id)
    let temp=[]
    for(let i=0;i<id.length;i++)
    {
        let author=await AuthorModel.find({author_id:id[i]}).select({authorName:1, _id:0})
        temp.push(author)
    }
    const authorName=temp.flat()

    res.send({msg:authorName})

}

module.exports.createBook=createBook
module.exports.createAuthor=createAuthor
module.exports.getBooks=getBooks
module.exports.updatedPrice=updatedPrice
module.exports.bookWithAuthor=bookWithAuthor

   