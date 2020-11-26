import { gql } from "apollo-server-fastify";

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      iconUrl: String
      address: String!
    ): User
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: String!
    iconUrl: String
  }
`;
