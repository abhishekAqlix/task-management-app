const mongoose= require('mongoose')
const bcrypt =require("bcryptjs")


const UserSchema=new mongoose.Schema({
    name: {
        type : String ,   //here name is case senstive it sholud be same as the usestate in react 
        require : true,
    },
   
    email:{
        type:String,
        require:true,
        unique :true,
        lowercase: true,
      //validate: [validator.isEmail, "enter valid email"],
    },
    password:{
        type : String ,
        require: true,
        },
},{ timestamps: true,  }
);

 UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

  UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  module.exports = mongoose.model('users' ,UserSchema) //here employees is table name whose schema is EmployeeSchema 
