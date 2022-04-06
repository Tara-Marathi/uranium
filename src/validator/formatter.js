let trim=function trim()
{
    let str='   FunctionUp   '
    str.trim()
    console.log(str.trim())
}

let lower=function changeToLowerCase()
{
    let str='FUNCTION UP'
    console.log(str.toLowerCase())
}
let upper=function changeToUpperCase()
{
    let str='function up'
    console.log(str.toUpperCase())
}

module.exports.trim=trim
module.exports.lower=lower
module.exports.upper=upper