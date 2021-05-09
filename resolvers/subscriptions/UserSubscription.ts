import { withFilter } from "graphql-subscriptions";
import { pubsub, Subscription, SubscriptionEnum } from "./MessageSubscription";

export const UserSubscription: Subscription = {
  updateUserTyping: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.UPDATE_USER_TYPING),
      (payload, variables: { chatID: string }) => {
        const { chatID } = payload.updateUserTyping;
        return chatID.toString() === variables.chatID.toString();
      }
    )
  },
  updateUserOnline: {
    subscribe: () => pubsub.asyncIterator(SubscriptionEnum.UPDATE_USER_TYPING)
  }
};
