const graphql=require('graphql');
const getUsersQuery=require('./getUsers.js')

const RootQuery=new graphql.GraphQLObjectType({
    name:"RootQuery",
    fields:{
       getUsers:getUsersQuery
    }
})

module.exports=RootQuery