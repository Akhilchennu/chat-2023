
const graphql = require('graphql');
// const logoutUser = require('../../controllers/logOut.js');
const verifyAuth = require('../../utils/auth');
const reddisConfig = require('../../configarations/reddisConfig');

const { GraphQLBoolean, GraphQLObjectType, GraphQLString } = graphql;

const logOutUserType = new GraphQLObjectType({
    name: "logout",
    fields: {
        success: { type: GraphQLBoolean },
        error: { type: GraphQLString }
    }
})

const logOutUserMutation = {
    name: "logout",
    type: logOutUserType,
    args: {

    },
    resolve: (async (root, args, context, info) => {
        const headers = context.headers;
        if (!headers?.token) {
            return {
                success: false,
                error: "Invalid token"
            }
        }
        const tokenUserData = await verifyAuth(headers.token);
        await (await reddisConfig).DEL(tokenUserData?.userId)
        return { success: true, error: null };
    })

}

module.exports=logOutUserMutation;