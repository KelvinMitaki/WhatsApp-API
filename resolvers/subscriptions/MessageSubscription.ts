import { PubSub, withFilter } from 'graphql-subscriptions';
import { ChatWithMessage, SubscriptionResolvers } from '../../generated/graphql';
import { MessageDoc } from '../../models/Message';

export const pubsub = new PubSub();
export enum SubscriptionEnum {
  ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE',
  ADD_NEW_GROUP = 'ADD_NEW_GROUP',
  ADD_NEW_GROUP_MSG = 'ADD_NEW_GROUP_MSG',
  ADD_NEW_CHAT = 'ADD_NEW_CHAT',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  DELETE_GROUP_MSG = 'DELETE_GROUP_MSG',
  UPDATE_GROUP_READ = 'UPDATE_GROUP_READ',
  UPDATE_USER_TYPING = 'UPDATE_USER_TYPING',
  UPDATE_GROUP_TYPING = 'UPDATE_GROUP_TYPING',
  UPDATE_USER_ONLINE = 'UPDATE_USER_ONLINE',
  UPDATE_READ_MESSAGES = 'UPDATE_READ_MESSAGES',
}

export const MessageSubscription: SubscriptionResolvers = {
  addNewMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_MESSAGE),
      (payload, variables: { sender: string; recipient: string }) => {
        const { sender, recipient }: { [key: string]: string } = payload.addNewMessage;
        return (
          variables.sender.toString() === sender.toString() ||
          variables.recipient.toString() === sender.toString() ||
          variables.sender.toString() === recipient.toString() ||
          variables.recipient.toString() === recipient.toString()
        );
      }
    ),
  },
  addNewChat: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_CHAT),
      (payload, variables: { userID: string }) => {
        const {
          chat: { sender, recipient },
        }: ChatWithMessage = payload.addNewChat;
        return (
          variables.userID === sender._id.toString() ||
          variables.userID === recipient._id.toString()
        );
      }
    ),
  },
  updateReadMessages: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.UPDATE_READ_MESSAGES),
      (payload, variables: { sender: string; recipient: string }) => {
        const { sender, recipient } = variables;
        const messages: MessageDoc[] = payload.updateReadMessages;
        return messages.every(
          (m) =>
            (m.sender.toString() === sender.toString() &&
              m.recipient.toString() === recipient.toString()) ||
            (m.sender.toString() === recipient.toString() &&
              m.recipient.toString() === sender.toString())
        );
      }
    ),
  },
  deleteMessage: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.DELETE_MESSAGE),
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables });
        return true;
      }
    ),
  },
};
