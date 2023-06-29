const graphql=require("graphql");
const signUpMutation=require('./signUpMutation.js');
const logInMutation=require('./logInMutations.js');

const RootMutation=new graphql.GraphQLObjectType({
    name:"RootMutation",
    fields:{
      signUp:signUpMutation,
      logIn:logInMutation
    }
})

module.exports=RootMutation;