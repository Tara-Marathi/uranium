const express = require('express');
const router = express.Router();

const developerController= require("../controllers/developerController")
const batchController= require("../controllers/batchController")


router.post("/createBatch", batchController.createBatch  )

router.post("/createDeveloper", developerController.createDeveloper  )

router.get("/scholarship-developers", developerController.getDevelopersData)

router.get("/developers", developerController.getDeveloper)


module.exports = router;