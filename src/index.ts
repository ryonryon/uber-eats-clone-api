import { ApolloServer } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import { send } from 'micro';
import { get, post, router } from 'microrouter';

import resolvers from "./resolvers"
import typeDefs from "./typeDefs";

const apolloServer = new ApolloServer({ schema: makeExecutableSchema({
  typeDefs,
  resolvers,
})
});

const graphqlHandler = apolloServer.createHandler({ path: '/graphql' });

module.exports = router(
  post('/graphql', graphqlHandler),
  get('/graphql', graphqlHandler),
  (_, res) => send(res, 404, 'Not Found'),
);