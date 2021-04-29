import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();
type Subscription = {
  [key: string]: {
    subscribe: <T>(triggers: string | string[]) => AsyncIterator<T, any, undefined>;
  };
};
export enum SubscriptionEnum {
  ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE"
}

export const MessageSubscription: Subscription = {
  addNewMessage: {
    subscribe: () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_MESSAGE)
  }
};
