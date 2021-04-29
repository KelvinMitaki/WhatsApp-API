import { UserQuery } from "./queries/UserQuery";
import { UserMutation } from "./mutations/UserMutation";
import { UserSubscription } from "./subscriptions/UserSubscription";
import { MessageSubscription } from "./subscriptions/MessageSubscription";
import { MessageMutation } from "./mutations/MessageMutation";
import { MessageQuery } from "./queries/MessageQuery";

const resolvers = {
  Query: {
    ...UserQuery,
    ...MessageQuery
  },
  Mutation: {
    ...UserMutation,
    ...MessageMutation
  },
  Subscription: {
    ...UserSubscription,
    ...MessageSubscription
  }
};

export default resolvers;
