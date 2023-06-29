const userModel = require('../modals/users');

const getUsers = async (args) => {
    try{
        const users=await userModel.find({_id:{$ne:req.user.userData["_id"]}})
        return {success:true,users};
        }
        catch(error){
          return {success:false,users:[]};
        }
}

module.exports = getUsers