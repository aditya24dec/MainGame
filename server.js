var express = require('express')
var app = express()
var mongoose = require("mongoose")
// var api = require('./gameSchema');
 var router = require('./router.js')
var cors = require('cors')

 
app.use(cors())
 app.set('view engine', 'ejs');
 app.use(express.static(__dirname+'/views'));
 var bodyParser = require('body-parser')
 app.use(bodyParser.urlencoded({ extended:true }))
 app.use(bodyParser.json());
  app.use('/',router);

mongoose.connect("mongodb://localhost:27017/adityax");


// app.get("/",function(req,res){
//     console.log('Hey there');
// })
//// app.post('/signup',function(req,res)
// {
// api.create(req.body,function(err,result){

// if(err){
// 	res.send(err)
// }else{
// 	console.log('result',result);
// 	res.send(result);
// }


// })
   
// 	console.log("Data received",req.body);
// })

app.listen(8083,function(){

	console.log('Game app is running');
})
