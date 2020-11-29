import { ApolloServer } from "apollo-server-fastify";
import context from "./context";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export default new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: true,
});
