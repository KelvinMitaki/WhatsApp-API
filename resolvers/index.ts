import { UserQuery } from "./queries/UserQuery";

const resolvers = {
  Query: {
    ...UserQuery
  },
  Mutation: {},
  Subscription: {}
};

export default resolvers;
