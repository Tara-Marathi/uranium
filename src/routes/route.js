const express = require('express');

const router = express.Router();

let players =
[
    {   "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": ["swimming"]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": ["soccer"]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": ["soccer"]
    }
]

router.post('/players', function (req, res) {
   let newPlayer= req.body
   console.log(newPlayer)
   let found=false
  for(let i=0;i<players.length;i++)
  {
      if(players[i].name==req.body.name)
      {
          found=true
          break
      }
  } 
  if(found)
  {
        res.send(  { data: players , status: true }  )
  } 
  else  
  {        
        players.push(newPlayer)
        res.send(  { data: players , status: true }  )
   
  }

});

module.exports = router;
