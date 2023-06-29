const mongoose = require('../configarations/dbConfig');
const userSchema=require('../schema/userSchema.js');
const bcrypt=require('bcrypt');

userSchema.pre('save',async function(next) {
 const userModel=this;
 if(userModel.isModified("password")){
    userModel.password=await bcrypt.hash(userModel.password,8);
 }
 next()
})

const userModel=mongoose.model('User',userSchema);

module.exports=userModel;