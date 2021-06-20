import {
  Maybe,
  Message as MessageInterface,
  MutationResolvers,
  ResolverTypeWrapper,
} from '../../generated/graphql';
import { auth } from '../../middlewares/UserValidation';
import { Chat, ChatDoc } from '../../models/Chat';
import { Message } from '../../models/Message';
import { Context } from '../../schema/schema';
import { pubsub, SubscriptionEnum } from '../subscriptions/MessageSubscription';

export const MessageMutation: MutationResolvers<Context> = {
  async addNewMessage(prt, args, { req }) {
    const id = auth(req) as string;
    let chat: ChatDoc | null;
    chat = await Chat.findOne({
      $or: [
        {
          sender: id,
          recipient: args.recipient,
        },
        { sender: args.recipient, recipient: id },
      ],
    });
    if (!chat) {
      chat = Chat.build({ ...args, sender: id, unread: 1 });
      await chat.save();
    } else {
      chat.sender = id;
      chat.recipient = args.recipient;
      chat.message = args.message;
      chat.unread =
        (await Message.countDocuments({ sender: id, recipient: args.recipient, read: false })) + 1;
      await chat.save();
    }
    chat = await Chat.findById(chat._id).populate('sender recipient');
    const message = Message.build({ ...args, sender: id, read: false, chatID: chat!._id });
    await message.save();
    pubsub.publish(SubscriptionEnum.ADD_NEW_CHAT, { addNewChat: { chat, message } });
    pubsub.publish(SubscriptionEnum.ADD_NEW_MESSAGE, { addNewMessage: message });
    return message as unknown as Promise<ResolverTypeWrapper<MessageInterface>>;
  },
  async deleteMessage(prt, args, { req }): Promise<Maybe<ResolverTypeWrapper<MessageInterface>>> {
    const id = auth(req);
    const message = await Message.findById(args.messageID);
    if (message?.sender.toString() === id) {
      message.deleted = true;
      await message.save();
      pubsub.publish(SubscriptionEnum.DELETE_MESSAGE, { deleteMessage: message });
      return message as unknown as Promise<ResolverTypeWrapper<MessageInterface>>;
    }
    return null;
  },
  async updateReadMessages(prt, args, { req }) {
    const id = auth(req);
    await Message.updateMany({ recipient: id, _id: { $in: args.messageIDs } }, { read: true });
    const chat = await Chat.findByIdAndUpdate(args.chatID, { unread: 0 }, { new: true })
      .sort({ updatedAt: -1 })
      .populate('sender recipient');
    pubsub.publish(SubscriptionEnum.ADD_NEW_CHAT, { addNewChat: chat });
    const messages = await Message.find({ _id: { $in: args.messageIDs } });
    pubsub.publish(SubscriptionEnum.UPDATE_READ_MESSAGES, { updateReadMessages: messages });
    return messages as unknown as Promise<ResolverTypeWrapper<MessageInterface>[]>;
  },
  async addStarredMessages(prt, args, { req }) {
    const starredBy = auth(req);
    await Message.updateMany({ _id: { $in: args.messageIDs } }, { $addToSet: { starredBy } });
    return Message.find({
      _id: { $in: args.messageIDs },
    }) as unknown as ResolverTypeWrapper<MessageInterface>[];
  },
  async removeStarredMessages(prt, args, { req }) {
    const starredBy = auth(req);
    await Message.updateMany({ _id: { $in: args.messageIDs } }, { $pull: { starredBy } });
    return Message.find({
      _id: { $in: args.messageIDs },
    }) as unknown as ResolverTypeWrapper<MessageInterface>[];
  },
};
