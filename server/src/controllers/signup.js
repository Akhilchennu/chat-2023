const userModel = require('../modals/users');

const SignUp = async (args) => {
    try {
        const {name,email,password}=args;
        const userExists = await userModel.findOne({email});
        if(userExists){
            return {
                success:false,
                error:"user already registered"
            }
        }
        const user = new userModel({name,email,password});
        await user.save();
       return { success: true,error:null };
    }
    catch (error) {
        return ({ success: false, error: error });
    }
}

module.exports = SignUp