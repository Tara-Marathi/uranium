const express = require('express');
const router = express.Router();

const BookController= require("../controllers/bookController")


router.post("/createBook", BookController.createBook  )
router.get("/getBookList", BookController.getBook)
router.post("/getBooksInYear", BookController.getBooksInYear)
router.post("/getParticularBooks", BookController.getParticularBooks)
router.get("/getInrBooks", BookController.getInrBooks)
router.get("/getRandomBooks", BookController.getRandomBooks)

module.exports = router;