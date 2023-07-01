const graphql=require('graphql');
const getUsersQuery=require('./getUsers.js');
const logOutUserQuery=require('./logoutUser.js');
const logoutAllDevices=require('./logoutAllDevices.js');

const RootQuery=new graphql.GraphQLObjectType({
    name:"RootQuery",
    fields:{
       getUsers:getUsersQuery,
       logOut:logOutUserQuery,
       logoutAll:logoutAllDevices
    }
})

module.exports=RootQuery