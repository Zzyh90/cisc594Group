const express = require('express');
const router = express.Router();


router.post("/postgameresult",async(req,res)=>{
    try{
       res.status(200).json("post game result success")
    }catch(err){
        res.status(500).json({errorMessage:err.toString()})
    }
})


router.get("/getallgameresult",async(req,res)=>{
    try{
       const testgame = {
        reult: X,
        board:[
            [x,o,o],
            [0,x,0]
            [0,0,x]
        ]
       }
       res.status(200).json(testgame)
    }catch(err){
        res.status(500).json({errorMessage:err.toString()})
    }
})



module.exports = router;