const express = require('express');
const router = express.Router();
const newController=require('../myController/newController')

router.get("/test-me",newController.test1 )
router.get("/test-me-1", newController.test2)

module.exports = router;