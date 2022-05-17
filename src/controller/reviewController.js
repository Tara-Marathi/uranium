const reviewModel = require("../model/reviewModel")
const bookModel = require("../model/bookModel")
const validator = require("../validator/validator");

// ============================================   REVIEW  CREATION ====================================================

const createReview = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        if (!validator.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: 'Please! enter a Valid BookId in Path Params,(mandatory field).'})
        }
        //    IF  BODY IS EMPTY
        const requestBody = req.body;
        if (Object.keys(requestBody).length == 0) {
            return res.status(400).send({ status: false, message: "Please! fill all the review's mandatory fields." })
        }
        //.......Destructuting......
        const { rating, review } = requestBody; 

        //     BODY DATA VALIDATIONS
        if (!validator.isValid(rating) || !(rating >= 1 && rating <= 5)) {
            return res.status(400).send({ status: false, message: "Please! Enter a valid Rating From 1 to 5 ." })
        }
        if (!validator.isValid(review)) {
            return res.status(400).send({ status: false, message: "Enter the Review, Please!" })
        }
        //   ADDING BOOKID AND DATE IN REQUEST BODY
        requestBody["bookId"] = bookId
        requestBody["reviewedAt"] = Date.now();

        //     Count inc
        const bookreviewCount = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: +1 } }, { new: true })
        if(!bookreviewCount){
            return res.status(404).send({status: false, message: "The Book does not exist with given book ID in params"})
        }
        //   CREATING   REVIEW
        const createdReview = await reviewModel.create(requestBody);
        //    Pickingup  Data from created review
        const reviewData = {
            _id: createdReview._id,
            bookId: createdReview.bookId, 
            reviewedBy: createdReview.reviewedBy, 
            reviewedAt: createdReview.reviewedAt, 
            rating: createdReview.rating, 
            review: createdReview.review 
        };

        //  DESTRUCTURING  FOR MAKING  RESPONSE from the Book
        const { _id, title, excerpt, userId, category, subcategory, isDeleted, reviews, deletedAt, releaseAt, createdAt, updatedAt } = bookreviewCount;

        const data = { _id, title, excerpt, userId, category, subcategory, isDeleted, reviews, deletedAt, releaseAt, createdAt, updatedAt, reviewData };

        //     SENDING RESPONSE BACK
       return res.status(201).send({ status: true, message: "Success", data: data })
    }
    catch (err) {
       return res.status(500).send({ status: false, message: err.message })
    }
};

//   ============================================== UPDATE  REVIEW  ===================================================

const updateReview = async function (req, res) {
    try {
        const requestBody = req.body
        const bookId = req.params.bookId
        const reviewId = req.params.reviewId

        //     Validation and DB fetch for Existance
        if (!validator.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Please! enter a valid bookid" })
        }

        if (!validator.isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, message: "Please! enter a valid reviewId" })
        }

        const bookExist = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookExist) {
            return res.status(404).send({ status: false, message: "Book does not found with given id" })
        }
        if(bookExist.reviews == 0){
            return res.status(400).send({ status: false, message: "Book has no reviews" })
        }

        const reviewExist = await reviewModel.findOne({_id:reviewId, isDeleted: false })
        if (!reviewExist) {
            return res.status(404).send({ status: false, message: "Review not found" })
        }
        //authorization
        if(bookId != reviewExist.bookId){
            return res.status(400).send({status:false, message:"reviewId not belongs to bookId, can't update review"})
        }

        if (!(Object.keys(requestBody).length > 0)) {
            return res.status(400).send({
                status: false,
                message: "Invalid request parameters, Provide data to update review"
            })
        }
        const { reviewedBy, rating, review } = requestBody  // DESTURCTURING

        const filter = {}

        if (reviewedBy) {
            if (!validator.isValid(reviewedBy)) {
                return res.status(400).send({ status: false, message: "Please! enter a valid data to 'reviewedby' feild" })
            }
            filter['reviewedBy'] = reviewedBy.trim()
        }

        if (rating) {
            if (!(rating >= 1 && rating <= 5)) {
                return res.status(400).send({ status: false, message: "Please! enter a value to rating feild between 1 and 5" })
            }
            filter['rating'] = rating
        }

        if (review) {
            if (!validator.isValid(review)) {
                return res.status(400).send({ status: false, message: "Please! enter a valid data to 'review' feild" })
            }
            filter['review'] = review.trim()
        }
        const updatedReview = await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: filter }, { new: true })
        // const reviewData = await reviewModel.find({ bookId:bookId}).select({ bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })

        const reviewData = {
            bookId:updatedReview.bookId,
            reviewedBy:updatedReview.reviewedBy,
            reviewedAt:updatedReview.reviewedAt,
            rating:updatedReview.rating
        }
        //      Destructuring
        const { _id, title, excerpt, userId, category, subcategory, isDeleted, reviews, deletedAt, releaseAt, createdAt, updatedAt } = bookDetails
        //     Assigning to varable
        const data = { _id, title, excerpt, userId, category, subcategory, isDeleted, reviews, deletedAt, releaseAt, createdAt, updatedAt, reviewData }

        // data["reviewData"] = reviewData;

        return res.status(200).send({ status: true, message: "Success", data: data })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};

// =======================================================   DELETING  REVIEW  ==============================================================

const deleteReview = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId;

        //   OBJECTID  VALIDATIONS
        if (!validator.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Please! Enter a valid BookId" })
        }
        if (!validator.isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, message: "Please! Enter a valid ReviewId" })
        }
            //  DATA  EXISTANCE  IN DB
        const existBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!existBook) {
            return res.status(404).send({ status: false, message: "Book Not found With Given Id" })
        }
        if (existBook.reviews == 0) {
            return res.status(400).send({ status: false, message: "Book has no review" })
        }
       
        const existReview = await reviewModel.findOne({ _id: reviewId, isDeleted: false });
        if(!existReview){
            return res.status(404).send({ status: false, message: "Review not found" })
        }
        if(bookId != existReview.bookId){
            return res.status(400).send({status:false, message:"reviewId not belongs to bookId, can't delete review"})
        }
        const deletedReview = await reviewModel.findOneAndUpdate({ _id: reviewId,isDeleted: false }, { $set: { isDeleted: true } }, { new: true });
        if (!deletedReview) {
            return res.status(404).send({ status: false, message: "either Review not found for given BookID, or Review already deleted." });
        }
        
        const reviewCountInBook = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: -1 } },{ new: true });

        return res.status(200).send({ status: true, message: "Review Deleted Successfully" })  // some edit have do here
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};


module.exports = { createReview, updateReview, deleteReview }