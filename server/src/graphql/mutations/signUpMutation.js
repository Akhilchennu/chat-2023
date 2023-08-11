const graphql = require('graphql');
const SignUpController = require('../../controllers/signup');

const { GraphQLString, GraphQLBoolean } = graphql;

const SignUpTypeSchema = new graphql.GraphQLObjectType({
    name: 'signup',
    fields: {
        error: { type: GraphQLString },
        success: { type: GraphQLBoolean }
    }
})

const signUpMutation = {
    name: 'signup',
    // fields: {  // required  commented code only if multiple fields inside one mutation
    type: SignUpTypeSchema,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },

    },
    resolve: (async (root, args, context, info) => {
        const signUpData = await SignUpController(args);
        return signUpData;
    })
    // }
}
/*mutation signUp($name: String, $email: String, $password: String) { 
  signUp(name: $name, email: $email, password: $password) {
    error
    success
  } 
}*/
//provide variables seperatly

module.exports = signUpMutation