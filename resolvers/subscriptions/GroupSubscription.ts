import { withFilter } from "graphql-subscriptions";
import { pubsub, Subscription, SubscriptionEnum } from "./MessageSubscription";

export const GroupSubscription: Subscription = {
  addNewGroup: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_GROUP),
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables });
        return true;
      }
    )
  }
};
