var express = require('express')
var router = express.Router()
var api = require('./api.js');
var multer = require('multer');
var path = require('path');
var nodemailer = require('nodemailer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);        
  }
})

var upload = multer({ storage: storage });
router.use('/signup',function(req,res,next){

	console.log("Time:"+Date.now());
	next()
});

//This is to show images in front end
router.use('/uploads', express.static(path.join(__dirname, '/uploads')));


router.post('/signup',upload.single('avatar'),function(req,res){
	// api.checkEmail(req.body,function(err,result){

	// 	if(err)
	// 	{
	// 		res.send(err);
	// 	}
	// 	else if(result=="not exist")
			console.log("file---",req.file);
			console.log("Image----",req.file.originalname);
            req.body.avatar =  req.file.originalname;
          
			api.addinguser(req.body,function(err,result)
			{
				if(err)
				{
					res.send(err);
				}
				else if(result=="Email exist")
				{
					console.log("Email is already Exist");
					res.send("Email is already Exist");
				}
				else
				{
						var globEmail = result.email;
						console.log("Id from the backend--------",result._id);
						var transporter = nodemailer.createTransport({
								service:"gmail",
								host:"smtp.gmail.com",
								auth:{

									user:'nukkadspices@gmail.com',
									pass:'aditya2415'
								}
						});

						var mailoption = {

							//from:'nukkadspices@gmail.com',
							to:globEmail,
							subject:'New Mail',
							html:"<h3>Hello You got the mail for verifications<h3></br><a href='http://localhost:8083/verify/"+result._id+"'>Please Click here</a>" 

						};

						transporter.sendMail(mailoption,function(err,info){

							if(err)
							{
								console.log(err);
							}
							else
							{
								console.log(info);
							}
						});
						res.render('login');
				}

			})

})


router.get('/signup',function(req,res){

	res.render('Signup');
})



var globaleE="";
router.post('/login' , function(req,res){

	globaleE=req.body.email;
	





	api.loginUser(req.body,function(err,result){

		if(err)
		{
			res.send(err);
		}
		else if(result=="NotVerified")
		{
			res.send("Please Verify your mail");
		}
		
		else if(result!="Invalid")
		{
			var username = result.firstname;
			var userImage = result.avatar;
			console.log("Login succesfull and result is ",result);
			console.log("Firstname---------",result.firstname);
			// res.render('GameMain.ejs',{user:result.firstname,leaders:[]});
			//res.render('leaderB.ejs',{leaders:[]});
			api.getLeaderBoard(req ,function(err,result){
			if(err)
			{
				res.send(err);
			}
			else
			{
				console.log(result);
				res.render('GameMain.ejs',{user:username,leaders:result,userImage:userImage});
			}
			})
		}
		else
		{
			res.send("Invalid user name passowrd");
		}
	})

	console.log('Login credentials received\n',req.body);

})


router.get('/login',function(req,res){

				res.render('login');
})

router.get('/verify/:userId',function(req,res){

	var userID = req.params.userId;
	req.body._id = userID;
	console.log("called verify");
	api.SetStatusTrue(req.body,function(err,result)
	{
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.render('login');
		}
	})

})


router.post('/scoreSave' ,function(req,res){

	console.log("scoresave Post call received",req.body);
	api.SaveScore(req.body,function(err,result){
		if(err)
		{
			res.send(err);

		}
		else if(result)
		{
			console.log("After saving the record",result);
			res.send(result);
		}
	})
	console.log('Body Data of SaveScore');
})


router.get('/getBoard' ,function(req,res)
{
	// api.getLeaderBoard(req ,function(err,result){


	// 	if(err)
	// 	{
	// 		res.send(err);
	// 	}
	// 	else
	// 	{
	// 		res.render('leaderB.ejs',{"leaders":result});
	// 	}
	// })
})





module.exports = router