const express = require('express');
const config = require('../config');
const { createHandler } = require('graphql-http/lib/use/http');
const RootSchema = require('./graphql/schema/index.js');
const routes = require('./routes/routes.js')
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
require('./configarations/dbConfig');
// const client=require('./configarations/reddisConfig')
const envport = config.port
const app = express();
app.use(cors({ origin: 'http://localhost:3002' })); 
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)
// app.use('/graphql', createHandler({
//   schema: RootSchema,
//   graphiql: true,
// }))
app.use('/graphql', graphqlHTTP({
  schema: RootSchema,
  graphiql: true,
  cors:{
    origin: 'http://localhost:3002'
  }
}))
app.get('/', (req, res) => {
  res.status(200).send("sucess")
})

app.listen(envport, () => {
  console.log(`server listening on ${envport}`)
})