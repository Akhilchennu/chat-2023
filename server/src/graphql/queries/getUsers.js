const graphql = require('graphql');
const getUsersController = require('../../controllers/getUsers');
const verifyAuth = require('../../utils/auth')

const { GraphQLList, GraphQLBoolean, GraphQLString } = graphql;

const getUsersTypeSchema = new graphql.GraphQLObjectType({
    name: 'getUsersTypeSchema',
    fields: {
        success: { type: GraphQLBoolean },
        users: { type: new GraphQLList(GraphQLString) },
        error: { type: GraphQLString }
    }
})

const getUsersQuery = {
    name: 'getUsers',
    // fields: {  // required  commented code only if multiple fields inside one mutation
    type: getUsersTypeSchema,
    args: {},
    resolve: (async (root, args, context, info) => {
        const headers = context.headers;
        if (!headers?.token) {
            return {
                success: false,
                error: "Invalid token"
            }
        }
        const isActiveToken = await verifyAuth(headers.token);
        if (isActiveToken?.success) {
            const signUpData = await getUsersController();
            return signUpData
        } else {
            return { success: false, error: isActiveToken?.error || "Invalid token" }
        }
    })
    // }
}


module.exports = getUsersQuery