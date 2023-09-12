const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})


app.post("/savePoint",(req,res)=>{
    console.log("Received JSON data:", req.body)
    res.send("HEllo")

     
});


app.listen(process.env.PORT||3000,()=>{
    console.log("Server is Listening on port : "+3000);
});