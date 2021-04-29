import { gql } from "apollo-server";
import { Request, Response } from "express";

const typeDefs = gql`
  type Hello {
    world: String!
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
