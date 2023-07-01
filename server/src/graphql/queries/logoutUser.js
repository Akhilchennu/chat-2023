const graphql = require('graphql');
const verifyAuth = require('../../utils/auth');
const reddisConfig = require('../../configarations/reddisConfig');

const { GraphQLBoolean, GraphQLObjectType, GraphQLString } = graphql;

const logOutUserType = new GraphQLObjectType({
    name: "logoutAll",
    fields: {
        success: { type: GraphQLBoolean },
        error: { type: GraphQLString }
    }
})

const logOutAllDevicesMutation = {
    name: "logoutAll",
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
        await (await reddisConfig).sRem(tokenUserData?.userId,headers.token)
        return { success: true, error: null };
    })

}

module.exports=logOutAllDevicesMutation;