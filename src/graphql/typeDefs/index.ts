import { gql } from "apollo-server-fastify";

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  type User {
    firstName: String
    lastName: String
    email: String
    address: String
    iconUrl: String
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    iconUrl: String
    address: String!
  }
`;
