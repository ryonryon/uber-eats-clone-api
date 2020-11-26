import { gql } from "apollo-server-fastify";

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createBooks: [Book]
  }

  type Book {
    title: String
    author: String
  }
`;
