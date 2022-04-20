let test1=function(req,res){
    res.send("My first api")
}

let test2=function(req,res){
    res.send("My second api")
}

module.exports.test1=test1;
module.exports.test2=test2;