const validator=require('validator'); 
const mongoose = require('../configarations/dbConfig');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('name should be only aplhabets')
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
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(
                    'Weak password check password guide'
                )
            }
        }
    }
 })

 module.exports=userSchema;

 