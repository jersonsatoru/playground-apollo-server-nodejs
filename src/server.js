const { ApolloServer } = require('apollo-server');

const schemas = require('./schemas');
const resolvers = require('./resolvers');

const app = new ApolloServer({
  typeDefs: schemas,
  resolvers,
});

app.listen(3000);
