const express = require('express');
const router = express.Router();


const productController= require("../controllers/productController")
const UserController= require("../controllers/userController")
const orderController= require("../controllers/orderController")

const mwController= require("../middlewares/commonMiddlewares")



router.post("/createProduct",  productController.createProduct)
router.post('/createUser',mwController.mid, UserController.createUser)
router.post('/createOrder',mwController.mid, orderController.createOrder)


module.exports = router;