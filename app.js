var express= require("express")
var jwt    = require("jsonwebtoken")
const app  = express();
const path = require('path')

app.get("/api",(req,res)=>{
    res.sendFile('abc.html', {
        root: path.join(__dirname, './')
    })
})
app.get("/api/posts",VerifyToken,(req,res)=>{
    jwt.verify(req.token,'secretKey',(err,authData)=>{
        if(err){
            console.log(err)
            res.send("We are Having Technical Difficulties");
        }
        else{
            if(authData.user.UserLevel=='Admin'){
                res.sendFile('admin.html', {
                    root: path.join(__dirname, './')
                })
            }
            else{
                res.send('Only for Admins')
            }
        }
    })
})
app.post("/api/login",(req,res)=>{
    //example user
    const user={
        id:1,
        Username:'Ashutosh',
        UserLevel:"Admin"
    }
    jwt.sign({user:user},'secretKey',(err,token)=>{
        res.json({
            token:token
        })
    })
})
function VerifyToken(req,res,next){
    //get auth header value
    //token format
    //Authorization: Bearer <access_token>
    const bearerheader = req.headers.authorization
    //check if its empty
    if(typeof bearerheader!== 'undefined'){
        //split at the space to get token
        const bearerToken= bearerheader.split(" ")[1]
        //set the token
        req.token=bearerToken
        next()
    }
    else{
        res.send("No Token")
    }
}

app.listen("3000",()=>{
    console.log("Server started")
})