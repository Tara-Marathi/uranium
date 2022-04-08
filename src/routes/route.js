const express = require('express');

const router = express.Router();

router.get('/movies', function (req, res) {
    let movies=['rang de basanti','The shining','Lord of the rings','batman begins']
    res.send(movies)
});

router.get('/movies/:indexNumber', function (req, res) {
    let movies=['rang de basanti','The shining','Lord of the rings','batman begins']
    let index=req.params.indexNumber
    //console.log(index)
    if(index>movies.length-1)
    {
        res.send('use a valid index')
    }
    else
    {
        res.send(movies[index])
    }
});

router.get('/films', function (req, res) {
    let filmArray=[{'id':1,'name':'rang de basanti'},{'id':2,'name':'The shining'},{'id':3,'name':'Lord of the rings'},{'id':4,'name':'batman begins'}]
    res.send(filmArray)
});

router.get('/films/:filmId', function (req, res) {
    let filmArray=[{'id':1,'name':'rang de basanti'},{'id':2,'name':'The shining'},{'id':3,'name':'Lord of the rings'},{'id':4,'name':'batman begins'}]
    let value=req.params.filmId
    //console.log(value)
    let found=false
    let i
    for( i=0;i<filmArray.length;i++)
    {
        if(filmArray[i].id==value)
        {
            found=true
            break
        }
    }
    //console.log(i)
    if(found)
    {
        res.send(filmArray[i])
    }
    else
    {
        res.send('No movie exists with this id')

    }
});


module.exports = router;
// adding this comment for no reason