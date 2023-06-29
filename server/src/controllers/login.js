const jwt = require('jsonwebtoken');
const userModal = require('../modals/users');
const bcrypt=require('bcrypt');
// const { env } = process;
const config=require('../../config')
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
        const token=jwt.sign(userData._id,config.jwtSecret);
        return {
            success:true,
            name:userData.name,
            email:userData.email,
            token
        }

    } catch (error) {
        return {success:false,error:"Invalid Username or Password"};
    }
}


module.exports = loginController