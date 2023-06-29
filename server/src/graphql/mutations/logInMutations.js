const graphql = require('graphql');
const loginController = require('../../controllers/login');

const { GraphQLString, GraphQLObjectType, GraphQLBoolean } = graphql;

const loginType = new GraphQLObjectType({
    name: "logIn",
    fields: {
        error: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString }
    }
})


const logInMutation = {
    name: "logInMutation",
    type: loginType,
    args: {
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    },
    resolve: (async (root, args, context, info) => {
        const loginInfo = await loginController(args);
        return loginInfo
    })
}

module.exports=logInMutation