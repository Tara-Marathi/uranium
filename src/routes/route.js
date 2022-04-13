const express = require('express');
const router = express.Router();
const BookController= require("../controllers/bookController")



router.post("/createBook", BookController.createBook  )

router.post("/createAuthor", BookController.createAuthor  )

router.get("/getBooks", BookController.getBooks)

router.get("/updatedPrice", BookController.updatedPrice  )

router.get("/bookWithAuthor", BookController.bookWithAuthor)

module.exports = router;