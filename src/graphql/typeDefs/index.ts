import { gql } from "apollo-server-fastify";

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    users: [User]
    user(id: ID!): User
    restaurants: [Restaurant]
    restaurant(id: ID!): Restaurant
    menu(restaurantId: ID!): [MenuItem]
    menuItem(id: ID!): MenuItem
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      iconUrl: String
      address: String!
    ): User
    createRestaurant(
      name: String!
      description: String
      type: RestaurantType!
      address: String!
      phone: Float
      rate: Int
    ): Restaurant
    createMenuItem(
      name: String!
      description: String
      price: Float!
      mediaUrl: String
      restaurantId: ID!
    ): MenuItem
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: String!
    iconUrl: String
  }

  type Restaurant {
    id: ID!
    name: String!
    description: String
    type: RestaurantType!
    address: String!
    phone: Float
    rate: Int
    menu: [MenuItem!]
  }

  type MenuItem {
    id: ID!
    name: String!
    description: String
    price: Float!
    mediaUrl: String
    restaurant: Restaurant!
  }

  enum RestaurantType {
    FAST_FOOD
    HEALTHY
    ASIAN
    DESSERTS
    ALCOHOL
  }
`;
