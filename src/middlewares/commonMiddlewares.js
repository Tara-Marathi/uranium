

const mid= function ( req, res, next) {
  let header =  req.headers
  //console.log(header)
  let appType=header["isFreeAppUser"]
  if(!appType)
  {
     appType=header["isfreeappuser"]
  }
  if(!appType)
      return res.send("header is mandatory")
  
  else
  //req.body.isFreeAppUser=header
    next()
}

module.exports.mid= mid
