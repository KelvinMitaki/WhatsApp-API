import { Mutation } from "./mutations/Mutation";
import { Query } from "./queries/Query";
import { Subscription } from "./subscriptions/Subscription";

const resolvers = {
  Query,
  Mutation,
  Subscription
};

export default resolvers;
