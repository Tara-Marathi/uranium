const authorModel = require("../models/authorModel")
const publisherModel = require("../models/publisherModel")
const bookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let book = req.body
    let aid=book.author
    let pid=book.publisher

    if(aid && pid)
    {
        let authorDetails=await authorModel.findOne({_id:aid})
        if(!authorDetails)
        {
            return res.send("authorId does not match ")
        }
        let publisherDetails=await publisherModel.findOne({_id:pid})
        if(!publisherDetails)
        {
            return res.send("publisherId does not match ")
        }
        let bookCreated = await bookModel.create(book)
        res.send({data: bookCreated})
    }
    else
    {
        res.send("both author id and publisher id required")
    }
}
   
const getBooksWithAllDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate(['author','publisher'])
    res.send({data: specificBook})
}

const updateBook=async function(req,res)
{
    let updateData=await bookModel.updateMany({publisher:{$in:["625ae48809643534d77cbd48","625af8c43df00faa5685fd24"]}},{$set:{isHardCover:true}},{new:true,upsert:true })
    let book=await bookModel.find({publisher:{$in:["625ae48809643534d77cbd48","625af8c43df00faa5685fd24"]}})
    let updatePrice=await bookModel.updateMany({ratings:{$gt:3.5}},{$inc:{price:10}},{new:true,upsert:true })
    res.send({data:updateData,book,updatePrice})

}

module.exports.createBook= createBook
module.exports.getBooksWithAllDetails = getBooksWithAllDetails
module.exports.updateBook=updateBook