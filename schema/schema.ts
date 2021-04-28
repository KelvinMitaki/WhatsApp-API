import { gql } from "apollo-server";
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
