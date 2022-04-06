const express = require('express');
const logger=require('../logger/logger')
const info=require('../util/helper')
const format=require('../validator/formatter')
const lodash=require('lodash')

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
   
    logger.logging()
});

router.get('/test-me-2', function (req, res) {
    res.send('My second ever api!')
    info.date()
    info.month()
    info.info()
   
    
});

router.get('/test-me-3', function (req, res) {
    res.send('My third ever api!')
   
    format.trim()
    format.lower()
    format.upper()
});

router.get('/hello', function (req, res) {
    res.send('My fourth ever api!')
    let arr=['january','february','march','april','may','june','july','august','september','actober','november','december']
    let parts=lodash.chunk(arr,3)
    console.log(parts)

    let arr2=[1,3,5,7,9,11,13,15,17,19]
    let odd=lodash.tail(arr2, 9)
    console.log(odd)

    let a1=[2,7,5,9]
    let a2=[6,8,7,1]
    let a3=[11,5,25,4]
    let a4=[50,20,10,12]
    let a5=[5,9,15,3]
    let mergeArray=lodash.union(a1,a2,a3,a4,a5)
    console.log(mergeArray)

    let pairs=[['horror','The shining'],['drama','titanic'],['thriller','Shutter island'],['fantasy','Pans Labyrinth']]
    let obj=lodash.fromPairs(pairs)
    console.log(obj)
});  
module.exports = router;
// adding this comment for no reason