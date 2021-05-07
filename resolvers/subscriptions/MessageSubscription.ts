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
  ADD_NEW_CHAT = "ADD_NEW_CHAT",
  DELETE_MESSAGE = "DELETE_MESSAGE",
  DELETE_GROUP_MSG = "DELETE_GROUP_MSG",
  UPDATE_GROUP_READ = "UPDATE_GROUP_READ"
}

export const MessageSubscription: Subscription = {
  addNewMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_MESSAGE),
      (payload, variables: { sender: string; recipient: string }) => {
        const { sender, recipient } = payload.addNewMessage;
        return (
          variables.sender === sender ||
          variables.recipient === sender ||
          variables.sender === recipient ||
          variables.recipient === recipient
        );
      }
    )
  },
  addNewChat: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_CHAT),
      (payload, variables: { userID: string }) => {
        const { sender, recipient } = payload.addNewChat;
        return (
          variables.userID === sender._id.toString() ||
          variables.userID === recipient._id.toString()
        );
      }
    )
  },
  deleteMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.DELETE_MESSAGE),
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables });
        return true;
      }
    )
  }
};
