const jwt = require('jsonwebtoken');
const userModal = require('../modals/users');
const bcrypt=require('bcrypt');
// const { env } = process;
const config=require('../../config');
const reddisClient=require('../configarations/reddisConfig');
const loginController = async(args) => {
    try {
        const {email,password}=args
        const userData=await userModal.findOne({email});
        if(!userData){
            return {success:false,error:"Email is not registered"};
        }
        const verifyPassword=await bcrypt.compare(password,userData.password)
        if(!verifyPassword){
            return {success:false,error:"Invalid Password"};
        }
        const userId=userData._id.toString();
        const token=jwt.sign({_id:userId},config.jwtSecret);
        (await reddisClient).SADD(userId,token);
        const data =await (await reddisClient).sMembers(userId)
        return {
            success:true,
            name:userData.name,
            email:userData.email,
            token
        }

    } catch (error) {
        console.log(error)
        return {success:false,error:"Invalid Username or Password"};
    }
}


module.exports = loginController