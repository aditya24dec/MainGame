var mongoose = require('mongoose')

var schema = mongoose.Schema

	var userSchema = new schema({

		firstname:String,
		lastname:String,
		email:String,
		password:{type:String , require:true},
		mobile:Number,
		gender:String,
		avatar:String,
		score:{type:Number , default:0},
		status:{type:Boolean ,default:false}


	});

	
	module.exports = mongoose.model("Signup",userSchema);

		 