import { PubSub, withFilter } from "graphql-subscriptions";

export const pubsub = new PubSub();
export type Subscription = {
  [key: string]: {
    subscribe: <T>(triggers: string | string[]) => AsyncIterator<T, any, undefined>;
  };
};
export enum SubscriptionEnum {
  ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE",
  ADD_NEW_GROUP = "ADD_NEW_GROUP",
  ADD_NEW_GROUP_MSG = "ADD_NEW_GROUP_MSG",
  ADD_NEW_CHAT = "ADD_NEW_CHAT"
}

export const MessageSubscription: Subscription = {
  addNewMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_MESSAGE),
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables });
        return true;
      }
    )
  },
  addNewChat: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_CHAT),
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables });
        return true;
      }
    )
  }
};
