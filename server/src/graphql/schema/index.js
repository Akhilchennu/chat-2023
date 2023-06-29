const graphql = require('graphql');
const RootQuery = require('../queries/index.js');
const RootMutation = require('../mutations/index.js');

const RootSchema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

module.exports = RootSchema
