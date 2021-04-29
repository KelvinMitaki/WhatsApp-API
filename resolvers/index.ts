import { UserQuery } from "./queries/UserQuery";
import { UserMutation } from "./mutations/UserMutation";

const resolvers = {
  Query: {
    ...UserQuery
  },
  Mutation: {
    ...UserMutation
  },
  Subscription: {}
};

export default resolvers;
