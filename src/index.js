const express = require("express");
const bodyParser = require("body-parser");
const route = require("./route/router");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://tara:c0VtDGqc7Ugvjpug@cluster0.0vu5f.mongodb.net/tara-project3?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err.message))

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
    console.log("Express app is Running on port " + (process.env.PORT || 3000))
});
