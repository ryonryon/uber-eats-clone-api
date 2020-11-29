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
    removeUser(userId: ID!): DeleteItemResponse!
    createRestaurant(
      name: String!
      description: String
      type: RestaurantType!
      address: String!
      phone: Float
      rate: Int
    ): Restaurant
    removeRestaurant(restaurantId: ID!): DeleteItemResponse!
    createMenuItem(
      name: String!
      description: String
      price: Float!
      mediaUrl: String
      restaurantId: ID!
    ): MenuItem
    removeMenuItem(menuItemId: ID!): DeleteItemResponse!
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

  type DeleteItemResponse {
    affectedCount: Int!
    message: String!
  }

  enum RestaurantType {
    FAST_FOOD
    HEALTHY
    ASIAN
    DESSERTS
    ALCOHOL
  }
`;
