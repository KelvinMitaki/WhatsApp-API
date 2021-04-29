import { gql } from "apollo-server";
import { Request, Response } from "express";

const typeDefs = gql`
  type Hello {
    world: String!
  }
  type User {
    name: String!
    about: String!
    phoneNumber: Int!
    countryCode: String!
    profilePhoto: String
    groups: [String]!
  }
  type Message {
    sender: String!
    recipient: String!
    message: String!
    read: Boolean!
  }
  type Group {
    name: String!
    description: String
    groupProfilePhoto: String
    admin: String!
  }

  type Query {
    hello: Hello!
  }
  type Mutation {
    hello: Hello!
  }
  type Subscription {
    hello: Hello!
  }
`;
export default typeDefs;
export interface Context {
  req: Request;
  res: Response;
}
