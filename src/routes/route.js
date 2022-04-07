const express = require('express');
const logger=require('../logger/logger')
const info=require('../util/helper')
const format=require('../validator/formatter')
const lodash=require('lodash')

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
   
    logger.logging()

    info.getDate()
    info.month()
    info.info()
   
    format.trim()
    format.lower()
    format.upper()
});

router.get('/hello', function (req, res) {
    res.send('My hello api!')
    
    let months=['jan','feb','mar','apr','may','jun','jul','aug','sep','act','nov','dec']
    let parts=lodash.chunk(months,3)
    console.log(parts)

    let oddNumbers=[1,3,5,7,9,11,13,15,17,19]
    console.log(lodash.tail(oddNumbers))

    let a1=[1,5,7,2]
    let a2=[6,2,4,3]
    let a3=[7,3,9,1,4]
    let a4=[6,3,1,8,5]
    let a5=[5,1,7,2,4]
    console.log(lodash.union(a1,a2,a3,a4,a5))

    let pairs=[['horror','the shining'],['drama','titanic'],['thriller','shutter island'],['fantasy','pans labyrinth']]
    console.log(lodash.fromPairs(pairs))
});


module.exports=router