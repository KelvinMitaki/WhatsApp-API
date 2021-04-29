import { gql } from "apollo-server";
import { Request, Response } from "express";

const typeDefs = gql`
  type Hello {
    world: String!
  }
  type User {
    _id: String!
    name: String!
    about: String!
    phoneNumber: Int!
    countryCode: String!
    profilePhoto: String
    groups: [String!]!
    createdAt: String!
  }
  type Message {
    _id: String!
    sender: String!
    recipient: String!
    message: String!
    read: Boolean!
    createdAt: String!
    deleted: Boolean
  }
  type Group {
    _id: String!
    name: String!
    description: String
    groupProfilePhoto: String
    admin: String!
    createdAt: String!
  }
  type Token {
    token: String!
  }
  input RegisterUserInput {
    name: String!
    about: String!
    phoneNumber: Int!
    countryCode: String!
    profilePhoto: String
    groups: [String!]!
  }

  type Query {
    fetchUsers: [User!]!
  }
  type Mutation {
    registerUser(values: RegisterUserInput!): Token!
    addNewMessage(recipient: String!, message: String!): Message!
    addNewGroup(name: String!): Group!
  }
  type Subscription {
    addNewMessage: Message!
  }
`;
export default typeDefs;
export interface Context {
  req: Request;
  res: Response;
}
