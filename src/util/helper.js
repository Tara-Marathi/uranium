let printDate=function ()
{
    
    console.log('current date:',new Date().getDate())
}

let  printMonth=function ()
{
    //let date=new Date()
    console.log('current month:',new Date().getMonth()+1)
}

let getBatchInfo=function ()
{
    console.log('Uranium, W2D3, The topic for today is Node.js module system')
}
module.exports.getDate=printDate
module.exports.month= printMonth
module.exports.info=getBatchInfo