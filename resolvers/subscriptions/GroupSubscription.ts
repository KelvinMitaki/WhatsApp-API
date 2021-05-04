import { withFilter } from "graphql-subscriptions";
import { pubsub, Subscription, SubscriptionEnum } from "./MessageSubscription";

export const GroupSubscription: Subscription = {
  addNewGroup: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_GROUP),
      (payload, variables: { userID: string }) => {
        const { participants }: { participants: string[] } = payload.addNewGroup;
        return participants.some(p => p === variables.userID);
      }
    )
  },
  addNewGroupMsg: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_GROUP_MSG),
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables });
        return true;
      }
    )
  },
  deleteGroupMsg: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.DELETE_GROUP_MSG),
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables });
        return true;
      }
    )
  }
};
