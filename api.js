var userSchema = require("./gameSchema");
module.exports= {


//Method for adding the new user 
addinguser: function(data,cb){
	console.log('i m in api');

	userSchema.find({email:data.email},function(err,result){

		if (err) {
					
					return cb(err,null);
			}
			else if(result.length)
			{
				return cb(null,"Email exist");
			}
			else
			{
				userSchema.create(data,function(error,result1){

						console.warn('Request is processing........');
						if(error){
							return cb(error,null);
						}else{
						    console.log('result---in api',result1);
							return cb(null,result1);
						}
						})
			}

		})


},



//method for user login...
loginUser:function(data,cb){

console.log("login called");

userSchema.findOne({email:data.email ,password:data.password},function(err,result){


	console.log(result);
	if (err) {
		return cb(err,null);
	}
	else if (result) 
	{
		if(result.status==false)
		{
			return cb(null,"NotVerified");
		}
		else
		{
			console.log("Result in login Api-----",result);
			return cb(null,result);
		}
	}
	else
	{
		console.log(result);
		return cb(null,"Invalid");
	}
})

},


checkEmail:function(data,cb)
{
	userSchema.find({email:data.email},function(err,result){

		console.log("Email",result);
		if(err)
		{
			return cb(err,null);
		}
		else if(result.length){
			
			return cb(null,"email exist");
		}
		else{
			return cb(null,"not exist");
		}
	})
},


SaveScore:function(data,cb)
{
	console.log("SaveScore is invoked");
	userSchema.update({email:data.username},{score:data.score} ,{upsert:true},function(err,result){


		console.log("Fisrtname",data.username);
		if(err)
		{
			return cb(err,null);
		}
		else
		{
			return cb(null,result);
		}
	})
},

SetStatusTrue:function(data, cb)
{
	console.log("status is invoked");
	userSchema.update({_id:data._id},{status:true},{upsert:true},function(err,result){

		console.log('Email for authenticate',data._id);
		console.log("Status updated---------",result);
		if(err)
		{
			return cb(err,null);
		}
		else{
			return cb(null,result);
		}
	})
},

getLeaderBoard:function(data,cb)
{
	console.log("LeaderBoard is generating......");
	var query=userSchema.find({}).sort({score:-1}).limit(3);
	query.exec(function(err,result)
	{
		if (err) {
			return cb(err,null);
		}
		else
		{
			console.log("Sorted Result is::::",result);
			return cb(null,result);
		}
	})
}

}