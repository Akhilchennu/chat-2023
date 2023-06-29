const validator=require('validator'); 
const mongoose = require('../configarations/dbConfig');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new error('name should be only aplhabets')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    }
 })

 module.exports=userSchema;

 