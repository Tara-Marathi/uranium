const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const moment = require('moment');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://shrati:65FywNUvGdDH49SQ@cluster0.tpfb4.mongodb.net/tara-DB", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (globalMW );

    function globalMW (req, res, next) {
        let timeStamp=moment().format('YYYY-MM-DD  hh:mm:ss')
        //new Date().toLocaleString()
        let ipAddress=req.ip
        let routeHandler=req.url
        
        console.log (timeStamp+",  "+ ipAddress+",  "+routeHandler);
       // res.send(timeStamp+", "+ ipAddress+", "+routeHandler)
        next();
  }
  

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
