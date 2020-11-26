import { ApolloServer } from 'apollo-server-fastify';
import resolvers from "./resolvers"
import typeDefs from "./typeDefs";

export default new ApolloServer({ 
  typeDefs,
  resolvers,
  playground: true
});
