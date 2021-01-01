import { gql } from "apollo-server-fastify";

export default gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    menu(restaurantId: ID!): [MenuItem]
    menuItem(id: ID!): MenuItem
    order(id: ID!): Order
    restaurant(id: ID!): Restaurant
    restaurants: [Restaurant]
    user(id: ID!): User
    drivers: [User]!
    users: [User]
    viewer: User
  }

  type Mutation {
    completeOrder(id: ID!): Order
    createOrder(
      restaurantId: ID!
      items: [MenuItemInput!]!
      status: OrderStatus!
      note: String
      address: String!
      tax: Float!
      deliveryFee: Float!
      tip: Float!
    ): Order
    createMenuItem(
      name: String!
      description: String
      price: Float!
      mediaUrl: String
      restaurantId: ID!
    ): MenuItem
    createRestaurant(
      name: String!
      description: String
      type: RestaurantType!
      address: String!
      phone: Float
      rate: Int
    ): Restaurant
    deleteOrder(id: ID!): Boolean
    deliverOrder(id: ID!): Order
    registerCustomer(
      id: ID!
      address: String!
      firstName: String!
      lastName: String!
    ): User
    removeMenuItem(menuItemId: ID!): DeleteItemResponse!
    removeRestaurant(restaurantId: ID!): DeleteItemResponse!
    removeUser(userId: ID!): DeleteItemResponse!
  }

  enum OrderStatus {
    ORDERING
    DELIVERING
    COMPLETED
  }

  enum RestaurantType {
    FAST_FOOD
    HEALTHY
    ASIAN
    DESSERTS
    ALCOHOL
  }

  input MenuItemInput {
    id: ID!
    itemCount: Int!
  }

  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    address: String!
    pastOrders: [Order]
    restaurants: [Restaurant]
  }

  type DeleteItemResponse {
    affectedCount: Int!
    message: String!
  }

  type MenuItem {
    id: ID!
    name: String!
    description: String
    price: Float!
    mediaUrl: String
    restaurant: Restaurant!
  }

  type Order {
    id: ID!
    restaurant: Restaurant!
    items: [OrderItem!]!
    status: OrderStatus!
    orderedAt: String
    address: String!
    note: String
    subtotal: Float!
    tax: Float
    deliveryFee: Float
    tip: Float
  }

  type OrderItem {
    id: ID!
    name: String!
    description: String!
    price: Float!
    itemCount: Int!
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

  type User {
    id: ID!
    name: String!
    email: String!
    authenticationId: String!
    profileImageURL: String
    registered: Boolean!
    customer: Customer
  }
`;
