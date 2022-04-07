let trim=function()
{
    let str='   FunctionUp'
    
    console.log(str.trim())
}

let changeToLowerCase=function ()
{
    let str='FUNCTION UP'
    console.log(str.toLowerCase())
}
let changeToUpperCase=function ()
{
    let str='function up'
    console.log(str.toUpperCase())
}

module.exports.trim=trim
module.exports.lower=changeToLowerCase
module.exports.upper=changeToUpperCase