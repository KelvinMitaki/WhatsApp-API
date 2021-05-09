import { withFilter } from "graphql-subscriptions";
import { pubsub, Subscription, SubscriptionEnum } from "./MessageSubscription";

export const UserSubscription: Subscription = {
  updateUserTyping: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.UPDATE_USER_TYPING),
      (payload, variables: { chats: string[] }) => {
        const { userID } = payload.updateUserTyping;
        return variables.chats.some(c => c.toString() === userID.toString());
      }
    )
  }
};
