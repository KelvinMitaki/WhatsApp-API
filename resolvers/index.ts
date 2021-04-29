import { UserQuery } from "./queries/UserQuery";
import { UserMutation } from "./mutations/UserMutation";
import { UserSubscription } from "./subscriptions/UserSubscription";
import { MessageSubscription } from "./subscriptions/MessageSubscription";
import { MessageMutation } from "./mutations/MessageMutation";
import { MessageQuery } from "./queries/MessageQuery";
import { GroupQuery } from "./queries/GroupQuery";
import { GroupMutation } from "./mutations/GroupMutation";
import { GroupSubscription } from "./subscriptions/GroupSubscription";

const resolvers = {
  Query: {
    ...UserQuery,
    ...MessageQuery,
    ...GroupQuery
  },
  Mutation: {
    ...UserMutation,
    ...MessageMutation,
    ...GroupMutation
  },
  Subscription: {
    ...UserSubscription,
    ...MessageSubscription,
    ...GroupSubscription
  }
};

export default resolvers;
